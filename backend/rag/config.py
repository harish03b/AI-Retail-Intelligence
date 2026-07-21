from __future__ import annotations

from pathlib import Path

# ==========================================================
# Project Paths
# ==========================================================

BASE_DIR = Path(__file__).resolve().parents[2]

DATA_DIR = BASE_DIR / "data"

DOCUMENTS_DIR = BASE_DIR / "backend" / "documents"

VECTOR_STORE_DIR = DATA_DIR / "vector_store"

FAISS_INDEX_NAME = "retail_index"


# ==========================================================
# LLM Configuration
# ==========================================================

OLLAMA_MODEL = "llama3.2:latest"

LLM_TEMPERATURE = 0.0

# Future-ready (currently unused but available)
LLM_TOP_P = 0.9
LLM_MAX_TOKENS = 2048

# ==========================================================
# Embedding Configuration
# ==========================================================
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# ==========================================================
# Text Splitting
# ==========================================================

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# ==========================================================
# Retrieval Configuration
# ==========================================================

TOP_K_RESULTS = 4

SEARCH_TYPE = "similarity"

# Future Options
#
# "similarity"
# "mmr"
# "similarity_score_threshold"

# ==========================================================
# Conversation Configuration
# ==========================================================

DEFAULT_SESSION_ID = "default"

MAX_CONVERSATION_MESSAGES = 10

# ==========================================================
# Assistant Messages
# ==========================================================

GREETING_MESSAGE = """
Hello! 👋

I'm your Enterprise Retail AI Assistant.

I can help you with:

• Product Information
• Inventory
• Sales Reports
• Company Policies
• Business Documents
• Retail Analytics

How can I assist you today?
""".strip()

THANK_YOU_MESSAGE = """
You're welcome! 😊

I'm happy to help.
""".strip()

FAREWELL_MESSAGE = """
Goodbye! 👋

Have a great day.
""".strip()

EMPTY_QUESTION_MESSAGE = (
    "Please enter a question."
)

NO_CONTEXT_MESSAGE = (
    "I couldn't find any relevant information in the knowledge base."
)

INTERNAL_ERROR_MESSAGE = (
    "Sorry, something went wrong while processing your request."
)

# ==========================================================
# Logging
# ==========================================================

LOG_LEVEL = "INFO"