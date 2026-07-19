from app.services.loader_service import load_csv_to_mysql

load_csv_to_mysql(
    "customers.csv",
    "customers",
)

load_csv_to_mysql(
    "products.csv",
    "products",
)

load_csv_to_mysql(
    "orders.csv",
    "orders",
)

load_csv_to_mysql(
    "order_items.csv",
    "order_items",
)

load_csv_to_mysql(
    "stores.csv",
    "stores"

)

print("\nAll tables loaded successfully.")