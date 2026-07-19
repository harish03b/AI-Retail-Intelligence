from app.models.product import Product


def load_products(df, db, category_lookup):
    """
    Load products into dim_product.

    Returns:
        product_id -> product_key
    """

    product_rows = (
    df[
        [
            "product_id",
            "product_name",
            "category",
            "sub_category",
        ]
    ]
    .drop_duplicates(subset=["product_id"], keep="first")
)

    existing = {
        row.product_id
        for row in db.query(Product).all()
    }

    rows_to_insert = []

    for _, row in product_rows.iterrows():

        category_key = category_lookup.get(
            (
                row["category"],
                row["sub_category"],
            )
        )

        if category_key is None:
            continue

        if row["product_id"] in existing:
          continue

        existing.add(row["product_id"])

        rows_to_insert.append(
            Product(
                product_id=row["product_id"],
                product_name=row["product_name"],
                category_key=category_key,
            )
        )

    if rows_to_insert:
        db.add_all(rows_to_insert)
        db.commit()

    print(f"Inserted {len(rows_to_insert)} new products")

    lookup = {
        row.product_id: row.product_key
        for row in db.query(Product).all()
    }

    return lookup