from app.database.session_local import SessionLocal
from app.repositories.customer_repository import CustomerRepository

db = SessionLocal()

try:

    customers = CustomerRepository.get_all_customers(db)

    print(customers)

finally:

    db.close()