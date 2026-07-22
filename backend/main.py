from pathlib import Path

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router

from backend.rag.document_manager import (
    list_documents,
    upload_document,
)

from backend.rag.vector_store import (
    add_document_to_vector_store,
)

from backend.rag.retriever import (
    refresh_vector_store,
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
# Static PDF Files
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

    # Add only this document
    # to the existing FAISS index
    add_document_to_vector_store(
        file_path,
    )

    # Refresh cached retriever
    refresh_vector_store()

    return {
        "message": "Document uploaded and indexed successfully.",
        "filename": file.filename,
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