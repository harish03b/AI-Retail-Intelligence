from app.models.category import Category


def load_categories(df, db):
    """
    Load categories into dim_category.

    Returns:
        (category, sub_category) -> category_key
    """

    category_rows = (
        df[
            [
                "category",
                "sub_category",
            ]
        ]
        .drop_duplicates()
    )

    existing = {
        (row.category_name, row.sub_category)
        for row in db.query(Category).all()
    }

    rows_to_insert = []

    for _, row in category_rows.iterrows():

        key = (
            row["category"],
            row["sub_category"],
        )

        if key in existing:
            continue

        rows_to_insert.append(
            Category(
                category_name=row["category"],
                sub_category=row["sub_category"],
            )
        )

    if rows_to_insert:
        db.add_all(rows_to_insert)
        db.commit()

    print(f"Inserted {len(rows_to_insert)} new categories")

    lookup = {
        (row.category_name, row.sub_category): row.category_key
        for row in db.query(Category).all()
    }

    return lookup