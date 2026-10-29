import os
import uuid
import hashlib
from pathlib import Path
from typing import Dict, Any, List
from datetime import datetime

def generate_unique_filename(original_filename: str) -> str:
    """Generate a unique filename to prevent conflicts"""
    file_extension = Path(original_filename).suffix
    unique_id = str(uuid.uuid4())[:8]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{timestamp}_{unique_id}{file_extension}"

def calculate_file_hash(file_path: str) -> str:
    """Calculate SHA-256 hash of a file"""
    hash_sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_sha256.update(chunk)
    return hash_sha256.hexdigest()

def format_file_size(size_bytes: int) -> str:
    """Format file size in human-readable format"""
    if size_bytes == 0:
        return "0B"
    
    size_names = ["B", "KB", "MB", "GB", "TB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    
    return f"{size_bytes:.2f}{size_names[i]}"

def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage"""
    # Remove or replace unsafe characters
    unsafe_chars = '<>:"/\\|?*'
    for char in unsafe_chars:
        filename = filename.replace(char, '_')
    
    # Remove leading/trailing spaces and dots
    filename = filename.strip('. ')
    
    # Limit length
    if len(filename) > 255:
        name, ext = os.path.splitext(filename)
        filename = name[:255-len(ext)] + ext
    
    return filename

def validate_json_structure(data: Dict[str, Any], required_fields: List[str]) -> Dict[str, Any]:
    """Validate JSON structure and return validation result"""
    missing_fields = []
    invalid_fields = []
    
    for field in required_fields:
        if field not in data:
            missing_fields.append(field)
        elif data[field] is None or data[field] == "":
            invalid_fields.append(field)
    
    return {
        "valid": len(missing_fields) == 0 and len(invalid_fields) == 0,
        "missing_fields": missing_fields,
        "invalid_fields": invalid_fields
    }

def create_error_response(error_message: str, status_code: int = 500) -> Dict[str, Any]:
    """Create standardized error response"""
    return {
        "success": False,
        "error": error_message,
        "timestamp": datetime.now().isoformat(),
        "status_code": status_code
    }

def create_success_response(data: Any = None, message: str = "Success") -> Dict[str, Any]:
    """Create standardized success response"""
    response = {
        "success": True,
        "message": message,
        "timestamp": datetime.now().isoformat()
    }
    
    if data is not None:
        response["data"] = data
    
    return response

def extract_text_metadata(text: str, max_length: int = 200) -> Dict[str, Any]:
    """Extract metadata from text content"""
    return {
        "length": len(text),
        "word_count": len(text.split()),
        "line_count": len(text.split('\n')),
        "preview": text[:max_length] + "..." if len(text) > max_length else text
    }

def is_legal_document(filename: str) -> bool:
    """Check if filename suggests it's a legal document"""
    legal_keywords = [
        'act', 'law', 'code', 'constitution', 'judgment', 'court', 'legal',
        'section', 'amendment', 'bill', 'ordinance', 'rule', 'regulation'
    ]
    
    filename_lower = filename.lower()
    return any(keyword in filename_lower for keyword in legal_keywords)
