from pydantic import BaseModel


class MovieResponse(BaseModel):
    tmdb_id: int
    title: str
    poster_path: str | None
    release_date: str
    overview: str


class PaginatedMoviesResponse(BaseModel):
    page: int
    total_pages: int
    movies: list[MovieResponse]
