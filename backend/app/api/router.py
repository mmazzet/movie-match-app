from fastapi import APIRouter
from app.api.health_routes import router as health_router
from app.api.user_routes import router as user_router
from app.api.auth_routes import router as auth_router
from app.api.movie_routes import router as movie_router
from app.api.likes_routes import router as likes_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(user_router)
api_router.include_router(auth_router)
api_router.include_router(movie_router)
api_router.include_router(likes_router)