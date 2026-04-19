from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError
from app.core.logger import logger
from app.models.like import Like
from app.models.movie import Movie


def get_like(db: Session, user_id: int, movie_id: int) -> Like | None:
    return (
        db.query(Like)
        .filter(Like.user_id == user_id, Like.movie_id == movie_id)
        .first()
    )


def create_like(db: Session, user_id: int, movie_id: int) -> Like:
    like = Like(user_id=user_id, movie_id=movie_id)
    db.add(like)
    try:
        db.commit()
        db.refresh(like)
        logger.info("✅ User %s liked movie %s", user_id, movie_id)
        return like
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ User %s already liked movie %s", user_id, movie_id)
        raise AlreadyExistsError("Movie already liked by user")


def delete_like(db: Session, user_id: int, movie_id: int) -> None:
    like = get_like(db, user_id, movie_id)
    if like:
        db.delete(like)
        db.commit()
        logger.info("✅ User %s unliked movie %s", user_id, movie_id)
    else:
        logger.warning(
            "⚠️ User %s tried to unlike movie %s but it was not liked",
            user_id,
            movie_id,
        )


def get_likes_by_user(db: Session, user_id: int) -> list[Movie]:
    return (
        db.query(Movie)
        .join(Like, Like.movie_id == Movie.id)
        .filter(Like.user_id == user_id)
        .all()
    )
