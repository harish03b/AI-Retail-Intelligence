import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.pipeline import run_cleaning_pipeline
from app.etl.loaders.date_loader import load_dates


def main():

    db = SessionLocal()

    try:

        df = pd.read_csv("data/processed/orders.csv")

        df = run_cleaning_pipeline(df)

        date_lookup = load_dates(df, db)

        print("\n" + "=" * 50)
        print("Date Loader Test")
        print("=" * 50)

        print(f"Lookup Size : {len(date_lookup)}")

    finally:
        db.close()


if __name__ == "__main__":
    main()