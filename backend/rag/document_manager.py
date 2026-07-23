from pathlib import Path
from typing import List

from fastapi import HTTPException, UploadFile

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

    return f"{size} B"


def list_documents() -> List[dict]:
    """
    Returns metadata for all PDF documents.
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


async def upload_document(file: UploadFile) -> Path:
    """
    Save uploaded PDF into backend/documents.

    Returns
    -------
    Path
        Saved PDF path.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    DOCUMENTS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    file_path = DOCUMENTS_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return file_path


def delete_document(filename: str) -> Path:
    """
    Delete a PDF document.

    Returns
    -------
    Path
        Deleted file path.
    """

    # Prevent path traversal attacks
    filename = Path(filename).name

    file_path = DOCUMENTS_DIR / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    file_path.unlink()

    return file_path