import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.loaders.fact_sales_loader import load_fact_sales

orders_df = pd.read_csv(
    "data/processed/orders.csv",
    parse_dates=["order_date"],
)

order_items_df = pd.read_csv(
    "data/processed/order_items.csv",
)

db = SessionLocal()

result = load_fact_sales(
    orders_df,
    order_items_df,
    db,
)

db.close()

print(result)