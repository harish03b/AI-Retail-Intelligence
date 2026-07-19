from sqlalchemy.orm import Session

from app.models.fact_sales import FactSales


class FactSalesRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, fact_sale: FactSales):
        self.db.add(fact_sale)
        self.db.commit()
        self.db.refresh(fact_sale)
        return fact_sale