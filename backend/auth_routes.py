from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime
import jwt

from database import get_db, User, UserProfile, UserActivity, UserUpload
from auth import (
    UserCreate, UserLogin, Token, UserResponse, ProfileUpdate, DashboardData, OnboardingData,
    get_password_hash, verify_password, create_access_token, create_refresh_token,
    SECRET_KEY, ALGORITHM
)

router = APIRouter()
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def log_activity(db: Session, user_id: int, action: str):
    activity = UserActivity(user_id=user_id, action=action)
    db.add(activity)
    db.commit()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    new_user = User(name=user.name, email=user.email, hashed_password=hashed_pwd)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Initialize empty profile right after signup
    new_profile = UserProfile(user_id=new_user.id)
    db.add(new_profile)
    db.commit()

    # Log signup activity
    log_activity(db, new_user.id, "USER_SIGNED_UP")
    
    return new_user

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user.email})
    refresh_token = create_refresh_token(data={"sub": db_user.email})
    
    log_activity(db, db_user.id, "USER_LOGGED_IN")
    
    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/profile", response_model=dict)
def update_profile(profile_data: ProfileUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    
    # Update nested tables dynamically
    if profile_data.name:
        current_user.name = profile_data.name
    if profile_data.company:
        profile.company = profile_data.company
    if profile_data.phone:
        profile.phone = profile_data.phone
    if profile_data.profile_pic_url:
        profile.profile_pic_url = profile_data.profile_pic_url
    if profile_data.preferences:
        profile.preferences = profile_data.preferences
        
    db.commit()
    log_activity(db, current_user.id, "PROFILE_UPDATED")
    return {"message": "Profile updated successfully"}

@router.post("/onboarding/save")
def save_onboarding(data: OnboardingData, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        profile = UserProfile(user_id=current_user.id)
        db.add(profile)
        
    if data.company_name:
        profile.company = data.company_name
        
    # Build preferences json
    prefs = profile.preferences or {}
    for key, val in data.dict(exclude_unset=True).items():
        if key not in ['company_name']: 
            prefs[key] = val
            
    # Normalize nested preferences updates
    profile.preferences = prefs
    
    db.commit()
    log_activity(db, current_user.id, "ONBOARDING_COMPLETED")
    return {"message": "Onboarding saved successfully"}


@router.get("/dashboard", response_model=DashboardData)
def get_dashboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """ Initialize Dashboard endpoint parsing all personalized user data """
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    uploads = db.query(UserUpload).filter(UserUpload.user_id == current_user.id).order_by(UserUpload.created_at.desc()).limit(5).all()
    
    dashboard_data = {
        "user_id": current_user.id,
        "full_name": current_user.name,
        "email": current_user.email,
        "company": profile.company if profile else None,
        "profile_pic": profile.profile_pic_url if profile else None,
        "preferences": profile.preferences if profile else None,
        "recent_uploads": [{"id": u.id, "filename": u.filename, "created_at": u.created_at} for u in uploads],
        "total_datasets": db.query(UserUpload).filter(UserUpload.user_id == current_user.id).count(),
        "queries_run": db.query(UserActivity).filter(UserActivity.user_id == current_user.id, UserActivity.action.like('%QUERY%')).count(),
        "insights_generated": db.query(UserActivity).filter(UserActivity.user_id == current_user.id, UserActivity.action.like('%INSIGHT%')).count()
    }
    
    log_activity(db, current_user.id, "DASHBOARD_ACCESSED")
    return dashboard_data
