from app.models import (
    Customer,
    Product,
    Store,
    DateDimension,
    FactSales,
)


def load_fact_sales(
    orders_df,
    order_items_df,
    db,
):

    sales_df = orders_df.merge(
        order_items_df,
        on="order_id",
        how="inner",
    )

    customer_lookup = {
        row.customer_id: row.customer_key
        for row in db.query(Customer).all()
    }

    product_lookup = {
        row.product_id: row.product_key
        for row in db.query(Product).all()
    }

    store_lookup = {
        (
            row.country,
            row.market,
            row.region,
            row.state,
            row.city,
        ): row.store_key
        for row in db.query(Store).all()
    }

    date_lookup = {
        row.full_date: row.date_key
        for row in db.query(DateDimension).all()
    }

    existing = {
        (
            row.order_id,
            row.product_key,
        )
        for row in db.query(
            FactSales.order_id,
            FactSales.product_key,
        ).all()
    }

    rows_to_insert = []

    skipped = 0

    for _, row in sales_df.iterrows():

        customer_key = customer_lookup.get(
            row["customer_id"]
        )

        if customer_key is None:
            skipped += 1
            continue

        product_key = product_lookup.get(
            row["product_id"]
        )

        if product_key is None:
            skipped += 1
            continue

        store_key = store_lookup.get(
            (
                row["country"],
                row["market"],
                row["region"],
                row["state"],
                row["city"],
            )
        )

        if store_key is None:
            skipped += 1
            continue

        order_date = row["order_date"]

        if hasattr(order_date, "date"):
            order_date = order_date.date()

        date_key = date_lookup.get(
            order_date
        )

        if date_key is None:
            skipped += 1
            continue

        fact_key = (
            row["order_id"],
            product_key,
        )

        if fact_key in existing:
            skipped += 1
            continue

        existing.add(fact_key)

        rows_to_insert.append(
            FactSales(
                order_id=row["order_id"],
                customer_key=customer_key,
                product_key=product_key,
                store_key=store_key,
                date_key=date_key,
                sales=row["sales"],
                quantity=row["quantity"],
                discount=row["discount"],
                profit=row["profit"],
            )
        )

    if rows_to_insert:

        db.add_all(rows_to_insert)

        db.commit()

    return {
        "inserted": len(rows_to_insert),
        "skipped": skipped,
        "customer_lookup": len(customer_lookup),
        "product_lookup": len(product_lookup),
        "store_lookup": len(store_lookup),
        "date_lookup": len(date_lookup),
    }