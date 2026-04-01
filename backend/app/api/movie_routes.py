from fastapi import APIRouter
from app.services.tmdb_service import get_popular_movies

router = APIRouter(tags=["movies"])

@router.get("/movies/popular")
async def popular_movies():
    data = await get_popular_movies()
    return data