from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.handlers import register_exception_handlers

app = FastAPI(title="Movie Match API")

@app.get("/")
async def root():
    return {"message": "Hello Movie Match API"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

register_exception_handlers(app)

