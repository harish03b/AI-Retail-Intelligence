from pathlib import Path
import pandas as pd


DATA_PATH = Path("data/raw")


def load_csv(filename: str):

    file_path = DATA_PATH / filename

    df = pd.read_csv(file_path)

    return df