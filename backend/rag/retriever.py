from __future__ import annotations

from typing import Optional

from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStore

from backend.rag.config import (
    SEARCH_TYPE,
    TOP_K_RESULTS,
)
from backend.rag.logger import get_logger
from backend.rag.vector_store import load_vector_store

logger = get_logger(__name__)

# ---------------------------------------------------------
# Cached Vector Store
# ---------------------------------------------------------

_vector_store: Optional[VectorStore] = None


def get_vector_store() -> VectorStore:
    """
    Load the vector store once and reuse it for
    subsequent requests.

    Returns
    -------
    VectorStore
        Loaded FAISS vector store.
    """

    global _vector_store

    if _vector_store is None:
        logger.info("Loading vector store...")
        _vector_store = load_vector_store()
        logger.info("Vector store loaded successfully.")

    return _vector_store


def get_retriever():
    """
    Create a retriever using the cached vector store.
    """

    vector_store = get_vector_store()

    return vector_store.as_retriever(
        search_type=SEARCH_TYPE,
        search_kwargs={
            "k": TOP_K_RESULTS,
        },
    )


def retrieve_documents(question: str) -> list[Document]:
    """
    Retrieve relevant documents for a user question.

    Parameters
    ----------
    question : str
        User question.

    Returns
    -------
    list[Document]
        Retrieved documents.
    """

    try:
        retriever = get_retriever()

        documents = retriever.invoke(question)

        logger.info(
            "Retrieved %d document(s).",
            len(documents),
        )

        return documents

    except Exception:

        logger.exception(
            "Failed to retrieve documents."
        )

        return []


if __name__ == "__main__":

    docs = retrieve_documents(
        "What is the return policy?"
    )

    print(f"\nRetrieved {len(docs)} document(s).\n")

    for index, doc in enumerate(docs, start=1):

        print("=" * 80)
        print(f"Document {index}")

        print(f"Source : {doc.metadata.get('source')}")

        print()

        print(doc.page_content)