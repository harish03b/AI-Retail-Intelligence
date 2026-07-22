from pathlib import Path
from typing import List

from langchain_core.documents import Document
from langchain_community.document_loaders import (
    PyPDFLoader,
    PyPDFDirectoryLoader,
)

from backend.rag.config import DOCUMENTS_DIR


def load_documents() -> List[Document]:
    """
    Load all PDF documents from the configured directory.
    """

    loader = PyPDFDirectoryLoader(
        str(DOCUMENTS_DIR)
    )

    documents = loader.load()

    print(f"Loaded {len(documents)} document pages.")

    return documents


def load_document(file_path: Path) -> List[Document]:
    """
    Load a single PDF document.

    Parameters
    ----------
    file_path : Path
        Path to the uploaded PDF.

    Returns
    -------
    list[Document]
        LangChain Document objects.
    """

    loader = PyPDFLoader(str(file_path))

    documents = loader.load()

    print(
        f"Loaded {len(documents)} page(s) from "
        f"{file_path.name}."
    )

    return documents


if __name__ == "__main__":

    docs = load_documents()

    print(docs[0].page_content[:500])