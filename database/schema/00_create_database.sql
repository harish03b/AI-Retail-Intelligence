CREATE DATABASE IF NOT EXISTS erdip_db;

USE erdip_db;
show tables ;
SELECT * FROM dim_customer LIMIT 10;
SELECT COUNT(*) FROM dim_customer;
SELECT COUNT(DISTINCT customer_id) FROM dim_customer;
SELECT customer_id, COUNT(*)
FROM dim_customer
GROUP BY customer_id
HAVING COUNT(*) > 1;
DESCRIBE dim_store;
DESCRIBE dim_category;
SELECT
    dim_category.category,
    dim_category.sub_category
FROM dim_category;

DESCRIBE dim_product;
DESCRIBE dim_date;
describe fact_sales;


SELECT COUNT(*)
FROM fact_sales;
