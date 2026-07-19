from sqlalchemy.orm import Session

from app.models.store import Store


class StoreRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, store: Store):
        self.db.add(store)
        self.db.commit()
        self.db.refresh(store)
        return store