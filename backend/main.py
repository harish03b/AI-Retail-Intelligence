from fastapi import FastAPI

app = FastAPI(
    title="Enterprise Retail Decision Intelligence Platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Enterprise Retail Decision Intelligence Platform API is running."
    }