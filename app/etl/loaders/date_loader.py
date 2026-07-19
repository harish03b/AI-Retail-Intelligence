import pandas as pd

from app.models.date import DateDimension


def load_dates(df, db):
    """
    Load Date Dimension.

    Returns:
        full_date -> date_key
    """

    order_dates = pd.to_datetime(df["order_date"])
    ship_dates = pd.to_datetime(df["ship_date"])

    all_dates = (
        pd.concat([order_dates, ship_dates])
        .drop_duplicates()
        .sort_values()
        .reset_index(drop=True)
    )

    existing = {
        row.full_date
        for row in db.query(DateDimension).all()
    }

    rows_to_insert = []

    for dt in all_dates:

        date_value = dt.date()

        if date_value in existing:
            continue

        existing.add(date_value)

        rows_to_insert.append(
            DateDimension(
                full_date=date_value,
                day=date_value.day,
                month=date_value.month,
                month_name=date_value.strftime("%B"),
                quarter=((date_value.month - 1) // 3) + 1,
                year=date_value.year,
            )
        )

    if rows_to_insert:
        db.add_all(rows_to_insert)
        db.commit()

    print(f"Inserted {len(rows_to_insert)} new dates")

    lookup = {
        row.full_date: row.date_key
        for row in db.query(DateDimension).all()
    }

    return lookup