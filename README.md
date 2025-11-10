# RightsPath - Legal Rights Assistant 🏛️⚖️

A multilingual AI-powered legal assistant that helps users understand their legal rights and access information about Indian government schemes.

## ✨ Features

- 🤖 **AI-Powered RAG System**: Intelligent answers using Retrieval-Augmented Generation
- 🌍 **Multilingual Support**: English, Hindi, and Tamil
- 🔐 **Firebase Authentication**: Secure user authentication
- 📚 **Government Schemes Database**: Information about Indian government schemes
- 💾 **Query History**: Save and access your previous queries
- 🎨 **Modern UI**: Built with React, TypeScript, and shadcn/ui

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3.11
- npm or bun

### Starting the Application

1. **Start Backend** (in one terminal):
   ```bash
   start-backend.bat
   ```
   Backend will run on: `http://localhost:5000`

2. **Start Frontend** (in another terminal):
   ```bash
   start-frontend.bat
   ```
   Frontend will run on: `http://localhost:8080`

3. **Access the App**: Open your browser to `http://localhost:8080`

## 📖 Documentation

All detailed documentation is available in the [`documentation/`](documentation/) folder:

- **[Quick Start Guide](documentation/QUICK_START.md)** - Detailed setup instructions
- **[Architecture](documentation/ARCHITECTURE.md)** - System design and architecture
- **[RAG Integration](documentation/RAG_INTEGRATION_DOCS.md)** - RAG implementation details
- **[Troubleshooting](documentation/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Documentation Index](documentation/INDEX.md)** - Full documentation index

## Project info

**URL**: https://lovable.dev/projects/9240c812-d25f-452d-a091-26a38565187f

## 🛠️ Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Firebase** for authentication

### Backend
- **Flask** (Python web framework)
- **ChromaDB** (Vector database)
- **Sentence Transformers** (Embeddings)
- **OpenRouter API** (LLaMA 4 Scout model)

## 📁 Project Structure

```
Lawyer/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── contexts/          # React contexts
├── backend/               # Flask backend
│   ├── app.py            # Main Flask application
│   └── *.json            # Government schemes data
├── documentation/         # All project documentation
├── public/               # Static assets
└── *.bat                 # Startup scripts

```

## 🔧 Development

### Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

### Environment Variables

Create `.env` files:

**Root `.env`** (Frontend):
```env
VITE_API_URL=http://localhost:5000
```

**`backend/.env`** (Backend):
```env
OPENROUTER_API_KEY=your_api_key_here
```

## 📝 License

This project is part of a legal rights assistance initiative.

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9240c812-d25f-452d-a091-26a38565187f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
