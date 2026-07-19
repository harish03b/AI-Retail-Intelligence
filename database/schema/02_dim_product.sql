CREATE TABLE dim_category (
    category_key INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    UNIQUE(category_name, sub_category)
);