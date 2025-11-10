# Troubleshooting Guide

## Common Issues and Solutions

---

## 🔴 Backend Issues

### Issue: "Python is not recognized"
**Symptom:** `python: command not found` or `python is not recognized`

**Solution:**
1. Install Python 3.8+ from [python.org](https://www.python.org/downloads/)
2. During installation, check "Add Python to PATH"
3. Restart terminal
4. Verify: `python --version`

---

### Issue: "pip install fails"
**Symptom:** Errors when running `pip install -r requirements.txt`

**Solution:**
```powershell
# Upgrade pip first
python -m pip install --upgrade pip

# Then install requirements
pip install -r requirements.txt

# If still failing, install individually:
pip install Flask flask-cors python-dotenv
pip install sentence-transformers chromadb requests
```

---

### Issue: "Port 5000 already in use"
**Symptom:** `Address already in use` error

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in app.py:
# app.run(debug=True, host='0.0.0.0', port=5001)
```

---

### Issue: "ModuleNotFoundError"
**Symptom:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```powershell
# Ensure you're in the backend folder
cd backend

# Install requirements
pip install -r requirements.txt

# If using virtual environment:
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

---

### Issue: "OpenRouter API Error"
**Symptom:** `401 Unauthorized` or `Failed to generate answer`

**Solution:**
1. Check `backend/.env` has correct API key
2. Verify API key at [openrouter.ai](https://openrouter.ai)
3. Check API quota/limits
4. Test API key:
```powershell
# From backend folder
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print(os.getenv('OPENROUTER_API_KEY'))"
```

---

### Issue: "ChromaDB Error"
**Symptom:** `Collection already exists` or ChromaDB errors

**Solution:**
```powershell
# Delete ChromaDB storage
cd backend
Remove-Item -Recurse -Force chroma

# Restart backend
python app.py
```

---

## 🔵 Frontend Issues

### Issue: "npm/node not recognized"
**Symptom:** `npm: command not found` or `node is not recognized`

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Choose LTS version (v18 or v20)
3. Restart terminal
4. Verify: `node --version` and `npm --version`

---

### Issue: "npm install fails"
**Symptom:** Errors during `npm install`

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock files
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install

# If still failing, try:
npm install --legacy-peer-deps
```

---

### Issue: "Port 8080 already in use"
**Symptom:** Can't start Vite server

**Solution:**
```powershell
# Edit vite.config.ts, change port:
# server: {
#   host: "::",
#   port: 3000,  // Change from 8080
# }

# Or kill process using port 8080:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

### Issue: "Failed to fetch answer"
**Symptom:** Frontend shows error when asking questions

**Solution:**
1. **Check backend is running:**
   - Open: `http://localhost:5000/health`
   - Should show: `{"status": "healthy"}`

2. **Check CORS:**
   - Backend console should show no CORS errors
   - Frontend should run on port 8080

3. **Check API URL:**
   - Verify `.env` has: `VITE_API_URL=http://localhost:5000`
   - Restart frontend after changing `.env`

4. **Check browser console (F12):**
   - Look for network errors
   - Check if request is being sent

---

### Issue: "Firebase Authentication Error"
**Symptom:** Can't login or signup

**Solution:**
1. Check `src/lib/firebase.ts` has correct config
2. Verify Firebase project settings
3. Enable Email/Password auth in Firebase Console
4. Enable Google auth if using Google login

---

## 🟡 Integration Issues

### Issue: "Backend returns answer but frontend doesn't show it"
**Symptom:** Backend logs show success but Answer page is blank

**Solution:**
1. Check browser console for errors
2. Verify Answer.tsx is receiving data
3. Check state management:
```typescript
console.log('Answer received:', data.answer);
console.log('Sources:', data.sources);
```

---

### Issue: "Questions in wrong language"
**Symptom:** Answers always in English despite selecting Hindi/Tamil

**Solution:**
1. Check `LanguageContext` is working:
   - Dashboard should show selected language
2. Verify API request includes language:
```typescript
console.log('Sending language:', currentLanguage);
```
3. Check backend receives language parameter:
```python
print(f"Language received: {language}")
```

---

### Issue: "Slow response times"
**Symptom:** Takes > 10 seconds to get answer

**Solution:**
1. **First time is slower** (model loading)
2. Check internet connection (OpenRouter API)
3. Monitor backend logs for bottlenecks
4. Consider using a faster LLM model
5. Implement caching for common questions

---

## 🟢 Data Issues

### Issue: "No relevant answers"
**Symptom:** AI gives generic answers not related to schemes

**Solution:**
1. Check `indian_government_schemes_sample.json` has real data
2. Verify ChromaDB has documents:
   - Visit: `http://localhost:5000/health`
   - Check `documents_count` > 0
3. Improve dataset with more detailed scheme information

---

### Issue: "History not saving"
**Symptom:** Questions don't appear in History page

**Solution:**
1. Verify user is logged in
2. Check Firebase Firestore rules
3. Check browser console for Firebase errors
4. Verify `historyService.ts` is being called

---

## 🔧 Development Issues

### Issue: "Hot reload not working"
**Symptom:** Changes don't appear without restart

**Solution:**
```powershell
# Frontend: Already enabled in Vite

# Backend: Flask debug mode is on
# But may need manual restart for some changes
```

---

### Issue: "TypeScript errors"
**Symptom:** Red squiggly lines in VS Code

**Solution:**
```powershell
# Restart TypeScript server
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or regenerate types
npm run build
```

---

## 📋 Health Check Commands

### Backend Health:
```powershell
# Terminal
curl http://localhost:5000/health

# Browser
http://localhost:5000/health

# PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health
```

### Frontend Health:
```powershell
# Open browser
http://localhost:8080

# Should see Landing page
```

### Python Environment:
```powershell
cd backend
python --version
pip list
```

### Node Environment:
```powershell
node --version
npm --version
npm list
```

---

## 🐛 Debug Mode

### Enable Verbose Logging:

**Backend (app.py):**
```python
# Already enabled with debug=True
app.run(debug=True, host='0.0.0.0', port=5000)
```

**Frontend (Browser):**
```
Press F12 → Console tab
```

**Check Network Requests:**
```
F12 → Network tab → Filter: Fetch/XHR
```

---

## 🆘 Still Having Issues?

### Step-by-step diagnostic:

1. **Test Backend Independently:**
```powershell
cd backend
python -c "from app import *; print('Backend imports OK')"
```

2. **Test API Call:**
```powershell
# Using curl or Postman
curl -X POST http://localhost:5000/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Test","language":"en"}'
```

3. **Test Frontend Independently:**
```powershell
npm run dev
# Visit http://localhost:8080
# Open browser console
```

4. **Check All Ports:**
```powershell
netstat -ano | findstr "5000 8080"
```

5. **Review All Logs:**
   - Backend terminal output
   - Frontend terminal output
   - Browser console (F12)
   - Browser Network tab

---

## 📞 Getting Help

If none of these solutions work:

1. **Check documentation:**
   - `RAG_INTEGRATION_DOCS.md`
   - `QUICK_START.md`
   - `backend/README.md`

2. **Review error messages carefully:**
   - Copy exact error text
   - Check line numbers
   - Read stack traces

3. **Verify setup:**
   - Run `setup.bat`
   - Follow `QUICK_START.md` exactly

4. **Common fixes:**
   - Restart both servers
   - Clear browser cache
   - Delete and reinstall dependencies
   - Check firewall/antivirus

---

**Last Updated:** November 10, 2025
