import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.pipeline import run_cleaning_pipeline
from app.etl.loaders.store_loader import load_stores


def main():

    db = SessionLocal()

    try:

        df = pd.read_csv("data/processed/stores.csv")

        df = run_cleaning_pipeline(df)

        store_lookup = load_stores(df, db)

        print("\n" + "=" * 50)
        print("Store Loader Test")
        print("=" * 50)

        print(f"Lookup Size : {len(store_lookup)}")

    finally:
        db.close()


if __name__ == "__main__":
    main()