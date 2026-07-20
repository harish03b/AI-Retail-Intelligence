from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_sales: float
    total_orders: int
    total_customers: int
    total_products: int

class MonthlySalesResponse(BaseModel):
    year: int
    month: int
    month_name: str
    total_sales: float

    model_config = {"from_attributes": True}


class TopProductResponse(BaseModel):
    product_name: str
    total_sales: float

    model_config = {"from_attributes": True}


class TopCustomerResponse(BaseModel):
    customer_name: str
    total_sales: float

    model_config = {"from_attributes": True}


class StorePerformanceResponse(BaseModel):
    city: str
    state: str
    total_sales: float

    model_config = {"from_attributes": True}


class CategorySalesResponse(BaseModel):
    category_name: str
    total_sales: float

    model_config = {"from_attributes": True}