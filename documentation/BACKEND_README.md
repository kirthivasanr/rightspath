# Backend API Service

This is the Python Flask backend that provides RAG (Retrieval-Augmented Generation) capabilities for the RightsPath application.

## Features

- **RAG Implementation**: Uses ChromaDB for vector storage and retrieval
- **Embeddings**: SentenceTransformer model (`all-MiniLM-L6-v2`)
- **LLM**: OpenRouter API with Meta Llama 4 Scout
- **Multi-language Support**: Responds in English, Hindi, and Tamil
- **REST API**: Flask-based API with CORS enabled

## Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the `backend` folder (already created):
```
OPENROUTER_API_KEY=your_api_key_here
```

### 3. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```

Returns the status of the API and document count.

**Response:**
```json
{
  "status": "healthy",
  "message": "RAG API is running",
  "documents_count": 100
}
```

### Ask Question
```
POST /ask
```

Submit a question and get an AI-generated answer based on retrieved documents.

**Request Body:**
```json
{
  "question": "How to apply for PM Awas Yojana?",
  "language": "en"
}
```

**Response:**
```json
{
  "question": "How to apply for PM Awas Yojana?",
  "answer": "Detailed answer here...",
  "language": "en",
  "sources": [...],
  "context_used": 3
}
```

## How It Works

1. **Question Received**: User submits a question from the frontend
2. **Embedding**: Question is converted to vector embedding
3. **Retrieval**: ChromaDB finds top 3 most relevant documents
4. **Generation**: OpenRouter LLM generates answer using retrieved context
5. **Response**: Structured answer sent back to frontend

## Dataset

The backend uses `indian_government_schemes_sample.json` containing information about Indian government schemes and legal rights.
