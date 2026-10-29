import logging
import os
from datetime import datetime
from pathlib import Path

def setup_logger(name: str, log_file: str = None, level: str = 'INFO') -> logging.Logger:
    """Setup a logger with file and console handlers"""
    
    # Create logger
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, level.upper()))
    
    # Clear existing handlers
    logger.handlers.clear()
    
    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    # File handler
    if log_file:
        # Create logs directory if it doesn't exist
        log_dir = Path(log_file).parent
        log_dir.mkdir(parents=True, exist_ok=True)
        
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    
    return logger

def log_request(logger: logging.Logger, method: str, endpoint: str, user_ip: str = None):
    """Log API request"""
    message = f"API Request: {method} {endpoint}"
    if user_ip:
        message += f" from {user_ip}"
    logger.info(message)

def log_response(logger: logging.Logger, method: str, endpoint: str, status_code: int, response_time: float = None):
    """Log API response"""
    message = f"API Response: {method} {endpoint} - {status_code}"
    if response_time:
        message += f" ({response_time:.3f}s)"
    logger.info(message)

def log_error(logger: logging.Logger, error: Exception, context: str = None):
    """Log error with context"""
    message = f"Error: {str(error)}"
    if context:
        message = f"{context} - {message}"
    logger.error(message, exc_info=True)
