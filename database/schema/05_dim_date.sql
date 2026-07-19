CREATE TABLE dim_date (
    date_key INT AUTO_INCREMENT PRIMARY KEY,
    full_date DATE NOT NULL UNIQUE,
    day INT,
    month INT,
    month_name VARCHAR(20),
    quarter INT,
    year INT
);