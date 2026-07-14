# Database Design

## Overview

The Enterprise Retail Decision Intelligence Platform uses MySQL as its primary relational database.

The database stores structured retail information including customers, products, stores, inventory, suppliers, sales transactions, employees, and AI-generated reports.

The schema is designed to support:

- Data Analytics
- Machine Learning
- Business Intelligence
- Recommendation System
- RAG Metadata
- AI Agent Queries

---

# Database Objectives

The database should provide:

- High query performance
- Data integrity
- Easy integration with Machine Learning pipelines
- FastAPI compatibility
- Future cloud scalability

---

# Main Entities

The system contains the following entities:

1. Customers
2. Products
3. Categories
4. Stores
5. Inventory
6. Orders
7. Order Items
8. Suppliers
9. Employees
10. Promotions
11. AI Reports
12. Uploaded Documents

---

# Entity Descriptions

## Customers

Stores customer information.

Examples:

- Name
- Email
- Gender
- Age
- Membership
- City

Used for:

- Customer Segmentation
- Recommendation Engine
- Sales Analytics

---

## Products

Stores product information.

Examples:

- Product Name
- Brand
- Category
- Price
- Cost
- Supplier

Used for:

- Demand Forecasting
- Inventory Analysis
- Product Recommendation

---

## Categories

Groups products into categories.

Examples:

- Electronics
- Grocery
- Fashion
- Home Appliances

---

## Stores

Contains store details.

Examples:

- Store Name
- City
- State
- Region

Used for:

- Regional Analytics
- Forecasting

---

## Inventory

Tracks stock.

Examples:

- Quantity
- Reorder Level
- Warehouse
- Last Updated

Used for:

- Inventory Optimization
- AI Alerts

---

## Orders

Stores customer purchases.

Examples:

- Order Date
- Customer
- Store
- Total Amount

Used for:

- Sales Forecasting
- Revenue Analytics

---

## Order Items

Stores individual products purchased.

This enables:

- Market Basket Analysis
- Product Recommendation

---

## Suppliers

Stores supplier information.

Used for:

- Procurement Analytics
- Supply Chain Monitoring

---

## Employees

Stores employee information.

Used for:

- Role-based Dashboard
- Store Performance

---

## Promotions

Stores marketing campaigns.

Used for:

- Promotion Effectiveness Analysis
- Sales Impact

---

## Uploaded Documents

Stores metadata of company PDFs.

Examples:

- Inventory SOP
- Supplier Contract
- Product Manuals
- Return Policy

Actual PDF files will be stored separately.

The database stores only metadata.

---

## AI Reports

Stores AI-generated reports.

Examples:

- Weekly Report
- Monthly Summary
- Forecast Explanation

---

# Database Relationships

Customers

↓

Orders

↓

Order Items

↓

Products

↓

Categories

Products

↓

Inventory

↓

Stores

Products

↓

Suppliers

Uploaded Documents

↓

RAG Pipeline

Orders

↓

Machine Learning

AI Reports

↓

Dashboard

---

# Data Sources

The project will combine multiple datasets.

Retail Sales Dataset

Customer Dataset

Inventory Dataset

Store Dataset

Holiday Dataset

Weather Dataset

Business PDF Documents

---

# Future Expansion

The schema is designed to support:

- Real-time Streaming
- Multiple Warehouses
- Multiple Countries
- AI Agent Memory
- Cloud Deployment
