from pathlib import Path
from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from backend.rag.config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)

from backend.rag.loader import (
    load_document,
    load_documents,
)


def get_text_splitter() -> RecursiveCharacterTextSplitter:
    """
    Create and return the configured text splitter.
    """

    return RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )


def split_documents() -> List[Document]:
    """
    Load and split all PDF documents.
    Used when creating the vector store from scratch.
    """

    documents = load_documents()

    splitter = get_text_splitter()

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    return chunks


def split_document(file_path: Path) -> List[Document]:
    """
    Load and split a single PDF document.
    Used when a new PDF is uploaded.
    """

    documents = load_document(file_path)

    splitter = get_text_splitter()

    chunks = splitter.split_documents(documents)

    print(
        f"Created {len(chunks)} chunks "
        f"from {file_path.name}."
    )

    return chunks


if __name__ == "__main__":

    chunks = split_documents()

    print(chunks[0].page_content)