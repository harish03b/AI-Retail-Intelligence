from langchain_text_splitters import RecursiveCharacterTextSplitter

from backend.rag.config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)

from backend.rag.loader import load_documents


def split_documents():

    documents = load_documents()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )

    chunks = splitter.split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    return chunks


if __name__ == "__main__":

    chunks = split_documents()

    print(chunks[0].page_content)