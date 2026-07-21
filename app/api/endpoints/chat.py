from fastapi import APIRouter, HTTPException

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)
from backend.rag.logger import get_logger
from backend.rag.rag_service import rag_service

logger = get_logger(__name__)

router = APIRouter(
    prefix="/chat",
    tags=["AI Assistant"],
)


@router.post(
    "",
    response_model=ChatResponse,
    summary="Ask the Enterprise Retail AI Assistant",
)
def chat(
    request: ChatRequest,
) -> ChatResponse:
    """
    Process a chat request.

    Each browser/user sends its own
    session_id so conversation history
    remains isolated.
    """

    try:

        result = rag_service.ask(
            question=request.question,
            session_id=request.session_id,
        )

        return ChatResponse(
            answer=result["answer"],
            sources=result.get("sources", []),
        )

    except Exception:

        logger.exception(
            "Failed to process chat request."
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to process request.",
        )