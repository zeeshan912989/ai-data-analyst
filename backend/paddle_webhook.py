"""
Paddle Webhook Handler
Receives payment notifications from Paddle and updates user subscriptions.
"""

from fastapi import APIRouter, Request, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, PlanSubscription, User, Notification
import hashlib
import hmac
import json
import os
from datetime import datetime

router = APIRouter()

PADDLE_WEBHOOK_SECRET = os.getenv("PADDLE_WEBHOOK_SECRET", "")

def verify_paddle_signature(raw_body: bytes, signature: str) -> bool:
    """Verify that the webhook is genuinely from Paddle."""
    if not PADDLE_WEBHOOK_SECRET:
        # In sandbox/dev mode, skip verification
        return True
    
    try:
        # Paddle v2 uses ts;h1 format
        parts = signature.split(";")
        ts = parts[0].split("=")[1]
        h1 = parts[1].split("=")[1]
        
        signed_payload = f"{ts}:{raw_body.decode('utf-8')}"
        expected = hmac.new(
            PADDLE_WEBHOOK_SECRET.encode(),
            signed_payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(h1, expected)
    except Exception:
        return False


@router.post("/paddle/webhook")
async def paddle_webhook(request: Request):
    """
    Paddle sends webhooks for:
    - subscription.created
    - subscription.updated
    - subscription.canceled
    - transaction.completed
    - transaction.payment_failed
    """
    raw_body = await request.body()
    signature = request.headers.get("Paddle-Signature", "")
    
    # Verify signature in production
    if PADDLE_WEBHOOK_SECRET and not verify_paddle_signature(raw_body, signature):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    try:
        payload = json.loads(raw_body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")
    
    event_type = payload.get("event_type", "")
    data = payload.get("data", {})
    
    db: Session = SessionLocal()
    
    try:
        # Extract user info from custom_data
        custom_data = data.get("custom_data", {})
        user_id = custom_data.get("userId")
        plan_name = custom_data.get("planName", "Starter")
        
        if not user_id:
            # Try to find user by email from the customer
            customer = data.get("customer", {})
            email = customer.get("email", "")
            if email:
                user = db.query(User).filter(User.email == email).first()
                if user:
                    user_id = str(user.id)
        
        if not user_id:
            return {"status": "ok", "message": "No user found, skipping"}
        
        user_id_int = int(user_id)
        
        # Handle different event types
        if event_type == "subscription.created":
            # New subscription created
            sub = db.query(PlanSubscription).filter(PlanSubscription.user_id == user_id_int).first()
            if sub:
                sub.plan_name = plan_name
                sub.status = "active"
                sub.current_period_start = datetime.utcnow()
            else:
                sub = PlanSubscription(
                    user_id=user_id_int,
                    plan_name=plan_name,
                    status="active",
                    billing_cycle="monthly",
                    current_period_start=datetime.utcnow()
                )
                db.add(sub)
            
            # Send notification
            notif = Notification(
                user_id=user_id_int,
                title="🎉 Plan Upgraded!",
                message=f"Your {plan_name} plan is now active. Enjoy unlimited features!",
                type="PLAN",
                is_read=False
            )
            db.add(notif)
            db.commit()
            
        elif event_type == "subscription.updated":
            sub = db.query(PlanSubscription).filter(PlanSubscription.user_id == user_id_int).first()
            if sub:
                new_status = data.get("status", "active")
                sub.status = new_status
                db.commit()
                
        elif event_type == "subscription.canceled":
            sub = db.query(PlanSubscription).filter(PlanSubscription.user_id == user_id_int).first()
            if sub:
                sub.status = "canceled"
                sub.plan_name = "Free"
                db.commit()
            
            notif = Notification(
                user_id=user_id_int,
                title="Subscription Canceled",
                message="Your subscription has been canceled. You'll retain access until the end of your billing period.",
                type="PLAN",
                is_read=False
            )
            db.add(notif)
            db.commit()
            
        elif event_type == "transaction.completed":
            # Payment successful
            sub = db.query(PlanSubscription).filter(PlanSubscription.user_id == user_id_int).first()
            if sub:
                sub.status = "active"
                sub.uploads_count = 0  # Reset monthly usage
                db.commit()
                
        elif event_type == "transaction.payment_failed":
            sub = db.query(PlanSubscription).filter(PlanSubscription.user_id == user_id_int).first()
            if sub:
                sub.status = "past_due"
                db.commit()
            
            notif = Notification(
                user_id=user_id_int,
                title="⚠️ Payment Failed",
                message="Your payment could not be processed. Please update your payment method to avoid service interruption.",
                type="AI_ALERT",
                is_read=False
            )
            db.add(notif)
            db.commit()
    
    except Exception as e:
        db.rollback()
        print(f"Webhook processing error: {e}")
    finally:
        db.close()
    
    # Always return 200 to Paddle (they retry on failures)
    return {"status": "ok"}
