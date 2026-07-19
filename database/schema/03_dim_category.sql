CREATE TABLE dim_product (
    product_key INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    category_key INT NOT NULL,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_key)
        REFERENCES dim_category(category_key)
);