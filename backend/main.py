from pathlib import Path

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router

from backend.rag.document_manager import (
    delete_document,
    list_documents,
    upload_document,
)

from backend.rag.retriever import (
    refresh_vector_store,
)

from backend.rag.vector_store import (
    add_document_to_vector_store,
    create_vector_store,
)

app = FastAPI(
    title="Enterprise Retail Decision Intelligence Platform API",
    description=(
        "REST API for Retail Analytics, Data Warehouse, "
        "Machine Learning, and AI-powered insights."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ==========================================================
# CORS Configuration
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================================
# Register API Routes
# ==========================================================

app.include_router(api_router)

# ==========================================================
# Static Documents
# ==========================================================

documents_directory = Path(__file__).parent / "documents"

app.mount(
    "/files",
    StaticFiles(
        directory=documents_directory,
    ),
    name="files",
)

# ==========================================================
# Document APIs
# ==========================================================

@app.get(
    "/documents",
    tags=["Documents"],
    summary="List Available Documents",
)
def get_documents():
    """
    Return all uploaded PDF documents.
    """

    return list_documents()


@app.post(
    "/documents/upload",
    tags=["Documents"],
    summary="Upload PDF Document",
)
async def upload_pdf(
    file: UploadFile = File(...),
):
    """
    Upload a PDF and immediately
    index it into the FAISS vector store.
    """

    # Save uploaded file
    file_path = await upload_document(file)

    # Incrementally index only this PDF
    add_document_to_vector_store(
        file_path,
    )

    # Refresh retriever cache
    refresh_vector_store()

    return {
        "message": "Document uploaded and indexed successfully.",
        "filename": file.filename,
    }


@app.delete(
    "/documents/{filename}",
    tags=["Documents"],
    summary="Delete PDF Document",
)
def delete_pdf(
    filename: str,
):
    """
    Delete a PDF document and rebuild
    the FAISS vector store.
    """

    deleted_file = delete_document(
        filename,
    )

    print("Rebuilding FAISS index...")

    create_vector_store()

    refresh_vector_store()

    print("FAISS rebuild completed.")

    return {
        "message": "Document deleted and vector store rebuilt successfully.",
        "filename": deleted_file.name,
    }


# ==========================================================
# Root Endpoint
# ==========================================================

@app.get(
    "/",
    tags=["Root"],
    summary="API Status",
)
def root():
    return {
        "status": "running",
        "application": "Enterprise Retail Decision Intelligence Platform",
        "version": "1.0.0",
    }