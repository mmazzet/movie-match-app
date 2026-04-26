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
