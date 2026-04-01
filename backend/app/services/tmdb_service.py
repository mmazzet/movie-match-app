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
        print(data)
        return data