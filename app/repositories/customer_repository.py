from sqlalchemy.orm import Session

from app.models.customer import Customer


class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_customer_id(self, customer_id: str):
        return (
            self.db.query(Customer)
            .filter(Customer.customer_id == customer_id)
            .first()
        )
    def get_all(self):
        return (
        self.db.query(Customer)
        .order_by(Customer.customer_key)
        .all()
    )

    def create(self, customer: Customer):
        self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        return customer