from pydantic import BaseModel


class LikeRequest(BaseModel):
    tmdb_id: int
    title: str
    poster_path: str | None
    release_date: str | None
    overview: str | None
