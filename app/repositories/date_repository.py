from datetime import date

from sqlalchemy.orm import Session

from app.models.date import DateDimension


class DateRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_date(self, full_date: date):
        return (
            self.db.query(DateDimension)
            .filter(DateDimension.full_date == full_date)
            .first()
        )

    def create(self, date_dimension: DateDimension):
        self.db.add(date_dimension)
        self.db.commit()
        self.db.refresh(date_dimension)
        return date_dimension