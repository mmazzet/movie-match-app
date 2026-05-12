from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.core.logger import logger
from app.repositories import movie_repository, watched_repository


def watch_movie(
    db: Session,
    user_id: int,
    tmdb_id: int,
    title: str,
    poster_path: str | None,
    release_date: str | None,
    overview: str | None,
):
    # check if movie exists in local db, if not save it
    movie = movie_repository.get_movie_by_tmdb_id(db, tmdb_id)
    if not movie:
        movie = movie_repository.create_movie(
            db, tmdb_id, title, poster_path, release_date, overview
        )

    existing_watched = watched_repository.get_watched(db, user_id, movie.id)
    if existing_watched:
        return True  # already watched

    watched_repository.create_watched(db, user_id, movie.id)
    return False  # newly watched


def unwatch_movie(db: Session, user_id: int, tmdb_id: int):
    movie = movie_repository.get_movie_by_tmdb_id(db, tmdb_id)
    if not movie:
        logger.warning("⚠️ Movie with tmdb_id %s not found", tmdb_id)
        raise NotFoundError(f"Movie with tmdb_id {tmdb_id} not found")
    watched_repository.delete_watched(db, user_id, movie.id)


def get_user_watched(db: Session, user_id: int):
    return watched_repository.get_watched_by_user(db, user_id)
