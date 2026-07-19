from pathlib import Path

import pandas as pd

OUTPUT_PATH = Path("data/processed")

OUTPUT_PATH.mkdir(
    parents=True,
    exist_ok=True,
)


def generate_customers(df):

    customers = (
        df[
            [
                "customer_id",
                "customer_name",
            ]
        ]
        .drop_duplicates()
    )

    customers.to_csv(
        OUTPUT_PATH / "customers.csv",
        index=False,
    )

    print("customers.csv created")

    return customers


def generate_products(df):

    products = (
        df[
            [
                "product_id",
                "product_name",
                "category",
                "sub_category",
            ]
        ]
        .drop_duplicates()
    )

    products.to_csv(
        OUTPUT_PATH / "products.csv",
        index=False,
    )

    print("products.csv created")

    return products


def generate_orders(df):

    orders = (
        df[
            [
                "order_id",
                "order_date",
                "ship_date",
                "ship_mode",
                "customer_id",
                "country",
                "state",
                "city",
                "region",
                "market",
            ]
        ]
        .drop_duplicates()
    )

    orders.to_csv(
        OUTPUT_PATH / "orders.csv",
        index=False,
    )

    print("orders.csv created")

    return orders


def generate_order_items(df):

    order_items = (
        df[
            [
                "order_id",
                "product_id",
                "sales",
                "quantity",
                "discount",
                "profit",
            ]
        ]
        .drop_duplicates()
    )

    order_items.to_csv(
        OUTPUT_PATH / "order_items.csv",
        index=False,
    )

    print("order_items.csv created")

    return order_items


def generate_stores(df):

    stores = (
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
    )

    stores.to_csv(
        OUTPUT_PATH / "stores.csv",
        index=False,
    )

    print("stores.csv created")

    return stores