USE erdip_db;

ALTER TABLE products
DROP COLUMN supplier_name;

ALTER TABLE products
ADD supplier_id INT;

ALTER TABLE products
ADD CONSTRAINT fk_product_supplier
FOREIGN KEY (supplier_id)
REFERENCES suppliers(supplier_id);