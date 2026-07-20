from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.customer_repository import CustomerRepository
from app.schemas.customer_schema import CustomerResponse

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


@router.get("/", response_model=list[CustomerResponse])
def get_customers(db: Session = Depends(get_db)):
    repository = CustomerRepository(db)
    return repository.get_all()


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: str, db: Session = Depends(get_db)):
    repository = CustomerRepository(db)

    customer = repository.get_by_customer_id(customer_id)

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer