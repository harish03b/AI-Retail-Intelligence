from app.models.store import Store


def load_stores(df, db):
    """
    Load Store Dimension.

    Returns:
        (country, state, city, region, market) -> store_key
    """

    # Keep only required columns and unique stores
    store_rows = (
        df[
            [
                "country",
                "state",
                "city",
                "region",
                "market",
            ]
        ]
        .drop_duplicates()
        .reset_index(drop=True)
    )

    # Existing stores in database
    existing = {
        (
            row.country,
            row.state,
            row.city,
            row.region,
            row.market,
        )
        for row in db.query(Store).all()
    }

    rows_to_insert = []

    for _, row in store_rows.iterrows():

        key = (
            row["country"],
            row["state"],
            row["city"],
            row["region"],
            row["market"],
        )

        # Skip if already exists
        if key in existing:
            continue

        existing.add(key)

        rows_to_insert.append(
            Store(
                country=row["country"],
                state=row["state"],
                city=row["city"],
                region=row["region"],
                market=row["market"],
            )
        )

    # Insert new stores
    if rows_to_insert:
        db.add_all(rows_to_insert)
        db.commit()

    print(f"Inserted {len(rows_to_insert)} new stores")

    # Build lookup dictionary
    lookup = {
        (
            row.country,
            row.state,
            row.city,
            row.region,
            row.market,
        ): row.store_key
        for row in db.query(Store).all()
    }

    return lookup