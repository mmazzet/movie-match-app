from pydantic import BaseModel

class MovieResponse(BaseModel):
    tmdb_id: int
    title: str
    poster_path: str | None
    release_date: str
    overview: str