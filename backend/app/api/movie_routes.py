from fastapi import APIRouter, Depends
from app.services.tmdb_service import get_popular_movies
from app.schemas.movie_schema import MovieResponse
from app.core.oauth2 import get_current_user

router = APIRouter(tags=["movies"])

@router.get("/movies/popular", response_model=list[MovieResponse])
async def popular_movies(current_user = Depends(get_current_user)):
    data = await get_popular_movies()
    return data