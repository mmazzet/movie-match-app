from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError
from app.core.logger import logger
from app.models.movie import Movie
from app.models.watched import Watched


def get_watched(db: Session, user_id: int, movie_id: int) -> Watched | None:
    return (
        db.query(Watched)
        .filter(Watched.user_id == user_id, Watched.movie_id == movie_id)
        .first()
    )


def create_watched(db: Session, user_id: int, movie_id: int) -> Watched:
    watched = Watched(user_id=user_id, movie_id=movie_id)
    db.add(watched)
    try:
        db.commit()
        db.refresh(watched)
        logger.info("✅ User %s watched movie %s", user_id, movie_id)
        return watched
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ User %s already watched movie %s", user_id, movie_id)
        raise AlreadyExistsError("Movie already watched by user")


def delete_watched(db: Session, user_id: int, movie_id: int) -> None:
    watched = get_watched(db, user_id, movie_id)
    if watched:
        db.delete(watched)
        db.commit()
        logger.info("✅ User %s removed movie %s from watched list", user_id, movie_id)
    else:
        logger.warning(
            "⚠️ User %s tried to remove movie %s from watched list but it was not found",
            user_id,
            movie_id,
        )


def get_watched_by_user(db: Session, user_id: int) -> list[Movie]:
    return (
        db.query(Movie)
        .join(Watched, Watched.movie_id == Movie.id)
        .filter(Watched.user_id == user_id)
        .all()
    )
