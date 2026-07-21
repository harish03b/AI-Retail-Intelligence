from __future__ import annotations

from collections import defaultdict, deque
from threading import Lock
from typing import Deque


class ConversationMemory:
    """
    Thread-safe in-memory conversation storage.

    Features
    --------
    - Separate history for each session
    - Configurable history length
    - Automatic removal of old messages
    - Thread-safe
    - Easy to replace with Redis/MySQL later
    """

    def __init__(self, max_messages: int = 10):
        self.max_messages = max_messages

        self._memory: dict[str, Deque[str]] = defaultdict(
            lambda: deque(maxlen=self.max_messages)
        )

        self._lock = Lock()

    def add_user_message(self, session_id: str, message: str) -> None:
        """Store a user message."""
        with self._lock:
            self._memory[session_id].append(f"User: {message}")

    def add_ai_message(self, session_id: str, message: str) -> None:
        """Store an assistant message."""
        with self._lock:
            self._memory[session_id].append(f"Assistant: {message}")

    def get_history(self, session_id: str) -> str:
        """
        Return formatted conversation history
        for the given session.
        """

        with self._lock:
            history = self._memory.get(session_id)

            if not history:
                return "No previous conversation."

            return "\n".join(history)

    def clear_session(self, session_id: str) -> None:
        """Remove one conversation."""

        with self._lock:
            self._memory.pop(session_id, None)

    def clear_all(self) -> None:
        """Remove all conversations."""

        with self._lock:
            self._memory.clear()

    def session_exists(self, session_id: str) -> bool:
        """Check whether a session exists."""

        with self._lock:
            return session_id in self._memory

    def message_count(self, session_id: str) -> int:
        """Return number of stored messages."""

        with self._lock:
            return len(self._memory.get(session_id, []))