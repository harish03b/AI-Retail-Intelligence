from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API routes
app.include_router(api_router)


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