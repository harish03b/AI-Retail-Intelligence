from sqlalchemy.orm import Session

from app.models.product import Product


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_product_id(self, product_id: str):
        return (
            self.db.query(Product)
            .filter(Product.product_id == product_id)
            .first()
        )

    def create(self, product: Product):
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product