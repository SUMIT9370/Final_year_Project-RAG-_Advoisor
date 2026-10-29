import os
import logging
from pathlib import Path
from typing import List, Dict, Any

from rag_pipeline import LegalRAGPipeline

logger = logging.getLogger(__name__)

class DocumentIngestionService:
    """Service for ingesting legal documents into the RAG system"""
    
    def __init__(self, pipeline: LegalRAGPipeline):
        self.pipeline = pipeline
        self.supported_formats = ['.pdf', '.docx', '.txt']
    
    def ingest_file(self, file_path: str) -> Dict[str, Any]:
        """Ingest a single file into the RAG system"""
        try:
            # Validate file exists
            if not os.path.exists(file_path):
                return {
                    "success": False,
                    "error": f"File not found: {file_path}"
                }
            
            # Validate file format
            file_extension = Path(file_path).suffix.lower()
            if file_extension not in self.supported_formats:
                return {
                    "success": False,
                    "error": f"Unsupported file format: {file_extension}. Supported formats: {self.supported_formats}"
                }
            
            # Add documents to pipeline
            success = self.pipeline.add_documents(file_path)
            
            if success:
                return {
                    "success": True,
                    "message": f"Successfully ingested: {Path(file_path).name}",
                    "file_path": file_path,
                    "file_size": os.path.getsize(file_path)
                }
            else:
                return {
                    "success": False,
                    "error": f"Failed to ingest file: {file_path}"
                }
                
        except Exception as e:
            logger.error(f"Error ingesting file {file_path}: {str(e)}")
            return {
                "success": False,
                "error": f"Error ingesting file: {str(e)}"
            }
    
    def ingest_directory(self, directory_path: str) -> Dict[str, Any]:
        """Ingest all supported files from a directory"""
        try:
            if not os.path.exists(directory_path):
                return {
                    "success": False,
                    "error": f"Directory not found: {directory_path}"
                }
            
            results = {
                "success": True,
                "ingested_files": [],
                "failed_files": [],
                "total_files": 0,
                "total_size": 0
            }
            
            # Walk through directory
            for root, dirs, files in os.walk(directory_path):
                for file in files:
                    file_path = os.path.join(root, file)
                    file_extension = Path(file_path).suffix.lower()
                    
                    if file_extension in self.supported_formats:
                        result = self.ingest_file(file_path)
                        results["total_files"] += 1
                        
                        if result["success"]:
                            results["ingested_files"].append(file_path)
                            results["total_size"] += result.get("file_size", 0)
                        else:
                            results["failed_files"].append({
                                "file": file_path,
                                "error": result["error"]
                            })
            
            logger.info(f"Directory ingestion complete: {len(results['ingested_files'])} files ingested, {len(results['failed_files'])} failed")
            return results
            
        except Exception as e:
            logger.error(f"Error ingesting directory {directory_path}: {str(e)}")
            return {
                "success": False,
                "error": f"Error ingesting directory: {str(e)}"
            }
    
    def get_supported_formats(self) -> List[str]:
        """Get list of supported file formats"""
        return self.supported_formats.copy()
    
    def validate_file(self, file_path: str) -> Dict[str, Any]:
        """Validate a file before ingestion"""
        try:
            if not os.path.exists(file_path):
                return {
                    "valid": False,
                    "error": "File does not exist"
                }
            
            file_extension = Path(file_path).suffix.lower()
            if file_extension not in self.supported_formats:
                return {
                    "valid": False,
                    "error": f"Unsupported file format: {file_extension}",
                    "supported_formats": self.supported_formats
                }
            
            file_size = os.path.getsize(file_path)
            max_size = 50 * 1024 * 1024  # 50MB limit
            
            if file_size > max_size:
                return {
                    "valid": False,
                    "error": f"File too large: {file_size / (1024*1024):.2f}MB (max: {max_size / (1024*1024)}MB)"
                }
            
            return {
                "valid": True,
                "file_size": file_size,
                "file_extension": file_extension
            }
            
        except Exception as e:
            return {
                "valid": False,
                "error": f"Validation error: {str(e)}"
            }
