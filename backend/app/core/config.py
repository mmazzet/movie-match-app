from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    FRONTEND_URL: str = "http://localhost:5173"

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    TEST_POSTGRES_DB: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    TMDB_BASE_URL: str = "https://api.themoviedb.org/3"
    TMDB_API_KEY: str

    model_config = ConfigDict(env_file=".env")


settings = Settings()
