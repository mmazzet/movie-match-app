from fastapi import APIRouter, Depends

from app.core.oauth2 import get_current_user
from app.schemas.movie_schema import PaginatedMoviesResponse
from app.services.tmdb_service import get_popular_movies, search_and_filter_movies

router = APIRouter(tags=["movies"])


@router.get("/movies/popular", response_model=PaginatedMoviesResponse)
async def popular_movies(page: int = 1, current_user=Depends(get_current_user)):
    data = await get_popular_movies(page=page)
    return data


@router.get("/movies/search", response_model=PaginatedMoviesResponse)
async def search_movies(
    query: str | None = None,
    genre: int | None = None,
    year_from: int | None = None,
    year_to: int | None = None,
    country: str | None = None,
    language: str | None = None,
    min_rating: float | None = None,
    sort_by: str = "popularity.desc",
    page: int = 1,
    current_user=Depends(get_current_user),
):
    data = await search_and_filter_movies(
        query=query,
        genre=genre,
        year_from=year_from,
        year_to=year_to,
        country=country,
        language=language,
        min_rating=min_rating,
        sort_by=sort_by,
        page=page,
    )
    return data
