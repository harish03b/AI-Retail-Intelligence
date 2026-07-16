from pathlib import Path
import pandas as pd

DATASET_PATH = Path(
    "data/raw/global_superstore/Global_Superstore.csv"
)

df = pd.read_csv(DATASET_PATH, encoding="latin1")

print("=" * 60)
print("DATASET SHAPE")
print(df.shape)

print("\n" + "=" * 60)
print("COLUMN NAMES")
print(df.columns.tolist())

print("\n" + "=" * 60)
print("DATA TYPES")
print(df.dtypes)

print("\n" + "=" * 60)
print("MISSING VALUES")
print(df.isnull().sum())

print("\n" + "=" * 60)
print("DUPLICATES")
print(df.duplicated().sum())

print("\n" + "=" * 60)
print("FIRST 5 ROWS")
print(df.head())