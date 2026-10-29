#!/usr/bin/env python3
"""
Script to ingest legal documents from a folder into the RAG system
"""

import os
import sys
from pathlib import Path

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from rag_pipeline import LegalRAGPipeline
from ingest import DocumentIngestionService

def ingest_legal_documents(folder_path: str):
    """
    Ingest all legal documents from a specified folder
    
    Args:
        folder_path (str): Path to folder containing legal documents
    """
    print("🏛️ Legal AI Advisor - Document Ingestion")
    print("=" * 50)
    
    # Validate folder exists
    if not os.path.exists(folder_path):
        print(f"❌ Error: Folder '{folder_path}' does not exist")
        return
    
    print(f"📁 Scanning folder: {folder_path}")
    
    try:
        # Initialize RAG pipeline
        print("🔄 Initializing RAG pipeline...")
        pipeline = LegalRAGPipeline()
        ingestion_service = DocumentIngestionService(pipeline)
        
        # Ingest all documents from folder
        print("📚 Starting document ingestion...")
        result = ingestion_service.ingest_directory(folder_path)
        
        if result["success"]:
            print(f"✅ Ingestion completed successfully!")
            print(f"📄 Total files processed: {result['total_files']}")
            print(f"✅ Successfully ingested: {len(result['ingested_files'])}")
            print(f"❌ Failed: {len(result['failed_files'])}")
            print(f"💾 Total size: {result['total_size'] / (1024*1024):.2f} MB")
            
            if result['ingested_files']:
                print("\n📋 Successfully ingested files:")
                for file_path in result['ingested_files']:
                    print(f"  ✓ {os.path.basename(file_path)}")
            
            if result['failed_files']:
                print("\n❌ Failed files:")
                for failed in result['failed_files']:
                    print(f"  ✗ {os.path.basename(failed['file'])}: {failed['error']}")
        else:
            print(f"❌ Ingestion failed: {result['error']}")
            
    except Exception as e:
        print(f"❌ Error during ingestion: {str(e)}")
        return
    
    print("\n🎉 Document ingestion completed!")

def main():
    """Main function to run ingestion"""
    # Default folder paths to check
    default_folders = [
        "legal_documents",
        "documents", 
        "legal_docs",
        "indian_legal_docs"
    ]
    
    # Check if user provided a folder path
    if len(sys.argv) > 1:
        folder_path = sys.argv[1]
    else:
        print("📂 Available folders:")
        for i, folder in enumerate(default_folders, 1):
            if os.path.exists(folder):
                print(f"  {i}. {folder}/ (exists)")
            else:
                print(f"  {i}. {folder}/ (create this folder)")
        
        print("\n💡 Usage:")
        print(f"  python {__file__} <folder_path>")
        print(f"  python {__file__} legal_documents")
        print(f"  python {__file__} C:\\path\\to\\your\\legal\\documents")
        
        # Try to find an existing folder
        for folder in default_folders:
            if os.path.exists(folder):
                use_folder = input(f"\nUse existing folder '{folder}'? (y/n): ").lower()
                if use_folder == 'y':
                    folder_path = folder
                    break
        else:
            print("\n📁 Creating 'legal_documents' folder for you...")
            os.makedirs("legal_documents", exist_ok=True)
            folder_path = "legal_documents"
            print(f"✅ Created folder: {folder_path}")
            print(f"📄 Please add your legal documents to this folder and run again.")
            return
    
    # Start ingestion
    ingest_legal_documents(folder_path)

if __name__ == "__main__":
    main()
