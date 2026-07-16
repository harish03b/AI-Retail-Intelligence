import pandas as pd


def validate_dataframe(df: pd.DataFrame):

    if df.empty:
        raise ValueError("Dataset is empty.")

    print("Dataset validation successful.")