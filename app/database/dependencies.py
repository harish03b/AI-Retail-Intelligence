from collections.abc import Generator

from sqlalchemy.orm import Session

from app.database.session_local import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Creates a new database session for each request
    and automatically closes it afterwards.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()