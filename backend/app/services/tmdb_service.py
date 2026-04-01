import httpx
from dotenv import load_dotenv
import os

load_dotenv()

TMDB_BASE_URL = os.getenv("TMDB_BASE_URL")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

async def get_popular_movies():
    url = f"{TMDB_BASE_URL}/movie/popular"
    params = {"api_key": TMDB_API_KEY}
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        data = response.json()
        
        movies = []
        for movie in data["results"]:
            movie_info = {
                "tmdb_id": movie["id"],
                "title": movie["title"],
                "poster_path": movie["poster_path"],
                "release_date": movie["release_date"],
                "overview": movie["overview"],
            }
            movies.append(movie_info)
        
    print(f"Fetched {len(movies)} popular movies")

    return movies
