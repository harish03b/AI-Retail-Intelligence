# Entity Relationship Diagram Design

## Overview

The Enterprise Retail Decision Intelligence Platform uses a relational database built on MySQL.

The schema is normalized to reduce redundancy while supporting analytics, machine learning, and AI applications.

---

# Core Entities

Customers

Products

Categories

Stores

Orders

Order Items

Inventory

Suppliers

Employees

Promotions

Weather

Holidays

Documents

---

# Primary Relationships

Customer

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

Documents

↓

RAG Pipeline

Orders

↓

Machine Learning

---

# Database Characteristics

Normalization Level

Third Normal Form (3NF)

Primary Keys

Auto Increment Integer

Foreign Keys

Enabled

Indexes

Created on frequently searched columns.

---

# AI Support

The schema is designed to support:

- Forecasting
- Recommendation
- Customer Segmentation
- Business Analytics
- Retrieval-Augmented Generation
- AI Agents

---

# Future Tables

Chat History

Model Predictions

RAG Chunks

User Feedback

Audit Logs