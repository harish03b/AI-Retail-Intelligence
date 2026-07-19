# Customer Dimension Loader

## Objective

Load unique customers into the `dim_customer` table.

## Steps

1. Read cleaned DataFrame
2. Select customer columns
3. Remove duplicates
4. Create Customer ORM objects
5. Bulk insert using SQLAlchemy
6. Build lookup dictionary

## Output

- Populated `dim_customer`
- `customer_id → customer_key` lookup dictionary