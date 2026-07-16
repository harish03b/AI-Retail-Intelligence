import pandas as pd

from app.etl.mapper import COLUMN_MAPPING


def rename_columns(df: pd.DataFrame):

    df = df.rename(columns=COLUMN_MAPPING)

    print("\nColumns After Mapping:\n")

    print(df.columns.tolist())

    return df