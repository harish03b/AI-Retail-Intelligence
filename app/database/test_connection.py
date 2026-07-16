from sqlalchemy import text
from app.database.session import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT DATABASE();"))

        print("===================================")
        print("Database Connected Successfully")
        print("Current Database:", result.fetchone()[0])
        print("===================================")

except Exception as e:
    print("Database Connection Failed")
    print(e)