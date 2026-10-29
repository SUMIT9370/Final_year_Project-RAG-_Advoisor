import os
import logging
from typing import List, Dict, Any, Optional
from pathlib import Path

from langchain_community.document_loaders import PDFPlumberLoader, Docx2txtLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.schema import Document

from config import Config

# Configure logging
logging.basicConfig(
    level=getattr(logging, Config.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(Config.LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class LegalRAGPipeline:
    """Production-ready RAG pipeline for Legal AI Advisor"""
    
    def __init__(self):
        """Initialize the RAG pipeline"""
        try:
            Config.validate_config()
            self.embeddings = self._initialize_embeddings()
            self.llm = self._initialize_llm()
            self.vector_store = None
            self.qa_chain = None
            self.conversation_history = []
            
            # Try to load existing vector store
            self.load_vector_store()
            
            logger.info("RAG Pipeline initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize RAG Pipeline: {str(e)}")
            raise
    
    def _initialize_embeddings(self) -> HuggingFaceEmbeddings:
        """Initialize HuggingFace embeddings"""
        try:
            embeddings = HuggingFaceEmbeddings(
                model_name=Config.EMBEDDING_MODEL,
                model_kwargs={'device': 'cpu'},
                encode_kwargs={'normalize_embeddings': True}
            )
            logger.info(f"Embeddings initialized with model: {Config.EMBEDDING_MODEL}")
            return embeddings
        except Exception as e:
            logger.error(f"Failed to initialize embeddings: {str(e)}")
            raise
    
    def _initialize_llm(self) -> ChatGroq:
        """Initialize Groq LLM"""
        try:
            llm = ChatGroq(
                model=Config.LLM_MODEL,
                temperature=0.1,  # Low temperature for legal accuracy
                groq_api_key=Config.GROQ_API_KEY
            )
            logger.info(f"LLM initialized with model: {Config.LLM_MODEL}")
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize LLM: {str(e)}")
            raise
    
    def load_documents(self, file_path: str) -> List[Document]:
        """Load documents from various file formats"""
        try:
            file_extension = Path(file_path).suffix.lower()
            
            if file_extension == '.pdf':
                loader = PDFPlumberLoader(file_path)
            elif file_extension == '.docx':
                loader = Docx2txtLoader(file_path)
            elif file_extension == '.txt':
                loader = TextLoader(file_path, encoding='utf-8')
            else:
                raise ValueError(f"Unsupported file format: {file_extension}")
            
            documents = loader.load()
            logger.info(f"Loaded {len(documents)} pages from {file_path}")
            return documents
            
        except Exception as e:
            logger.error(f"Failed to load documents from {file_path}: {str(e)}")
            raise
    
    def split_documents(self, documents: List[Document]) -> List[Document]:
        """Split documents into chunks using intelligent chunking"""
        try:
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=Config.CHUNK_SIZE,
                chunk_overlap=Config.CHUNK_OVERLAP,
                separators=["\n\n", "\n", ". ", " ", ""]
            )
            
            chunks = text_splitter.split_documents(documents)
            
            # Add metadata to chunks
            for i, chunk in enumerate(chunks):
                chunk.metadata.update({
                    'chunk_id': i,
                    'source_file': chunk.metadata.get('source', 'unknown'),
                    'page': chunk.metadata.get('page', 0)
                })
            
            logger.info(f"Split documents into {len(chunks)} chunks")
            return chunks
            
        except Exception as e:
            logger.error(f"Failed to split documents: {str(e)}")
            raise
    
    def create_vector_store(self, chunks: List[Document]) -> FAISS:
        """Create and save FAISS vector store"""
        try:
            # Create FAISS index
            vector_store = FAISS.from_documents(chunks, self.embeddings)
            
            # Save to disk
            os.makedirs(Config.FAISS_INDEX_PATH, exist_ok=True)
            vector_store.save_local(Config.FAISS_INDEX_PATH)
            
            self.vector_store = vector_store
            logger.info(f"Created and saved vector store with {len(chunks)} chunks")
            return vector_store
            
        except Exception as e:
            logger.error(f"Failed to create vector store: {str(e)}")
            raise
    
    def load_vector_store(self) -> FAISS:
        """Load existing FAISS vector store"""
        try:
            index_file = os.path.join(Config.FAISS_INDEX_PATH, "index.faiss")
            pkl_file = os.path.join(Config.FAISS_INDEX_PATH, "index.pkl")
            
            if os.path.exists(index_file) and os.path.exists(pkl_file):
                vector_store = FAISS.load_local(
                    Config.FAISS_INDEX_PATH, 
                    self.embeddings,
                    allow_dangerous_deserialization=True
                )
                self.vector_store = vector_store
                logger.info("Loaded existing vector store")
                return vector_store
            else:
                logger.warning("No existing vector store found")
                return None
                
        except Exception as e:
            logger.error(f"Failed to load vector store: {str(e)}")
            # If loading fails, try to continue without existing store
            return None
    
    def create_qa_chain(self):
        """Create RAG QA chain with legal-specific prompt"""
        try:
            if not self.vector_store:
                raise ValueError("Vector store not initialized")
            
            # Legal-specific prompt template
            template = """You are an AI Legal Assistant specializing in Indian law. 
            Use only the provided legal documents to answer the user's question. 
            Be precise, accurate, and cite relevant sections when possible.
            
            If the information is not found in the provided documents, respond with:
            "I cannot find this information in the uploaded legal documents."
            
            Context:
            {context}
            
            Question: {question}
            
            Answer:"""
            
            prompt = PromptTemplate(
                template=template,
                input_variables=["context", "question"]
            )
            
            # Create retriever
            retriever = self.vector_store.as_retriever(
                search_type="similarity",
                search_kwargs={"k": Config.RETRIEVAL_K}
            )
            
            # Create QA chain
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=retriever,
                chain_type_kwargs={"prompt": prompt},
                return_source_documents=True
            )
            
            logger.info("QA chain created successfully")
            
        except Exception as e:
            logger.error(f"Failed to create QA chain: {str(e)}")
            raise
    
    def query(self, question: str) -> Dict[str, Any]:
        """Query the RAG system"""
        try:
            if not self.qa_chain:
                self.load_vector_store()
                self.create_qa_chain()
            
            # Add to conversation history
            self.conversation_history.append({"question": question})
            
            # Get response
            result = self.qa_chain({"query": question})
            
            # Extract sources
            sources = []
            if "source_documents" in result:
                for doc in result["source_documents"]:
                    sources.append({
                        "content": doc.page_content[:200] + "...",
                        "metadata": doc.metadata
                    })
            
            response = {
                "answer": result["result"],
                "sources": sources,
                "question": question
            }
            
            # Add to conversation history
            self.conversation_history.append({"answer": response["answer"]})
            
            logger.info(f"Query processed successfully: {question[:50]}...")
            return response
            
        except Exception as e:
            logger.error(f"Failed to process query: {str(e)}")
            return {
                "answer": "I apologize, but I encountered an error processing your question. Please try again.",
                "sources": [],
                "question": question,
                "error": str(e)
            }
    
    def add_documents(self, file_path: str) -> bool:
        """Add new documents to the vector store"""
        try:
            # Load and split documents
            documents = self.load_documents(file_path)
            chunks = self.split_documents(documents)
            
            if len(chunks) == 0:
                logger.warning(f"No chunks created from {file_path}")
                return False
            
            # Load existing vector store or create new one
            if self.vector_store is None:
                self.load_vector_store()
            
            if self.vector_store is None:
                # Create new vector store
                self.create_vector_store(chunks)
            else:
                # Add to existing vector store
                self.vector_store.add_documents(chunks)
                self.vector_store.save_local(Config.FAISS_INDEX_PATH)
            
            # Recreate QA chain with updated vector store
            self.create_qa_chain()
            
            logger.info(f"Successfully added {len(chunks)} chunks from {file_path}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to add documents: {str(e)}")
            return False
    
    def get_vector_store_info(self) -> Dict[str, Any]:
        """Get information about the vector store"""
        try:
            if self.vector_store is None:
                self.load_vector_store()
            
            if self.vector_store is None:
                return {"status": "No vector store found"}
            
            # Get basic info
            info = {
                "status": "Vector store loaded",
                "embedding_model": Config.EMBEDDING_MODEL,
                "llm_model": Config.LLM_MODEL,
                "retrieval_k": Config.RETRIEVAL_K
            }
            
            return info
            
        except Exception as e:
            logger.error(f"Failed to get vector store info: {str(e)}")
            return {"status": "Error", "error": str(e)}

# Global pipeline instance
rag_pipeline = LegalRAGPipeline()
