from __future__ import annotations

from pathlib import Path
from typing import Iterable


class ChatUtils:
    """
    Utility functions used throughout the RAG module.

    Responsibilities
    ----------------
    - Normalize user input
    - Detect greetings
    - Detect thank-you messages
    - Detect farewell messages
    - Extract unique source names
    - Clean LLM responses
    """

    GREETINGS = frozenset(
        {
            "hi",
            "hello",
            "hey",
            "hii",
            "helo",
            "good morning",
            "good afternoon",
            "good evening",
        }
    )

    THANKS = frozenset(
        {
            "thanks",
            "thank you",
            "thankyou",
            "thanks a lot",
            "thank you so much",
        }
    )

    FAREWELLS = frozenset(
        {
            "bye",
            "goodbye",
            "see you",
            "see you later",
            "take care",
        }
    )

    @staticmethod
    def normalize(text: str) -> str:
        """
        Normalize user input.
        """

        return " ".join(text.strip().lower().split())

    @classmethod
    def is_greeting(cls, text: str) -> bool:
        return cls.normalize(text) in cls.GREETINGS

    @classmethod
    def is_thanks(cls, text: str) -> bool:
        return cls.normalize(text) in cls.THANKS

    @classmethod
    def is_farewell(cls, text: str) -> bool:
        return cls.normalize(text) in cls.FAREWELLS

    @staticmethod
    def clean_response(text: str) -> str:
        """
        Remove unnecessary whitespace
        from LLM responses.
        """

        return "\n".join(
            line.rstrip()
            for line in text.strip().splitlines()
            if line.strip()
        )

    @staticmethod
    def extract_sources(documents: Iterable) -> list[str]:
        """
        Extract unique filenames
        from retrieved LangChain documents.
        """

        sources = set()

        for document in documents:

            source = document.metadata.get("source")

            if source:
                sources.add(Path(source).name)

        return sorted(sources)