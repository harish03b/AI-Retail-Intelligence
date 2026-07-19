import pandas as pd

from app.database.session_local import SessionLocal
from app.etl.pipeline import run_cleaning_pipeline
from app.etl.loaders.category_loader import load_categories
from app.etl.loaders.product_loader import load_products


def main():

    db = SessionLocal()

    try:

        df = pd.read_csv("data/processed/products.csv")

        df = run_cleaning_pipeline(df)

        category_lookup = load_categories(df, db)

        product_lookup = load_products(
            df,
            db,
            category_lookup,
        )

        print("\n" + "=" * 50)
        print("Product Loader Test")
        print("=" * 50)

        print(f"Lookup Size : {len(product_lookup)}")

    finally:
        db.close()


if __name__ == "__main__":
    main()