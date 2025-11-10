# RightsPath Architecture with RAG Integration

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│         (Browser: http://localhost:8080)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Voice/Text Question
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages:                                               │  │
│  │  - Landing.tsx                                        │  │
│  │  - Dashboard.tsx  ← User asks question               │  │
│  │  - Answer.tsx     ← Displays AI response             │  │
│  │  - History.tsx                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services:                                            │  │
│  │  - ragApiService.ts  ← API calls to backend          │  │
│  │  - historyService.ts ← Firebase integration          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Contexts:                                            │  │
│  │  - AuthContext    ← User authentication              │  │
│  │  - LanguageContext ← EN/HI/TA support                │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP POST /ask
                     │ { question, language }
                     ↓
┌─────────────────────────────────────────────────────────────┐
│               BACKEND (Python Flask)                        │
│              http://localhost:5000                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Flask REST API (app.py)                             │  │
│  │  - /health   ← Health check                          │  │
│  │  - /ask      ← Main question endpoint                │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│                     │ 1. Convert question to embedding     │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SentenceTransformer                                  │  │
│  │  Model: all-MiniLM-L6-v2                             │  │
│  │  Output: 384-dim vector                               │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│                     │ 2. Search for similar documents      │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ChromaDB (Vector Database)                          │  │
│  │  - Stores embeddings of schemes                       │  │
│  │  - Returns top 3 relevant documents                   │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│                     │ 3. Retrieved context                 │
│                     ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Context Preparation                                  │  │
│  │  - Combines retrieved docs                            │  │
│  │  - Adds language-specific prompt                      │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                       │
│                     │ 4. Generate answer                   │
│                     ↓                                       │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      │ HTTP POST to OpenRouter
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│              OPENROUTER API                                 │
│         https://openrouter.ai/api/v1/                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Meta Llama 4 Scout (Free Tier)                      │  │
│  │  - Receives: Context + Question                       │  │
│  │  - Generates: Detailed Answer                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Generated Answer
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND RESPONSE                           │
│  {                                                          │
│    "answer": "...",                                         │
│    "sources": [...],                                        │
│    "language": "en"                                         │
│  }                                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ JSON Response
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                 FRONTEND DISPLAYS                           │
│  - AI-generated answer                                      │
│  - Source citations                                         │
│  - Loading states                                           │
│  - Error handling                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Question Submission Flow:

```
1. User types/speaks question
   ↓
2. Dashboard.tsx captures input
   ↓
3. Navigate to Answer.tsx with question
   ↓
4. Answer.tsx calls ragApiService.askQuestion()
   ↓
5. Service sends POST to http://localhost:5000/ask
   ↓
6. Backend Flask receives request
   ↓
7. SentenceTransformer creates embedding
   ↓
8. ChromaDB searches for similar documents
   ↓
9. Top 3 relevant documents retrieved
   ↓
10. OpenRouter LLM generates answer
   ↓
11. Response sent back to frontend
   ↓
12. Answer.tsx displays result
```

---

## Component Relationships

```
App.tsx
 │
 ├─ AuthProvider (Firebase Auth)
 │   ├─ currentUser
 │   ├─ login()
 │   ├─ logout()
 │   └─ signup()
 │
 ├─ LanguageProvider
 │   ├─ currentLanguage (en/hi/ta)
 │   ├─ setLanguage()
 │   └─ t() - translation function
 │
 └─ Routes
     ├─ / → Landing.tsx
     ├─ /login → Login.tsx
     ├─ /signup → Signup.tsx
     ├─ /dashboard → Dashboard.tsx
     │                 │
     │                 ├─ Voice input (Web Speech API)
     │                 ├─ Text input
     │                 └─ navigates to /answer
     │
     ├─ /answer → Answer.tsx
     │              │
     │              ├─ useEffect: fetchAnswer()
     │              ├─ RagApiService.askQuestion()
     │              ├─ Loading state
     │              ├─ Error state
     │              └─ Display answer + sources
     │
     └─ /history → History.tsx
```

---

## Backend Architecture

```
backend/
 │
 ├─ app.py (Flask Server)
 │   │
 │   ├─ Initialize:
 │   │   ├─ Load dataset
 │   │   ├─ Setup ChromaDB
 │   │   ├─ Load embedding model
 │   │   └─ Create/load embeddings
 │   │
 │   ├─ Endpoints:
 │   │   ├─ GET /health
 │   │   │   └─ Returns server status
 │   │   │
 │   │   └─ POST /ask
 │   │       ├─ Validate input
 │   │       ├─ Create embedding
 │   │       ├─ Query ChromaDB
 │   │       ├─ Call OpenRouter
 │   │       └─ Return answer
 │   │
 │   └─ Run on port 5000
 │
 ├─ .env (Environment Variables)
 │   └─ OPENROUTER_API_KEY
 │
 ├─ requirements.txt (Dependencies)
 │   ├─ Flask
 │   ├─ flask-cors
 │   ├─ chromadb
 │   ├─ sentence-transformers
 │   └─ requests
 │
 └─ indian_government_schemes_sample.json
     └─ Knowledge base dataset
```

---

## Database Schema

### Firebase Firestore (User Data):
```
questionHistory/
  └─ {documentId}
      ├─ userId: string
      ├─ question: string
      ├─ answer: string
      ├─ timestamp: Timestamp
      └─ language: string
```

### ChromaDB (Vector Store):
```
gov_schemes/
  └─ Document {id}
      ├─ embedding: float[384]
      ├─ document: string (text)
      └─ metadata: {
          ├─ id: string
          ├─ title: string
          └─ source: string (URL)
        }
```

---

## API Request/Response Flow

### POST /ask

**Request:**
```json
{
  "question": "How to apply for PM Awas Yojana?",
  "language": "en"
}
```

**Processing Steps:**
1. Validate request
2. Encode question → [384-dim vector]
3. Query ChromaDB → Top 3 docs
4. Build prompt with context
5. Call OpenRouter API
6. Parse response
7. Format result

**Response:**
```json
{
  "question": "How to apply for PM Awas Yojana?",
  "answer": "Detailed AI-generated answer...",
  "language": "en",
  "sources": [
    {
      "id": "scheme_001",
      "title": "PM Awas Yojana",
      "source": "https://pmaymis.gov.in/"
    }
  ],
  "context_used": 3
}
```

---

## Technology Integration Points

### Frontend ↔ Backend:
- **Protocol:** HTTP REST API
- **Format:** JSON
- **CORS:** Enabled for localhost
- **Port:** Backend (5000), Frontend (8080)

### Backend ↔ ChromaDB:
- **Type:** In-memory vector database
- **Storage:** Persistent on disk
- **Query:** Cosine similarity search

### Backend ↔ OpenRouter:
- **Type:** HTTP REST API
- **Auth:** Bearer token
- **Model:** meta-llama/llama-4-scout:free
- **Timeout:** 30 seconds

### Frontend ↔ Firebase:
- **Services:** Auth, Firestore
- **Auth:** Email/Password, Google OAuth
- **Database:** Firestore for history

---

## Security Architecture

```
Frontend (.env)
 ├─ VITE_API_URL=http://localhost:5000
 └─ (Public - no sensitive data)

Backend (.env)
 ├─ OPENROUTER_API_KEY=sk-or-v1-xxxxx
 └─ (Private - never exposed to frontend)

Firebase (firebase.ts)
 ├─ Firebase config (public)
 └─ User auth tokens (managed by SDK)

.gitignore
 ├─ .env files excluded
 ├─ ChromaDB storage excluded
 └─ Python cache excluded
```

---

## Performance Characteristics

| Component | Latency | Notes |
|-----------|---------|-------|
| Frontend Load | < 1s | React SPA |
| API Call | 2-5s | Includes all steps |
| Embedding | < 100ms | SentenceTransformer |
| Vector Search | < 100ms | ChromaDB query |
| LLM Generation | 2-4s | OpenRouter API |
| Total Response | 2-5s | End-to-end |

---

## Deployment Architecture

### Development:
```
localhost:8080 (Frontend)
     ↓
localhost:5000 (Backend)
     ↓
openrouter.ai (LLM)
```

### Production:
```
vercel.app (Frontend)
     ↓
railway.app/render.com (Backend)
     ↓
openrouter.ai (LLM)
```

---

**Last Updated:** November 10, 2025
