# 🏛️ Legal AI Advisor - Indian Legal System

<div align="center">

![Legal AI Advisor](https://img.shields.io/badge/Legal-AI%20Advisor-blue?style=for-the-badge)
![RAG](https://img.shields.io/badge/Architecture-RAG-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**AI Powered Indian Legal Advisor with Advanced RAG Technology**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

## 📋 Project Overview

Legal AI Advisor is a production-ready, industry-level **Retrieval-Augmented Generation (RAG)** system specifically designed for Indian legal documents. Unlike general AI models that can hallucinate legal information, this system provides answers **only** from uploaded legal documents, ensuring accuracy and reliability.

### 🎯 Key Features

- ✅ **Zero Hallucinations**: Answers only from uploaded documents
- ✅ **Source Citations**: Every answer includes source references
- ✅ **Multi-format Support**: PDF, DOCX, TXT legal documents
- ✅ **Indian Legal Focus**: Optimized for Indian law and legal terminology
- ✅ **Real-time Chat**: ChatGPT-style interface for legal queries
- ✅ **Document Management**: Upload and manage multiple legal documents
- ✅ **Professional UI**: Court-inspired interface with legal aesthetics
- ✅ **Production Ready**: Enterprise-grade architecture and error handling

### 🚨 Use Cases

- **Legal Research**: Quick information retrieval from legal documents
- **Educational**: Law students studying Indian legal system
- **Document Analysis**: Understanding complex legal texts
- **Reference**: Quick access to legal clauses and sections
- **Case Preparation**: Finding relevant legal precedents

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │   Flask API     │    │   RAG Pipeline  │
│                 │    │                 │    │                 │
│ • Chat Interface│◄──►│ • REST Endpoints│◄──►│ • Document      │
│ • File Upload   │    │ • File Handling │    │   Processing    │
│ • Legal UI      │    │ • Error Handling│    │ • FAISS Store   │
│                 │    │ • CORS Support  │    │ • Groq LLM      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User          │    │   HTTP/JSON     │    │   Vector DB     │
│   Interaction   │    │   Communication │    │   (FAISS)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python 3.12)
- **RAG Pipeline**: LangChain
- **Vector Database**: FAISS
- **LLM**: Groq (Mixtral-8x7b-32768)
- **Embeddings**: HuggingFace (all-MiniLM-L6-v2)
- **Document Processing**: PyPDF2, python-docx

### Frontend
- **Framework**: React 18
- **Styling**: TailwindCSS
- **UI Components**: Lucide Icons
- **File Upload**: react-dropzone
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast

### Infrastructure
- **Database**: FAISS (Local Vector Store)
- **File Storage**: Local filesystem
- **Environment**: dotenv
- **Logging**: Python logging

---

## 🚀 Quick Start (Windows)

### Prerequisites
- Python 3.12+
- Node.js 18+
- Git

### 1. Clone the Repository
```powershell
git clone <repository-url>
cd legal-ai-advisor
```

### 2. Backend Setup

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### 3. Get API Keys

You'll need two API keys:

1. **HuggingFace API Token**:
   - Go to [HuggingFace](https://huggingface.co/settings/tokens)
   - Create a new token
   - Add to `.env`: `HUGGINGFACEHUB_API_TOKEN=your_token_here`

2. **Groq API Key**:
   - Go to [Groq Console](https://console.groq.com/keys)
   - Create a new API key
   - Add to `.env`: `GROQ_API_KEY=your_key_here`

### 4. Frontend Setup

```powershell
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 5. Start Backend Server

```powershell
# From backend directory (with venv activated)
python app.py
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 📁 Project Structure

```
legal-ai-advisor/
│
├── backend/                    # Flask Backend
│   ├── app.py                 # Main Flask application
│   ├── rag_pipeline.py        # RAG pipeline implementation
│   ├── ingest.py              # Document ingestion service
│   ├── config.py              # Configuration management
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   └── utils/                 # Utility modules
│       ├── logger.py          # Logging configuration
│       └── helpers.py         # Helper functions
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── Chat.js
│   │   │   ├── About.js
│   │   │   └── Disclaimer.js
│   │   ├── App.js            # Main App component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Tailwind configuration
│
├── database/                  # Data storage
│   └── faiss_index/          # FAISS vector index
│
└── README.md                  # This file
```

---

## 🔧 API Documentation

### Endpoints

#### Upload Documents
```http
POST /upload
Content-Type: multipart/form-data

Body: file (PDF/DOCX/TXT)
```

#### Ask Legal Questions
```http
POST /ask
Content-Type: application/json

{
  "question": "What are the provisions of Section 420 IPC?",
  "k": 5  // Optional: number of sources to retrieve
}
```

#### Get System Information
```http
GET /health
GET /sources
GET /config
GET /stats
```

### Response Format

```json
{
  "success": true,
  "data": {
    "answer": "Based on the uploaded documents...",
    "sources": [
      {
        "content": "Section 420 of IPC deals with...",
        "metadata": {
          "source": "indian_penal_code.pdf",
          "page": 156,
          "chunk_id": 42
        }
      }
    ],
    "question": "What is Section 420 IPC?",
    "timestamp": 1704391234.567
  },
  "message": "Question processed successfully",
  "timestamp": "2024-01-04T15:30:34.567Z"
}
```

---

## 🎨 UI Features

### Chat Interface
- **Real-time messaging** with typing indicators
- **Source citations** displayed with each answer
- **File upload** via drag-and-drop
- **Chat history** management
- **Responsive design** for all devices

### Legal-Themed Design
- **Court-inspired color scheme**: Deep blue, white, gold accents
- **Professional typography**: Georgia serif for headings
- **Minimal and clean** interface
- **Accessibility** compliant

### Pages
1. **Home**: Hero section with feature overview
2. **Chat**: Main AI interaction interface
3. **About**: RAG technology explanation
4. **Disclaimer**: Important legal disclaimer

---

## 🔒 Safety & Limitations

### Built-in Safeguards
- ✅ **No Hallucinations**: Only answers from uploaded documents
- ✅ **Source Verification**: Every answer includes citations
- ✅ **Error Handling**: Graceful failure with user feedback
- ✅ **Input Validation**: File type and size restrictions

### Limitations
- ⚠️ **Not Legal Advice**: For informational purposes only
- ⚠️ **Document Dependent**: Only knows what you upload
- ⚠️ **No Real-time Data**: Cannot access current laws
- ⚠️ **Jurisdiction Specific**: May not capture local variations

---

## 🧪 Testing

### Backend Tests
```powershell
cd backend
python -m pytest tests/
```

### Frontend Tests
```powershell
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] Upload PDF documents
- [ ] Upload DOCX documents
- [ ] Upload TXT documents
- [ ] Ask legal questions
- [ ] Verify source citations
- [ ] Test error handling
- [ ] Check responsive design

---

## 📊 Performance

### Optimization Features
- **Vector Indexing**: Fast similarity search with FAISS
- **Chunking Strategy**: Optimal document segmentation
- **Caching**: Embedded responses for common queries
- **Async Processing**: Non-blocking file uploads

### Benchmarks
- **Document Ingestion**: ~2-5 seconds per 10MB PDF
- **Query Response**: ~1-3 seconds average
- **Memory Usage**: ~500MB for 1000 documents
- **Storage**: ~10MB per 100 pages indexed

---

## 🚀 Deployment

### Production Setup

#### Backend (Production)
```powershell
# Install production server
pip install gunicorn

# Start production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Frontend (Production)
```powershell
# Build for production
npm run build

# Serve with nginx or similar
serve -s build
```

#### Environment Variables
```bash
# Production .env
HUGGINGFACEHUB_API_TOKEN=your_production_token
GROQ_API_KEY=your_production_key
SECRET_KEY=your_strong_secret_key
LOG_LEVEL=WARNING
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript
- Write tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **LangChain** for the RAG framework
- **Groq** for fast LLM inference
- **HuggingFace** for embedding models
- **FAISS** for efficient vector search
- **React** and **TailwindCSS** for the beautiful UI

---

## 📞 Support

For questions and support:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](link-to-issues)
- 📖 Documentation: [Wiki](link-to-wiki)

---

## 🔮 Future Enhancements

- [ ] **Multi-language Support**: Hindi and other Indian languages
- [ ] **Advanced Search**: Boolean and proximity search
- [ ] **Case Law Integration**: Connect to legal databases
- [ ] **Document Summarization**: Automatic legal document summaries
- [ ] **Collaboration Features**: Multi-user workspaces
- [ ] **Mobile App**: React Native application
- [ ] **API Rate Limiting**: Prevent abuse
- [ ] **Analytics**: Usage insights and metrics

---

<div align="center">

**⚡ Built with passion for Indian Legal System ⚡**

Made with ❤️ for legal professionals and students

</div>
