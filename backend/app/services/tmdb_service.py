import os

import httpx
from dotenv import load_dotenv

from app.core.exceptions import ExternalServiceError
from app.core.logger import logger
from app.schemas.movie_schema import CastMember, MovieDetailResponse, VideoResult

load_dotenv()

TMDB_BASE_URL = os.getenv("TMDB_BASE_URL")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")


def parse_movie(movie: dict) -> dict:
    return {
        "tmdb_id": movie["id"],
        "title": movie["title"],
        "poster_path": movie.get("poster_path"),
        "release_date": movie.get("release_date"),
        "overview": movie.get("overview"),
    }


async def fetch_from_tmdb(url: str, params: dict) -> dict:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

            if response.status_code != 200:
                logger.error(
                    "❌ TMDB API error: %s - %s", response.status_code, response.text
                )
                raise ExternalServiceError("Failed to fetch data from TMDB")

            return response.json()

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB")
        raise ExternalServiceError("Could not connect to TMDB")


async def get_popular_movies(page: int = 1) -> list[dict]:
    url = f"{TMDB_BASE_URL}/movie/popular"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-IE",
        "region": "IE",
        "page": page,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

            if response.status_code != 200:
                logger.error(
                    "❌ TMDB API error: %s - %s", response.status_code, response.text
                )
                raise ExternalServiceError("Failed to fetch movies from TMDB")

            data = response.json()

            movies = []
            for movie in data["results"]:
                parsed = parse_movie(movie)
                movies.append(parsed)

        logger.info("✅ Fetched %s popular movies from TMDB", len(movies))

        return {
            "page": data["page"],
            "total_pages": data["total_pages"],
            "movies": movies,
        }

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB")
        raise ExternalServiceError("Could not connect to TMDB")


async def search_movies(query: str, page: int = 1) -> dict:
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-IE",
        "query": query,
        "page": page,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

            if response.status_code != 200:
                logger.error(
                    "❌ TMDB search error: %s - %s", response.status_code, response.text
                )
                raise ExternalServiceError("Failed to search movies from TMDB")

            data = response.json()

            movies = []
            for movie in data["results"]:
                parsed = parse_movie(movie)
                movies.append(parsed)

        logger.info("✅ Search '%s' returned %s movies", query, len(movies))

        return {
            "page": data["page"],
            "total_pages": data["total_pages"],
            "movies": movies,
        }

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB for search")
        raise ExternalServiceError("Could not connect to TMDB")


async def search_and_filter_movies(
    query: str | None = None,
    genre: int | None = None,
    year_from: int | None = None,
    year_to: int | None = None,
    country: str | None = None,
    language: str | None = None,
    min_rating: float | None = None,
    sort_by: str = "popularity.desc",
    page: int = 1,
) -> dict:

    if query:
        url = f"{TMDB_BASE_URL}/search/movie"
    else:
        url = f"{TMDB_BASE_URL}/discover/movie"

    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-IE",
        "page": page,
        "sort_by": sort_by,
    }

    if query:
        params["query"] = query
    if genre:
        params["with_genres"] = genre
    if year_from:
        params["primary_release_date.gte"] = f"{year_from}-01-01"
    if year_to:
        params["primary_release_date.lte"] = f"{year_to}-12-31"
    if country:
        params["with_origin_country"] = country
    if language:
        params["with_original_language"] = language
    if min_rating:
        params["vote_average.gte"] = min_rating

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

            if response.status_code != 200:
                logger.error(
                    "❌ TMDB error: %s - %s", response.status_code, response.text
                )
                raise ExternalServiceError("Failed to fetch movies from TMDB")

            data = response.json()

            movies = []
            for movie in data["results"]:
                parsed = parse_movie(movie)
                movies.append(parsed)

        return {
            "page": data["page"],
            "total_pages": data["total_pages"],
            "movies": movies,
        }

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB")
        raise ExternalServiceError("Could not connect to TMDB")


async def get_movie_details(tmdb_id: int) -> MovieDetailResponse:
    url = f"{TMDB_BASE_URL}/movie/{tmdb_id}"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US",
        "append_to_response": "credits,videos",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

            if response.status_code != 200:
                logger.error(
                    "❌ TMDB movie detail error: %s - %s",
                    response.status_code,
                    response.text,
                )
                raise ExternalServiceError("Failed to fetch movie details from TMDB")

            data = response.json()

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB for movie details")
        raise ExternalServiceError("Could not connect to TMDB")

    # Extract genre names from objects: [{"id": 28, "name": "Action"}] → ["Action"]
    genres = [g["name"] for g in data.get("genres", [])]

    # Extract top 10 cast members from credits.cast
    raw_cast = data.get("credits", {}).get("cast", [])
    cast = [
        CastMember(
            name=member["name"],
            character=member["character"],
            profile_path=member.get("profile_path"),
        )
        for member in raw_cast[:10]
    ]

    # Find the director from credits.crew
    raw_crew = data.get("credits", {}).get("crew", [])
    director = None
    for member in raw_crew:
        if member.get("job") == "Director":
            director = member["name"]
            break

    # Find the first YouTube trailer from videos.results
    raw_videos = data.get("videos", {}).get("results", [])
    trailer = None
    for video in raw_videos:
        if video.get("type") == "Trailer" and video.get("site") == "YouTube":
            trailer = VideoResult(
                name=video["name"],
                key=video["key"],
                type=video["type"],
                site=video["site"],
            )
            break

    return MovieDetailResponse(
        tmdb_id=data["id"],
        title=data["title"],
        overview=data.get("overview", ""),
        release_date=data.get("release_date"),
        runtime=data.get("runtime"),
        vote_average=data.get("vote_average"),
        poster_path=data.get("poster_path"),
        backdrop_path=data.get("backdrop_path"),
        genres=genres,
        origin_country=data.get("origin_country", []),
        cast=cast,
        director=director,
        trailer=trailer,
    )
