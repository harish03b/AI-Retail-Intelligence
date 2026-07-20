from fastapi import APIRouter

from app.api.endpoints import health
from app.api.endpoints import customers
from app.api.endpoints import dashboard

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(customers.router)
api_router.include_router(dashboard.router)