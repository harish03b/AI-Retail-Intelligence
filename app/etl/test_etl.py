from app.etl.loader import load_csv
from app.etl.profiler import profile_dataframe
from app.etl.validator import validate_dataframe


df = load_csv("customers.csv")

validate_dataframe(df)

profile_dataframe(df)