from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    activities = relationship("UserActivity", back_populates="user")
    uploads = relationship("UserUpload", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    subscription = relationship("PlanSubscription", back_populates="user", uselist=False)
    logs = relationship("ActivityLog", back_populates="user")


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    company = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    profile_pic_url = Column(String, nullable=True)
    preferences = Column(JSON, default={"theme": "light", "notifications": True})
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")


class UserActivity(Base):
    __tablename__ = "user_activity"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String) # e.g. "UPLOAD_DATA", "QUERY_AI", "PROFILE_UPDATE"
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="activities")


class UserUpload(Base):
    __tablename__ = "user_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    file_url = Column(String, nullable=True) # S3 or Supabase Storage URL
    analysis_results = Column(JSON, nullable=True) # Summary of the processed dataframe
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="uploads")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(Text)
    type = Column(String) # e.g., "AI_ALERT", "SYSTEM", "PLAN"
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")


class PlanSubscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    plan_name = Column(String, default="Free") # Free, Starter, Pro
    status = Column(String, default="active")
    billing_cycle = Column(String, default="monthly")
    current_period_start = Column(DateTime, default=datetime.utcnow)
    current_period_end = Column(DateTime, nullable=True)
    uploads_count = Column(Integer, default=0) # Tracks monthly usage
    
    user = relationship("User", back_populates="subscription")


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String)
    details = Column(String, nullable=True)
    ip_address = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="logs")


Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
