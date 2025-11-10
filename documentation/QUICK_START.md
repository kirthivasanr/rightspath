# Quick Start Guide - RAG Integration

## 🚀 Start Both Servers

### Terminal 1: Backend (Python)
```powershell
cd backend
pip install -r requirements.txt
python app.py
```

### Terminal 2: Frontend (React)
```powershell
npm install
npm run dev
```

## ✅ Verify Setup

1. **Backend Health Check:** 
   Open browser → `http://localhost:5000/health`

2. **Frontend:**
   Open browser → `http://localhost:8080`

## 🎯 Test the Integration

1. Login/Signup
2. Ask a question (voice or text)
3. Wait 2-5 seconds for AI answer
4. View answer with sources

## 📁 Project Structure

```
Lawyer/
├── backend/          ← Python RAG API
├── src/             ← React Frontend
├── .env             ← Frontend config
└── RAG_INTEGRATION_DOCS.md  ← Full docs
```

## ⚙️ Configuration Files

- `backend/.env` → OpenRouter API key
- `.env` → Backend API URL

## 🔧 Troubleshooting

**"Failed to fetch answer":**
- Is backend running on port 5000?
- Check terminal for errors

**Backend won't start:**
- Install Python 3.8+
- Run: `pip install -r requirements.txt`

## 📖 Full Documentation

See `RAG_INTEGRATION_DOCS.md` for complete details.
