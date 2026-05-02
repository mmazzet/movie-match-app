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


class CastMember(BaseModel):
    # The actor's name
    name: str
    # The character they play
    character: str
    # Their profile photo path
    profile_path: str | None


class VideoResult(BaseModel):
    name: str  # YouTube key used to build the URL: https://youtube.com/watch?v=KEY
    key: str  # Type: Trailer, Clip, Behind the Scenes, etc.
    type: str  # Which site hosts it (YouTube, Vimeo, etc.)
    site: str


class MovieDetailResponse(BaseModel):
    tmdb_id: int
    title: str
    overview: str
    release_date: str | None
    runtime: int | None  # in minutes
    vote_average: float | None  # rating out of 10
    poster_path: str | None
    backdrop_path: str | None
    genres: list[str]  # just the names, e.g. ["Sci-Fi", "Adventure"]
    origin_country: list[str]  # e.g. ["US"]
    cast: list[CastMember]  # top actors
    director: str | None  # extracted from crew
    trailer: VideoResult | None  # first trailer found, if any
