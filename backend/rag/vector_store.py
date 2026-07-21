from functools import lru_cache

from langchain_community.vectorstores import FAISS

from backend.rag.config import (
    VECTOR_STORE_DIR,
    FAISS_INDEX_NAME,
)

from backend.rag.embeddings import get_embedding_model
from backend.rag.splitter import split_documents


def create_vector_store() -> FAISS:
    """
    Create a FAISS vector store from document chunks
    and save it locally.
    """

    print("Loading and splitting documents...")

    chunks = split_documents()

    print(f"Loaded {len(chunks)} chunks.")

    print("Loading embedding model...")

    embeddings = get_embedding_model()

    print("Creating FAISS index...")

    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings,
    )

    VECTOR_STORE_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    save_path = VECTOR_STORE_DIR / FAISS_INDEX_NAME

    vector_store.save_local(
        str(save_path)
    )

    print("\n✅ Vector store saved successfully!")
    print(f"Location: {save_path}")

    return vector_store


@lru_cache(maxsize=1)
def load_vector_store() -> FAISS:
    """
    Load the existing FAISS vector store.

    This function is cached so the index is loaded
    only once during application lifetime.
    """

    print("Loading FAISS vector store...")

    embeddings = get_embedding_model()

    save_path = VECTOR_STORE_DIR / FAISS_INDEX_NAME

    return FAISS.load_local(
        str(save_path),
        embeddings,
        allow_dangerous_deserialization=True,
    )


if __name__ == "__main__":
    create_vector_store()