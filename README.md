# AI Data Analyst 📊🤖

A production-ready SaaS tool to turn raw CSV/Excel files into intelligent insights and beautiful charts using **Groq AI (Llama 3.3)** and **FastAPI**.

## 🚀 Features

- **Modern Landing Page**: High-converting SaaS design with smooth animations.
- **Deep Data Analysis**: Automatically detects trends, outliers, and recommendations.
- **Natural Language Q&A**: Chat with your spreadsheet using Groq's blindingly fast LPUs.
- **Auto Charts**: Instant bar and line visualizations for numeric data.
- **Secure Processing**: Sandbox processing with sanitized data inputs.

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend**: FastAPI (Python 3.10+), Pandas, Groq SDK.
- **Infrastructure**: Vercel (Frontend), Railway/Render (Backend).

---

## 🛠️ Local Setup

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate # Windows
pip install -r requirements.txt
```
Create a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key_here
```
Run the server:
```bash
python main.py
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Visit: `http://localhost:3000`

---

## 📦 Deployment Instructions

### Frontend (Vercel)
1. Push your code to GitHub.
2. Link the repository to Vercel.
3. Set `NEXT_PUBLIC_API_URL` to your backend URL.

### Backend (Railway)
1. Link your repo to Railway.
2. Add your `GROQ_API_KEY` in variables.
3. Set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.

---

## ⚠️ Security & Rules
- Max file size: 2MB.
- Supported formats: .csv, .xlsx, .xls.
- GDPR Compliant structure.
