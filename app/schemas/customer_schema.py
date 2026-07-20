from pydantic import BaseModel


class CustomerResponse(BaseModel):
    customer_key: int
    customer_id: str
    customer_name: str
    segment: str

    model_config = {
        "from_attributes": True
    }