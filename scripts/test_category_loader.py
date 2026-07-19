import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.pipeline import run_cleaning_pipeline
from app.etl.loaders.category_loader import load_categories


def main():

    db = SessionLocal()

    try:

        # Read the processed orders dataset
        df = pd.read_csv("data/processed/products.csv")

        # Run cleaning pipeline
        df = run_cleaning_pipeline(df)

        # Load Category Dimension
        lookup = load_categories(df, db)

        print("\n" + "=" * 50)
        print("Category Loader Test")
        print("=" * 50)

        print(f"Lookup Size : {len(lookup)}")

    finally:
        db.close()


if __name__ == "__main__":
    main()