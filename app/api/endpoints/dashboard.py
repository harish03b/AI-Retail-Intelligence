from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.dashboard_repository import DashboardRepository
from app.schemas.dashboard_schema import DashboardSummary
from app.schemas.dashboard_schema import (
    DashboardSummary,
    MonthlySalesResponse,
    TopProductResponse,
    TopCustomerResponse,
    StorePerformanceResponse,
    CategorySalesResponse,
)
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def dashboard_summary(
    db: Session = Depends(get_db),
):
    repository = DashboardRepository(db)
    return repository.get_summary()

@router.get(
    "/monthly-sales",
    response_model=list[MonthlySalesResponse],
)
def monthly_sales(db: Session = Depends(get_db)):
    return DashboardRepository(db).get_monthly_sales()


@router.get(
    "/top-products",
    response_model=list[TopProductResponse],
)
def top_products(db: Session = Depends(get_db)):
    return DashboardRepository(db).get_top_products()


@router.get(
    "/top-customers",
    response_model=list[TopCustomerResponse],
)
def top_customers(db: Session = Depends(get_db)):
    return DashboardRepository(db).get_top_customers()


@router.get(
    "/store-performance",
    response_model=list[StorePerformanceResponse],
)
def store_performance(db: Session = Depends(get_db)):
    return DashboardRepository(db).get_store_performance()


@router.get(
    "/category-sales",
    response_model=list[CategorySalesResponse],
)
def category_sales(db: Session = Depends(get_db)):
    return DashboardRepository(db).get_category_sales()