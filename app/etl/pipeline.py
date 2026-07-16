from app.etl.cleaner import (
    remove_duplicates,
    remove_empty_rows,
    clean_column_names,
)


def run_cleaning_pipeline(df):

    df = remove_duplicates(df)

    df = remove_empty_rows(df)

    df = clean_column_names(df)

    return df