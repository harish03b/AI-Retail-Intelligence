from pathlib import Path

DATASETS = [
    "customers",
    "products",
    "orders",
    "stores",
    "inventory",
    "suppliers",
    "documents",
]

for dataset in DATASETS:
    path = Path("data/raw") / dataset
    path.mkdir(parents=True, exist_ok=True)

print("Dataset folders verified successfully.")