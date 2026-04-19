from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError
from app.core.logger import logger
from app.models.movie import Movie


def get_movie_by_tmdb_id(db: Session, tmdb_id: int) -> Movie | None:
    return db.query(Movie).filter(Movie.tmdb_id == tmdb_id).first()


def create_movie(
    db: Session,
    tmdb_id: int,
    title: str,
    poster_path: str | None,
    release_date: str | None,
    overview: str | None,
) -> Movie:
    movie = Movie(
        tmdb_id=tmdb_id,
        title=title,
        poster_path=poster_path,
        release_date=release_date,
        overview=overview,
    )
    db.add(movie)
    try:
        db.commit()
        db.refresh(movie)
        logger.info("✅ Saved movie to database: %s", movie.title)
        return movie
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ Movie with tmdb_id %s already exists", tmdb_id)
        raise AlreadyExistsError(f"Movie with tmdb_id {tmdb_id} already exists")
