from langchain_community.document_loaders import PyPDFDirectoryLoader

from backend.rag.config import DOCUMENTS_DIR


def load_documents():
    """
    Load all PDF documents from the configured directory.

    Returns:
        list: LangChain Document objects.
    """

    loader = PyPDFDirectoryLoader(
        str(DOCUMENTS_DIR)
    )

    documents = loader.load()

    print(f"Loaded {len(documents)} document pages.")

    return documents


if __name__ == "__main__":
    docs = load_documents()

    print(docs[0].page_content[:500])