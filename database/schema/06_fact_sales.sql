CREATE TABLE fact_sales (
    sales_key INT AUTO_INCREMENT PRIMARY KEY,

    order_id VARCHAR(30) NOT NULL,

    customer_key INT NOT NULL,
    product_key INT NOT NULL,
    store_key INT NOT NULL,
    date_key INT NOT NULL,

    sales DECIMAL(12,2),
    quantity INT,
    discount DECIMAL(5,2),
    profit DECIMAL(12,2),

    CONSTRAINT fk_sales_customer
        FOREIGN KEY (customer_key)
        REFERENCES dim_customer(customer_key),

    CONSTRAINT fk_sales_product
        FOREIGN KEY (product_key)
        REFERENCES dim_product(product_key),

    CONSTRAINT fk_sales_store
        FOREIGN KEY (store_key)
        REFERENCES dim_store(store_key),

    CONSTRAINT fk_sales_date
        FOREIGN KEY (date_key)
        REFERENCES dim_date(date_key)
);