# 🛒 Enterprise Retail Decision Intelligence Platform

> AI-powered Retail Analytics Platform combining Data Engineering, Business Intelligence, and Retrieval-Augmented Generation (RAG) to support enterprise decision-making.

---

# Project Overview

The Enterprise Retail Decision Intelligence Platform is a full-stack AI application designed to help retail organizations analyze business performance and interact with enterprise knowledge using natural language.

The platform integrates structured retail analytics with an AI-powered document assistant, enabling users to explore business data through dashboards while querying company documents using Retrieval-Augmented Generation (RAG).

The project demonstrates the integration of Data Engineering, Backend Development, Frontend Development, and Generative AI within a single enterprise application.

---

# Business Problem

Retail organizations generate large volumes of transactional and operational data while maintaining important business documents such as policies, manuals, supplier information, and operational guidelines.

Common challenges include:

- Difficulty understanding sales trends
- Limited visibility into customer and product performance
- Scattered business documentation
- Manual information retrieval
- Lack of AI-assisted decision support

This platform addresses these challenges by combining analytics dashboards with an AI assistant capable of answering questions using enterprise documents.

---

# Key Features

## Business Analytics

- Executive Dashboard
- Sales Performance Analysis
- Monthly Sales Trends
- Category Performance
- Store Performance
- Top Products
- Top Customers

---

## AI Document Assistant

- Enterprise RAG Chatbot
- Natural Language Question Answering
- Source Citation
- Context-Aware Responses

---

## Document Management

- Upload PDF Documents
- View Documents
- Download Documents
- Delete Documents
- Dynamic Knowledge Base Updates
- Automatic Vector Index Refresh
- No Server Restart Required

---

## Data Engineering

- ETL Pipeline
- Data Cleaning
- Data Normalization
- Dimension Table Loading
- Fact Table Loading
- Incremental Data Processing

---

# Technology Stack

## Frontend

- React
- TypeScript
- Material UI
- Axios
- React Query

---

## Backend

- FastAPI
- Python

---

## Database

- MySQL

---

## AI / Generative AI

- LangChain
- FAISS Vector Store
- HuggingFace Embeddings
- Retrieval-Augmented Generation (RAG)

---

## Data Processing

- Pandas
- SQLAlchemy

---

## Development Tools

- Git
- GitHub
- Postman
- Swagger UI

---

# System Architecture

```text
                     Users
                       │
                       ▼
               React Dashboard
                       │
                FastAPI Backend
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   Retail Analytics             AI Assistant
        │                             │
        ▼                             ▼
 MySQL Data Warehouse         RAG Pipeline
        │                             │
        ▼                             ▼
 ETL Pipeline              Enterprise Documents
```

---

# AI Document Workflow

## Upload Document

```text
Upload PDF
      │
      ▼
Store Document
      │
      ▼
Split into Chunks
      │
      ▼
Generate Embeddings
      │
      ▼
Update FAISS Index
      │
      ▼
Refresh Retriever
      │
      ▼
Available to AI Assistant
```

---

## Delete Document

```text
Delete PDF
      │
      ▼
Remove Document
      │
      ▼
Rebuild Vector Index
      │
      ▼
Refresh Retriever
      │
      ▼
Removed from AI Knowledge Base
```

---

# Application Modules

- Dashboard
- Products
- Customers
- Analytics
- Documents
- Enterprise AI Assistant

---

# Project Structure

```text
AI-Retail-Intelligence/

backend/
│
├── app/
├── rag/
├── documents/
│
frontend/
│
├── src/
│
database/
│
├── schema/
│
data/
scripts/
tests/
docs/
README.md
requirements.txt
```

---

# Implemented Features

| Module | Status |
|----------|--------|
| Data Warehouse | ✅ |
| ETL Pipeline | ✅ |
| Dashboard APIs | ✅ |
| Dashboard UI | ✅ |
| Retail Analytics | ✅ |
| AI Assistant | ✅ |
| RAG Pipeline | ✅ |
| Document Upload | ✅ |
| Document Delete | ✅ |
| Dynamic Vector Indexing | ✅ |
| PDF Viewer | ✅ |
| PDF Download | ✅ |
| Search Documents | ✅ |
| Confirmation Dialog | ✅ |
| Snackbar Notifications | ✅ |

---

# Screenshots

Add screenshots of:


- Dashboard
- Analytics
- Documents Module
- AI Assistant
- Upload Document
- AI Response
- Document Management

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<username>/AI-Retail-Intelligence.git
```

---

## Backend

```bash
cd backend

python -m venv .venv

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file for the backend.

```text
DATABASE_URL=<your_database_connection>

LLM_API_KEY=<your_api_key>
```

> **Note:** Never commit API keys, passwords, or confidential configuration files to GitHub.

---

# Learning Outcomes

This project demonstrates practical experience in:

- Data Engineering
- SQL & Data Warehousing
- ETL Pipeline Development
- REST API Development
- React Frontend Development
- FastAPI Backend Development
- Retrieval-Augmented Generation (RAG)
- Vector Databases (FAISS)
- Embedding Models
- Enterprise Document Management
- Business Intelligence
- AI-powered Decision Support
- Git & GitHub

---

# Future Enhancements

- AI-generated Business Insights
- Hybrid Search (Keyword + Vector)
- Customer Segmentation
- Demand Forecasting
- Product Recommendation
- Cloud Deployment
- Docker Support
- CI/CD Pipeline

---

# License

This project is intended for educational and portfolio purposes.

---

# Author

**Harish Thakre**

Bachelor of Engineering (Information Technology)

Enterprise Retail Decision Intelligence Platform
