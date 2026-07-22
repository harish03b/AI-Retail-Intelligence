from pathlib import Path
from typing import List


DOCUMENTS_DIR = Path(__file__).resolve().parent.parent / "documents"


def format_file_size(size: int) -> str:
    """
    Convert bytes into a human-readable format.
    """

    units = ["B", "KB", "MB", "GB"]

    value = float(size)

    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.1f} {unit}"

        value /= 1024


def list_documents() -> List[dict]:
    """
    Returns metadata for all PDF documents
    stored in backend/documents.
    """

    documents = []

    if not DOCUMENTS_DIR.exists():
        return documents

    for pdf in sorted(DOCUMENTS_DIR.glob("*.pdf")):

        stat = pdf.stat()

        documents.append(
            {
                "filename": pdf.name,
                "size": stat.st_size,
                "size_readable": format_file_size(stat.st_size),
            }
        )

    return documents