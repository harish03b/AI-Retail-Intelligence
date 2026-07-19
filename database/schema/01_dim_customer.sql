CREATE TABLE dim_customer (
    customer_key INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(30) NOT NULL UNIQUE,
    customer_name VARCHAR(150) NOT NULL,
    segment VARCHAR(50)
);