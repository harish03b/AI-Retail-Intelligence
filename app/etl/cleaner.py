import pandas as pd


def remove_duplicates(df: pd.DataFrame):

    before = len(df)

    df = df.drop_duplicates()

    after = len(df)

    print(f"Removed {before-after} duplicate rows")

    return df


def remove_empty_rows(df: pd.DataFrame):

    before = len(df)

    df = df.dropna(how="all")

    after = len(df)

    print(f"Removed {before-after} empty rows")

    return df


def clean_column_names(df: pd.DataFrame):

    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("-", "_")
    )

    return df