from pathlib import Path

import pandas as pd
from sqlalchemy import create_engine

from app.database.session import DATABASE_URL

engine = create_engine(DATABASE_URL)

PROCESSED_PATH = Path("data/processed")


def load_csv_to_mysql(filename, table_name):

    file_path = PROCESSED_PATH / filename

    df = pd.read_csv(file_path)

    df.to_sql(
        table_name,
        engine,
        if_exists="append",
        index=False,
    )

    print(f"{filename} loaded into {table_name}")