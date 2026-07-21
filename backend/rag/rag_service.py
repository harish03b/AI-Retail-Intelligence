from __future__ import annotations

from langchain_ollama import ChatOllama

from backend.rag.config import (
    DEFAULT_SESSION_ID,
    EMPTY_QUESTION_MESSAGE,
    FAREWELL_MESSAGE,
    GREETING_MESSAGE,
    INTERNAL_ERROR_MESSAGE,
    LLM_TEMPERATURE,
    MAX_CONVERSATION_MESSAGES,
    NO_CONTEXT_MESSAGE,
    OLLAMA_MODEL,
    THANK_YOU_MESSAGE,
)
from backend.rag.logger import get_logger
from backend.rag.memory import ConversationMemory
from backend.rag.prompt import RAG_PROMPT
from backend.rag.response import AIResponse
from backend.rag.retriever import retrieve_documents
from backend.rag.utils import ChatUtils

logger = get_logger(__name__)


class RAGService:
    """
    Enterprise Retail AI Service.

    Responsibilities
    ----------------
    - Validate input
    - Handle greetings
    - Retrieve relevant documents
    - Build context
    - Invoke LLM
    - Maintain conversation history
    - Format responses
    """

    def __init__(self) -> None:

        self.llm = ChatOllama(
            model=OLLAMA_MODEL,
            temperature=LLM_TEMPERATURE,
        )

        self.memory = ConversationMemory(
            max_messages=MAX_CONVERSATION_MESSAGES
        )

    # =====================================================
    # Public API
    # =====================================================

    def ask(
        self,
        question: str,
        session_id: str | None = None,
    ) -> dict[str, object]:
        """
        Process a user question.

        Parameters
        ----------
        question : str
            User question.

        session_id : str | None
            Conversation session identifier.

        Returns
        -------
        dict
            Standard AI response.
        """

        session_id = session_id or DEFAULT_SESSION_ID

        question = ChatUtils.normalize(question)

        if not question:
            return AIResponse(
                answer=EMPTY_QUESTION_MESSAGE
            ).to_dict()

        quick_response = self._handle_small_talk(question)

        if quick_response is not None:
            return quick_response

        try:

            self.memory.add_user_message(
                session_id,
                question,
            )

            documents = retrieve_documents(question)

            if not documents:

                logger.warning(
                    "No relevant documents found."
                )

                return AIResponse(
                    answer=NO_CONTEXT_MESSAGE
                ).to_dict()

            context = self._build_context(documents)

            history = self.memory.get_history(
                session_id
            )

            answer = self._generate_answer(
                question=question,
                history=history,
                context=context,
            )

            self.memory.add_ai_message(
                session_id,
                answer,
            )

            return AIResponse(
                answer=answer,
                sources=ChatUtils.extract_sources(
                    documents
                ),
            ).to_dict()

        except Exception:

            logger.exception(
                "Error while processing question."
            )

            return AIResponse(
                answer=INTERNAL_ERROR_MESSAGE
            ).to_dict()

    # =====================================================
    # Private Methods
    # =====================================================

    def _generate_answer(
        self,
        *,
        question: str,
        history: str,
        context: str,
    ) -> str:
        """
        Generate an answer using the LLM.
        """

        chain = RAG_PROMPT | self.llm

        response = chain.invoke(
            {
                "history": history,
                "context": context,
                "question": question,
            }
        )

        return ChatUtils.clean_response(
            response.content
        )

    @staticmethod
    def _build_context(
        documents,
    ) -> str:
        """
        Build a single context string
        from retrieved documents.
        """

        return "\n\n".join(
            document.page_content
            for document in documents
        )

    @staticmethod
    def _handle_small_talk(
        question: str,
    ) -> dict[str, object] | None:
        """
        Handle greetings and simple
        conversational messages.
        """

        if ChatUtils.is_greeting(question):

            return AIResponse(
                answer=GREETING_MESSAGE
            ).to_dict()

        if ChatUtils.is_thanks(question):

            return AIResponse(
                answer=THANK_YOU_MESSAGE
            ).to_dict()

        if ChatUtils.is_farewell(question):

            return AIResponse(
                answer=FAREWELL_MESSAGE
            ).to_dict()

        return None


rag_service = RAGService()