import pandas as pd


def profile_dataframe(df: pd.DataFrame):

    print("=" * 50)

    print("Shape")

    print(df.shape)

    print("=" * 50)

    print("Columns")

    print(df.columns.tolist())

    print("=" * 50)

    print("Missing Values")

    print(df.isnull().sum())

    print("=" * 50)

    print("Duplicate Rows")

    print(df.duplicated().sum())

    print("=" * 50)

    print(df.info())