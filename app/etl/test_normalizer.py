from pathlib import Path

import pandas as pd

from app.etl.pipeline import run_cleaning_pipeline
from app.etl.transformer import rename_columns
from app.etl.normalizer import (
    generate_customers,
    generate_products,
    generate_orders,
    generate_order_items,
    generate_stores,
)

DATASET_PATH = Path(
    "data/raw/global_superstore/Global_Superstore.csv"
)

df = pd.read_csv(
    DATASET_PATH,
    encoding="latin1",
)

df = rename_columns(df)

df = run_cleaning_pipeline(df)

generate_customers(df)

generate_products(df)

generate_orders(df)

generate_order_items(df)

generate_stores(df)

print("\nNormalization Completed Successfully")