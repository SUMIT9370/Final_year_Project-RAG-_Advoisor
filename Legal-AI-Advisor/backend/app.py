import os
import time
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from pathlib import Path

from rag_pipeline import LegalRAGPipeline
from ingest import DocumentIngestionService
from config import Config
from utils.logger import setup_logger, log_request, log_response, log_error
from utils.helpers import (
    generate_unique_filename, sanitize_filename, create_error_response, 
    create_success_response, validate_json_structure
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configure Flask
app.config['SECRET_KEY'] = Config.SECRET_KEY
app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = Config.MAX_CONTENT_LENGTH

# Create upload directory
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Setup logger
logger = setup_logger('legal_ai_api', Config.LOG_FILE, Config.LOG_LEVEL)

# Initialize services
try:
    rag_pipeline = LegalRAGPipeline()
    ingestion_service = DocumentIngestionService(rag_pipeline)
    logger.info("Services initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize services: {str(e)}")
    rag_pipeline = None
    ingestion_service = None

@app.before_request
def log_request_info():
    """Log incoming requests"""
    start_time = time.time()
    request.start_time = start_time
    log_request(logger, request.method, request.endpoint, request.remote_addr)

@app.after_request
def log_response_info(response):
    """Log outgoing responses"""
    if hasattr(request, 'start_time'):
        response_time = time.time() - request.start_time
        log_response(logger, request.method, request.endpoint, response.status_code, response_time)
    return response

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(e):
    """Handle file size exceeded error"""
    return jsonify(create_error_response(
        f"File too large. Maximum size is {Config.MAX_CONTENT_LENGTH / (1024*1024)}MB",
        413
    )), 413

@app.errorhandler(Exception)
def handle_exception(e):
    """Handle general exceptions"""
    log_error(logger, e, f"Unhandled exception in {request.endpoint}")
    return jsonify(create_error_response(
        "Internal server error",
        500
    )), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        status = {
            "status": "healthy",
            "services": {
                "rag_pipeline": rag_pipeline is not None,
                "ingestion_service": ingestion_service is not None
            },
            "config": {
                "embedding_model": Config.EMBEDDING_MODEL,
                "llm_model": Config.LLM_MODEL,
                "max_file_size": f"{Config.MAX_CONTENT_LENGTH / (1024*1024)}MB"
            }
        }
        
        if rag_pipeline:
            vector_info = rag_pipeline.get_vector_store_info()
            status["vector_store"] = vector_info
        
        return jsonify(create_success_response(status, "Health check successful"))
        
    except Exception as e:
        log_error(logger, e, "Health check failed")
        return jsonify(create_error_response(
            "Health check failed",
            500
        )), 500

@app.route('/upload', methods=['POST'])
def upload_document():
    """Upload and ingest legal documents"""
    try:
        if not ingestion_service:
            return jsonify(create_error_response(
                "Service not available",
                503
            )), 503
        
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify(create_error_response(
                "No file provided",
                400
            )), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify(create_error_response(
                "No file selected",
                400
            )), 400
        
        # Validate and save file
        original_filename = secure_filename(file.filename)
        sanitized_filename = sanitize_filename(original_filename)
        unique_filename = generate_unique_filename(sanitized_filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        # Save file
        file.save(file_path)
        
        # Validate file before ingestion
        validation = ingestion_service.validate_file(file_path)
        if not validation["valid"]:
            # Clean up invalid file
            os.remove(file_path)
            return jsonify(create_error_response(
                validation["error"],
                400
            )), 400
        
        # Ingest document
        result = ingestion_service.ingest_file(file_path)
        
        if result["success"]:
            # Clean up uploaded file after successful ingestion
            os.remove(file_path)
            
            response_data = {
                "filename": original_filename,
                "file_size": result.get("file_size", 0),
                "ingestion_time": time.time()
            }
            
            return jsonify(create_success_response(
                response_data,
                result["message"]
            ))
        else:
            # Clean up file on failed ingestion
            os.remove(file_path)
            return jsonify(create_error_response(
                result["error"],
                500
            )), 500
            
    except Exception as e:
        log_error(logger, e, "Document upload failed")
        return jsonify(create_error_response(
            "Failed to upload document",
            500
        )), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    """Ask legal questions to the AI"""
    try:
        if not rag_pipeline:
            return jsonify(create_error_response(
                "RAG service not available",
                503
            )), 503
        
        # Validate request
        data = request.get_json()
        if not data:
            return jsonify(create_error_response(
                "No JSON data provided",
                400
            )), 400
        
        # Validate required fields
        validation = validate_json_structure(data, ['question'])
        if not validation["valid"]:
            return jsonify(create_error_response(
                f"Missing required fields: {validation['missing_fields']}",
                400
            )), 400
        
        question = data['question'].strip()
        if not question:
            return jsonify(create_error_response(
                "Question cannot be empty",
                400
            )), 400
        
        # Optional parameters
        k = data.get('k', Config.RETRIEVAL_K)
        if isinstance(k, str) and k.isdigit():
            k = int(k)
        
        # Query the RAG system
        result = rag_pipeline.query(question)
        
        # Format response
        response_data = {
            "question": question,
            "answer": result["answer"],
            "sources": result.get("sources", []),
            "timestamp": time.time()
        }
        
        if "error" in result:
            response_data["error"] = result["error"]
        
        return jsonify(create_success_response(
            response_data,
            "Question processed successfully"
        ))
        
    except Exception as e:
        log_error(logger, e, "Question processing failed")
        return jsonify(create_error_response(
            "Failed to process question",
            500
        )), 500

@app.route('/sources', methods=['GET'])
def get_sources():
    """Get information about document sources"""
    try:
        if not rag_pipeline:
            return jsonify(create_error_response(
                "RAG service not available",
                503
            )), 503
        
        # Get vector store information
        info = rag_pipeline.get_vector_store_info()
        
        # Get supported formats
        supported_formats = ingestion_service.get_supported_formats() if ingestion_service else []
        
        response_data = {
            "vector_store": info,
            "supported_formats": supported_formats,
            "config": {
                "chunk_size": Config.CHUNK_SIZE,
                "chunk_overlap": Config.CHUNK_OVERLAP,
                "retrieval_k": Config.RETRIEVAL_K
            }
        }
        
        return jsonify(create_success_response(
            response_data,
            "Sources information retrieved successfully"
        ))
        
    except Exception as e:
        log_error(logger, e, "Failed to get sources")
        return jsonify(create_error_response(
            "Failed to retrieve sources information",
            500
        )), 500

@app.route('/config', methods=['GET'])
def get_config():
    """Get public configuration information"""
    try:
        public_config = {
            "supported_formats": ingestion_service.get_supported_formats() if ingestion_service else [],
            "max_file_size": f"{Config.MAX_CONTENT_LENGTH / (1024*1024)}MB",
            "models": {
                "embedding": Config.EMBEDDING_MODEL,
                "llm": Config.LLM_MODEL
            },
            "rag_config": {
                "chunk_size": Config.CHUNK_SIZE,
                "chunk_overlap": Config.CHUNK_OVERLAP,
                "retrieval_k": Config.RETRIEVAL_K
            }
        }
        
        return jsonify(create_success_response(
            public_config,
            "Configuration retrieved successfully"
        ))
        
    except Exception as e:
        log_error(logger, e, "Failed to get configuration")
        return jsonify(create_error_response(
            "Failed to retrieve configuration",
            500
        )), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    try:
        stats = {
            "system": {
                "status": "running",
                "uptime": time.time(),
                "version": "1.0.0"
            },
            "services": {
                "rag_pipeline": rag_pipeline is not None,
                "ingestion_service": ingestion_service is not None
            }
        }
        
        if rag_pipeline:
            vector_info = rag_pipeline.get_vector_store_info()
            stats["vector_store"] = vector_info
            
            # Get conversation history length
            if hasattr(rag_pipeline, 'conversation_history'):
                stats["conversation_history_length"] = len(rag_pipeline.conversation_history)
        
        return jsonify(create_success_response(
            stats,
            "Statistics retrieved successfully"
        ))
        
    except Exception as e:
        log_error(logger, e, "Failed to get statistics")
        return jsonify(create_error_response(
            "Failed to retrieve statistics",
            500
        )), 500

if __name__ == '__main__':
    try:
        logger.info("Starting Legal AI Advisor API Server")
        logger.info(f"Debug mode: {app.debug}")
        logger.info(f"Upload folder: {app.config['UPLOAD_FOLDER']}")
        logger.info(f"Max file size: {Config.MAX_CONTENT_LENGTH / (1024*1024)}MB")
        
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True
        )
        
    except Exception as e:
        log_error(logger, e, "Failed to start server")
        print(f"Failed to start server: {str(e)}")
