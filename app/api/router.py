from fastapi import APIRouter

from app.api.endpoints import health
from app.api.endpoints import customers

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(customers.router)