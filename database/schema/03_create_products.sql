USE erdip_db;

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    category_id INT,
    unit_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    supplier_name VARCHAR(150),
    sku VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);