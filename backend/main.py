from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.rag.document_manager import list_documents
from app.api.router import api_router

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

# -------------------------------------------------
# CORS Configuration
# -------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Register API Routes
# -------------------------------------------------

app.include_router(api_router)

# -------------------------------------------------
# Serve PDF Documents
# URL:
# http://127.0.0.1:8000/documents/<filename>
# -------------------------------------------------

documents_directory = Path(__file__).parent / "documents"

app.mount(
    "/documents",
    StaticFiles(directory=documents_directory),
    name="documents",
)

# -------------------------------------------------
# Root Endpoint
# -------------------------------------------------
@app.get(
    "/documents",
    tags=["Documents"],
    summary="List Available Documents",
)
def get_documents():
    return list_documents()

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