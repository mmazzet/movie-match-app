from fastapi import APIRouter
from app.services.tmdb_service import get_popular_movies
from app.schemas.movie_schema import MovieResponse

router = APIRouter(tags=["movies"])

@router.get("/movies/popular", response_model=list[MovieResponse])
async def popular_movies():
    data = await get_popular_movies()
    return data