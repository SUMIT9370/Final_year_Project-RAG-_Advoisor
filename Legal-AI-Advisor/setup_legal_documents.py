#!/usr/bin/env python3
"""
Setup script to create sample legal documents folder structure
"""

import os
from pathlib import Path

def create_legal_document_structure():
    """Create folder structure for legal documents"""
    
    base_path = "legal_documents"
    
    # Create main folders
    folders = [
        "indian_penal_code",
        "constitution",
        "court_judgments", 
        "legal_acts",
        "contracts",
        "regulations"
    ]
    
    print("🏛️ Creating Legal Document Structure")
    print("=" * 40)
    
    # Create base directory
    os.makedirs(base_path, exist_ok=True)
    print(f"📁 Created: {base_path}/")
    
    # Create subdirectories
    for folder in folders:
        folder_path = os.path.join(base_path, folder)
        os.makedirs(folder_path, exist_ok=True)
        print(f"📂 Created: {folder_path}/")
    
    # Create README for each folder
    readme_content = {
        "indian_penal_code": """# Indian Penal Code Documents

Add your IPC documents here:
- IPC Complete PDF
- Individual sections
- Amendments
- Related notifications

Supported formats: PDF, DOCX, TXT
""",
        
        "constitution": """# Constitution of India Documents

Add constitutional documents here:
- Constitution of India PDF
- Preamble and parts
- Amendments
- Constitutional articles

Supported formats: PDF, DOCX, TXT
""",
        
        "court_judgments": """# Court Judgments Documents

Add court judgment documents here:
- Supreme Court judgments
- High Court judgments  
- Landmark cases
- Case law summaries

Supported formats: PDF, DOCX, TXT
""",
        
        "legal_acts": """# Legal Acts Documents

Add legal acts and statutes here:
- Various state and central acts
- Amendment acts
- Bill documents
- Act summaries

Supported formats: PDF, DOCX, TXT
""",
        
        "contracts": """# Contract Documents

Add contract-related documents here:
- Sample contracts
- Agreement templates
- Contract clauses
- Legal agreements

Supported formats: PDF, DOCX, TXT
""",
        
        "regulations": """# Legal Regulations Documents

Add regulatory documents here:
- Government regulations
- Rules and notifications
- Compliance documents
- Regulatory guidelines

Supported formats: PDF, DOCX, TXT
"""
    }
    
    # Create README files
    for folder, content in readme_content.items():
        readme_path = os.path.join(base_path, folder, "README.md")
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"📄 Created: {readme_path}")
    
    # Create main README
    main_readme = """# Legal Documents Collection

This folder contains legal documents for the Legal AI Advisor system.

## Folder Structure

- `indian_penal_code/` - Indian Penal Code documents
- `constitution/` - Constitution of India documents  
- `court_judgments/` - Court judgment documents
- `legal_acts/` - Various legal acts and statutes
- `contracts/` - Contract and agreement documents
- `regulations/` - Government regulations and rules

## How to Ingest

1. Add your legal documents to the appropriate folders
2. Run the ingestion script:
   ```bash
   cd backend
   python ingest_documents.py ../legal_documents
   ```

## Supported Formats

- PDF files (.pdf)
- Word documents (.docx)
- Text files (.txt)

## File Size Limit

Maximum file size: 50MB per document

## Next Steps

1. Add your legal documents to these folders
2. Run the ingestion script
3. Start the application and ask questions!
"""
    
    main_readme_path = os.path.join(base_path, "README.md")
    with open(main_readme_path, 'w', encoding='utf-8') as f:
        f.write(main_readme)
    print(f"📄 Created: {main_readme_path}")
    
    print("\n✅ Legal document structure created successfully!")
    print(f"\n📁 Location: {os.path.abspath(base_path)}")
    print("\n📋 Next Steps:")
    print("1. Add your legal documents to the folders")
    print("2. Run: cd backend && python ingest_documents.py ../legal_documents")
    print("3. Start the application and begin asking questions!")

if __name__ == "__main__":
    create_legal_document_structure()
