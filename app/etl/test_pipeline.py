from pathlib import Path

import pandas as pd

from app.etl.pipeline import run_cleaning_pipeline

DATASET_PATH = Path(
    "data/raw/global_superstore/Global_Superstore.csv"
)

df = pd.read_csv(
    DATASET_PATH,
    encoding="latin1"
)

df = run_cleaning_pipeline(df)

print(df.head())

print(df.columns.tolist())