from sqlalchemy.orm import Session


class WarehouseLoader:
    def __init__(self, db: Session):
        self.db = db

    def bulk_insert(self, objects):

        if not objects:
            return

        self.db.add_all(objects)

        self.db.commit()

        print(f"Inserted {len(objects)} records.")