from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """
    Incoming chat request.
    """

    question: str = Field(
        ...,
        min_length=1,
        description="User question",
    )

    session_id: str = Field(
        ...,
        description="Unique browser session identifier",
    )


class ChatResponse(BaseModel):
    """
    Standard AI response.
    """

    answer: str

    sources: list[str] = Field(
        default_factory=list,
    )