from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
import requests
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

# Load environment variables
load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load dataset
with open("indian_government_schemes_sample.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Prepare document content
documents = [item["text"] for item in data]
metadatas = [{"id": item["id"], "title": item["title"], "source": item["source"]} for item in data]
ids = [item["id"] for item in data]

# Setup ChromaDB
chroma_client = chromadb.Client(Settings(anonymized_telemetry=False))
collection = chroma_client.get_or_create_collection(name="gov_schemes")

# Initialize embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Check if data already exists in ChromaDB
existing = collection.count()
if existing == 0:
    print("🔄 Creating embeddings and adding to ChromaDB...")
    vectors = model.encode(documents).tolist()
    collection.add(
        embeddings=vectors,
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )
    print(f"✅ Added {len(documents)} documents to ChromaDB")
else:
    print(f"✅ {existing} documents already in ChromaDB")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "message": "RAG API is running",
        "documents_count": collection.count()
    }), 200

@app.route('/ask', methods=['POST'])
def ask_question():
    """Main endpoint to ask questions and get RAG-based answers"""
    try:
        # Get question from request
        data = request.get_json()
        query = data.get('question', '')
        language = data.get('language', 'en')
        
        if not query:
            return jsonify({"error": "Question is required"}), 400
        
        print(f"📝 Received question: {query} (Language: {language})")
        
        # Generate query embedding
        query_vector = model.encode([query]).tolist()
        
        # Retrieve relevant documents from ChromaDB
        results = collection.query(query_embeddings=query_vector, n_results=3)
        retrieved_docs = results["documents"][0]
        retrieved_metadata = results["metadatas"][0]
        
        # Prepare context
        context = "\n\n".join(retrieved_docs)
        
        print("🔍 Retrieved relevant documents from vector DB")
        
        # Prepare system prompt based on language
        system_prompts = {
            "en": "You are a helpful assistant who explains Indian government schemes and legal rights in simple, clear English. Provide step-by-step guidance when applicable.",
            "hi": "आप एक सहायक सहायक हैं जो भारतीय सरकारी योजनाओं और कानूनी अधिकारों को सरल, स्पष्ट हिंदी में समझाते हैं। जब लागू हो तो चरण-दर-चरण मार्गदर्शन प्रदान करें।",
            "ta": "நீங்கள் இந்திய அரசு திட்டங்கள் மற்றும் சட்ட உரிமைகளை எளிய, தெளிவான தமிழில் விளக்கும் உதவியாளர். பொருத்தமான போது படிப்படியான வழிகாட்டுதலை வழங்கவும்."
        }
        
        system_prompt = system_prompts.get(language, system_prompts["en"])
        
        # Generate answer using OpenRouter API
        print("🤖 Generating answer with LLM...")
        
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        
        body = {
            "model": "meta-llama/llama-4-scout:free",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Using the following information:\n\n{context}\n\nAnswer the question: {query}"}
            ]
        }
        
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=body,
            timeout=30
        )
        
        if response.status_code != 200:
            print(f"❌ OpenRouter API error: {response.status_code}")
            return jsonify({"error": "Failed to generate answer"}), 500
        
        answer = response.json()["choices"][0]["message"]["content"]
        
        print("✅ Answer generated successfully")
        
        # Return structured response
        return jsonify({
            "question": query,
            "answer": answer,
            "language": language,
            "sources": retrieved_metadata,
            "context_used": len(retrieved_docs)
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🚀 Starting RAG API Server")
    print("="*50)
    print(f"📊 Loaded {len(documents)} government schemes")
    print(f"🗄️  ChromaDB documents: {collection.count()}")
    print(f"🌐 API running on http://localhost:5000")
    print("="*50 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
