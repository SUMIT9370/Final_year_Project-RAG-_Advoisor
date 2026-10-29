# Legal Documents Collection

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
