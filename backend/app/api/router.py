from fastapi import APIRouter
from app.api.health_routes import router as health_router
from app.api.user_routes import router as user_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(user_router)