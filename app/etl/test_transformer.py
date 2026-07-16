from pathlib import Path
import pandas as pd

from app.etl.transformer import rename_columns

DATASET_PATH = Path(
    "data/raw/global_superstore/Global_Superstore.csv"
)

df = pd.read_csv(
    DATASET_PATH,
    encoding="latin1"
)

df = rename_columns(df)

print(df.columns.tolist())