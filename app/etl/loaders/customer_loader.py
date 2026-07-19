from app.models.customer import Customer


def load_customers(df, db):
    """
    Load customers into dim_customer.

    - Inserts only new customers.
    - Skips existing customers.
    - Returns:
        customer_id -> customer_key
    """

    customer_rows = (
        df[
            [
                "customer_id",
                "customer_name",
                "segment",
            ]
        ]
        .drop_duplicates()
    )

    # Fetch existing customer IDs
    existing_ids = {
        row[0]
        for row in db.query(Customer.customer_id).all()
    }

    customers_to_insert = []

    for _, row in customer_rows.iterrows():

        if row["customer_id"] in existing_ids:
            continue

        customers_to_insert.append(
            Customer(
                customer_id=row["customer_id"],
                customer_name=row["customer_name"],
                segment=row["segment"],
            )
        )

    if customers_to_insert:
        db.add_all(customers_to_insert)
        db.commit()

    print(f"Inserted {len(customers_to_insert)} new customers")

    lookup = {
        customer.customer_id: customer.customer_key
        for customer in db.query(Customer).all()
    }

    return lookup