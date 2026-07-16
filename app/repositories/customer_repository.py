from sqlalchemy.orm import Session

from app.models.customer import Customer


class CustomerRepository:

    @staticmethod
    def get_all_customers(db: Session):

        return db.query(Customer).all()

    @staticmethod
    def get_customer_by_id(
        db: Session,
        customer_id: int,
    ):

        return (
            db.query(Customer)
            .filter(Customer.customer_id == customer_id)
            .first()
        )