from sqlalchemy.orm import Session
from app.models.like import Like
from app.models.movie import Movie
from sqlalchemy.exc import IntegrityError
from app.core.exceptions import AlreadyExistsError

def get_like(db: Session, user_id: int, movie_id: int) -> Like | None:
    return db.query(Like).filter(Like.user_id == user_id, Like.movie_id == movie_id).first()

def create_like(db: Session, user_id: int, movie_id: int) -> Like:
    like = Like(user_id=user_id, movie_id=movie_id)
    db.add(like)
    try:
        db.commit()
        db.refresh(like)
        print(f"User {user_id} liked movie {movie_id}")
        return like
    except IntegrityError:
        db.rollback()
        raise AlreadyExistsError("Movie aleady liked by user")
def delete_like(db: Session, user_id: int, movie_id: int) -> None:
    like = get_like(db, user_id, movie_id)
    if like:
        db.delete(like)
        db.commit()
        print(f"User {user_id} unliked movie {movie_id}")

def get_likes_by_user(db: Session, user_id: int) -> list[Movie]:
    return db.query(Movie).join(Like, Like.movie_id == Movie.id).filter(Like.user_id == user_id).all()