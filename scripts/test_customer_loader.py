from pathlib import Path

import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.pipeline import run_cleaning_pipeline
from app.etl.transformer import rename_columns
from app.etl.loaders.customer_loader import load_customers

DATASET = Path(
    "data/raw/global_superstore/Global_Superstore.csv"
)

df = pd.read_csv(
    DATASET,
    encoding="latin1",
)

df = rename_columns(df)

df = run_cleaning_pipeline(df)

db = SessionLocal()

lookup = load_customers(df, db)

print(f"\nLookup Size: {len(lookup)}")

db.close()