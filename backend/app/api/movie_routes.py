from fastapi import APIRouter, Depends

from app.core.oauth2 import get_current_user
from app.schemas.movie_schema import PaginatedMoviesResponse
from app.services.tmdb_service import get_popular_movies

router = APIRouter(tags=["movies"])


@router.get("/movies/popular", response_model=PaginatedMoviesResponse)
async def popular_movies(page: int = 1, current_user=Depends(get_current_user)):
    data = await get_popular_movies(page=page)
    return data
