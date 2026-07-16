from sqlalchemy.orm import sessionmaker

from app.database.session import engine


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)