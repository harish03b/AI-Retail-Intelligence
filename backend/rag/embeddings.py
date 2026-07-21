from functools import lru_cache

from langchain_huggingface import HuggingFaceEmbeddings

from backend.rag.config import EMBEDDING_MODEL


@lru_cache(maxsize=1)
def get_embedding_model() -> HuggingFaceEmbeddings:
    """
    Load the embedding model only once.

    Returns:
        HuggingFaceEmbeddings: Cached embedding model.
    """

    return HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
    )


if __name__ == "__main__":
    model = get_embedding_model()

    vector = model.embed_query(
        "What is the return policy?"
    )

    print(f"Embedding Dimension: {len(vector)}")