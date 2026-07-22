from functools import lru_cache
from pathlib import Path

from langchain_community.vectorstores import FAISS

from backend.rag.config import (
    VECTOR_STORE_DIR,
    FAISS_INDEX_NAME,
)

from backend.rag.embeddings import get_embedding_model
from backend.rag.splitter import (
    split_document,
    split_documents,
)


def get_vector_store_path() -> Path:
    """
    Returns the FAISS save location.
    """

    VECTOR_STORE_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    return VECTOR_STORE_DIR / FAISS_INDEX_NAME


def create_vector_store() -> FAISS:
    """
    Create a brand-new FAISS vector store
    using every PDF inside backend/documents.
    """

    print("Loading documents...")

    chunks = split_documents()

    print(f"Loaded {len(chunks)} chunks.")

    embeddings = get_embedding_model()

    print("Creating FAISS index...")

    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings,
    )

    vector_store.save_local(
        str(get_vector_store_path())
    )

    print("✅ Vector Store Created")

    return vector_store


@lru_cache(maxsize=1)
def load_vector_store() -> FAISS:
    """
    Load the existing FAISS vector store.
    """

    embeddings = get_embedding_model()

    return FAISS.load_local(
        str(get_vector_store_path()),
        embeddings,
        allow_dangerous_deserialization=True,
    )


def add_document_to_vector_store(
    file_path: Path,
) -> None:
    """
    Add a newly uploaded PDF to the
    existing FAISS vector store.
    """

    print(f"Indexing {file_path.name}...")

    chunks = split_document(file_path)

    if not chunks:
        print("No chunks generated.")
        return

    vector_store = load_vector_store()

    vector_store.add_documents(
        chunks,
    )

    vector_store.save_local(
        str(get_vector_store_path())
    )

    # Clear cache so future requests
    # load the updated index.
    load_vector_store.cache_clear()

    print("✅ FAISS Updated")


if __name__ == "__main__":

    create_vector_store()