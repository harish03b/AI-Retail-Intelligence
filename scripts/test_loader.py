from app.database.session_local import SessionLocal
from app.services.warehouse_loader import WarehouseLoader

db = SessionLocal()

loader = WarehouseLoader(db)

print("Warehouse Loader Initialized Successfully")

db.close()