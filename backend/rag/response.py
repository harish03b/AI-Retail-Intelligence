from dataclasses import dataclass, field
from typing import List


@dataclass(slots=True)
class AIResponse:
    """
    Standard response returned by the RAG service.

    Keeping this as a dataclass makes it easy to
    extend later with fields such as:
        - confidence
        - latency
        - retrieved_chunks
        - token_usage
    """

    answer: str
    sources: List[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        """
        Convert the response into the structure
        expected by the frontend.
        """

        return {
            "answer": self.answer.strip(),
            "sources": sorted(set(self.sources)),
        }