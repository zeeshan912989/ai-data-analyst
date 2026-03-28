import os
import uvicorn
import io
import pandas as pd
from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any, Optional
from processor import DataProcessor
from groq_client import GroqClient
from dotenv import load_dotenv
from pydantic import BaseModel

# --- Auth System ---
from auth_routes import router as auth_router, get_current_user
from database import User
# --- Paddle Payments ---
from paddle_webhook import router as paddle_router
# -------------------

load_dotenv()

app = FastAPI(title="AI Data Analyst API")

# Include Authentication Router
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])

# Include Paddle Webhook Router
app.include_router(paddle_router, prefix="/api/payments", tags=["Payments"])

# Setup CORS for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://ai-data-analyst-two.vercel.app",
        "https://ai-data-analyst-production.up.railway.app", # Replace with actual Railway domain
        "*" # Fallback (optional, but keep for now if not with credentials)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demonstration (In production, use Redis or Postgres)
# We store the dataframe summaries for easier re-access
data_store: Dict[str, Any] = {}

class AnalysisRequest(BaseModel):
    file_id: str

class QARequest(BaseModel):
    file_id: str
    query: str

@app.get("/")
def home():
    return {"status": "AI Data Analyst API is running!"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    """
    Upload and parse file (CSV/Excel).
    """
    # Security Rule: Max Size (2MB)
    MAX_SIZE = 2 * 1024 * 1024
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 2MB)")

    # Security Rule: Valid File Type
    if not file.filename.endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Unsupported file format")

    try:
        processor = DataProcessor()
        df = processor.load_data(content, file.filename)
        summary = processor.get_summary(df)
        
        # Store for session (Demo purposes only)
        # In a real app, use a unique ID and persistent storage
        file_id = f"file_{len(data_store) + 1}"
        data_store[file_id] = summary
        
        # Detect numeric/categorical for charts
        numeric_cols = processor.detect_numeric_cols(df)
        categorical_cols = processor.detect_categorical_cols(df)

        return {
            "file_id": file_id,
            "filename": file.filename,
            "columns": list(df.columns),
            "total_rows": len(df),
            "numeric_cols": numeric_cols,
            "categorical_cols": categorical_cols,
            "sample": summary["sample_data"],
            "basic_stats": summary["basic_stats"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def get_insights(req: AnalysisRequest, current_user: User = Depends(get_current_user)):
    """
    Get AI Insights based on file summary. (Protected)
    """
    if req.file_id not in data_store:
        raise HTTPException(status_code=404, detail="File session not found")

    try:
        summary = data_store[req.file_id]
        groq_client = GroqClient()
        insights = groq_client.analyze_data(summary)
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask_question(req: QARequest, current_user: User = Depends(get_current_user)):
    """
    Natural language Q&A. (Protected)
    """
    if req.file_id not in data_store:
        raise HTTPException(status_code=404, detail="File session not found")

    try:
        summary = data_store[req.file_id]
        groq_client = GroqClient()
        answer = groq_client.ask_data(req.query, summary)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
