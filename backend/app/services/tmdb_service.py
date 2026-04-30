import os

import httpx
from dotenv import load_dotenv

from app.core.exceptions import ExternalServiceError
from app.core.logger import logger

load_dotenv()

TMDB_BASE_URL = os.getenv("TMDB_BASE_URL")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")


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
                movie_info = {
                    "tmdb_id": movie["id"],
                    "title": movie["title"],
                    "poster_path": movie.get("poster_path"),
                    "release_date": movie.get("release_date"),
                    "overview": movie.get("overview"),
                }
                movies.append(movie_info)

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
                movie_info = {
                    "tmdb_id": movie["id"],
                    "title": movie["title"],
                    "poster_path": movie.get("poster_path"),
                    "release_date": movie.get("release_date"),
                    "overview": movie.get("overview"),
                }
                movies.append(movie_info)

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
                movie_info = {
                    "tmdb_id": movie["id"],
                    "title": movie["title"],
                    "poster_path": movie.get("poster_path"),
                    "release_date": movie.get("release_date"),
                    "overview": movie.get("overview"),
                }
                movies.append(movie_info)

        return {
            "page": data["page"],
            "total_pages": data["total_pages"],
            "movies": movies,
        }

    except httpx.RequestError:
        logger.error("❌ Could not connect to TMDB")
        raise ExternalServiceError("Could not connect to TMDB")
