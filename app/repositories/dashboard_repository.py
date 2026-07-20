from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.fact_sales import FactSales
from app.models.product import Product

from app.models.category import Category
from app.models.date import DateDimension
from app.models.fact_sales import FactSales
from app.models.product import Product
from app.models.customer import Customer
from app.models.store import Store


class DashboardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_summary(self):
        total_sales = (
            self.db.query(func.sum(FactSales.sales))
            .scalar()
            or 0
        )

        total_orders = (
            self.db.query(func.count(FactSales.order_id))
            .scalar()
            or 0
        )

        total_customers = (
            self.db.query(func.count(Customer.customer_key))
            .scalar()
            or 0
        )

        total_products = (
            self.db.query(func.count(Product.product_key))
            .scalar()
            or 0
        )

        return {
            "total_sales": float(total_sales),
            "total_orders": total_orders,
            "total_customers": total_customers,
            "total_products": total_products,
        }
    

    def get_monthly_sales(self):
        return (
            self.db.query(
                DateDimension.year,
                DateDimension.month,
                DateDimension.month_name,
                func.sum(FactSales.sales).label("total_sales"),
            )
            .join(
                DateDimension,
                FactSales.date_key == DateDimension.date_key,
            )
            .group_by(
                DateDimension.year,
                DateDimension.month,
                DateDimension.month_name,
            )
            .order_by(
                DateDimension.year,
                DateDimension.month,
            )
            .all()
        )

    def get_top_products(self):
        return (
            self.db.query(
                Product.product_name,
                func.sum(FactSales.sales).label("total_sales"),
            )
            .join(
                Product,
                FactSales.product_key == Product.product_key,
            )
            .group_by(Product.product_name)
            .order_by(func.sum(FactSales.sales).desc())
            .limit(10)
            .all()
        )

    def get_top_customers(self):
        return (
            self.db.query(
                Customer.customer_name,
                func.sum(FactSales.sales).label("total_sales"),
            )
            .join(
                Customer,
                FactSales.customer_key == Customer.customer_key,
            )
            .group_by(Customer.customer_name)
            .order_by(func.sum(FactSales.sales).desc())
            .limit(10)
            .all()
        )

    def get_store_performance(self):
        return (
            self.db.query(
                Store.city,
                Store.state,
                func.sum(FactSales.sales).label("total_sales"),
            )
            .join(
                Store,
                FactSales.store_key == Store.store_key,
            )
            .group_by(
                Store.city,
                Store.state,
            )
            .order_by(func.sum(FactSales.sales).desc())
            .all()
        )

    def get_category_sales(self):
        return (
            self.db.query(
                Category.category_name,
                func.sum(FactSales.sales).label("total_sales"),
            )
            .join(
                Product,
                FactSales.product_key == Product.product_key,
            )
            .join(
                Category,
                Product.category_key == Category.category_key,
            )
            .group_by(Category.category_name)
            .order_by(func.sum(FactSales.sales).desc())
            .all()
        )