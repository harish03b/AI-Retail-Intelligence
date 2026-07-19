# Bulk Warehouse Loader

## Objective

Create a reusable service for bulk loading data into the warehouse.

## Features

- Uses SQLAlchemy Session
- Supports bulk inserts with `add_all()`
- Performs a single transaction commit
- Reduces database overhead

## Benefits

- Faster ETL execution
- Better scalability
- Enterprise-ready loading process