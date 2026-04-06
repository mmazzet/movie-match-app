from sqlalchemy.orm import Session
from app.models.movie import Movie
from sqlalchemy.exc import IntegrityError
from app.core.exceptions import AlreadyExistsError

def get_movie_by_tmdb_id(db: Session, tmdb_id: int) -> Movie | None:
    return db.query(Movie).filter(Movie.tmdb_id == tmdb_id).first()

def create_movie(db: Session, tmdb_id: int, title: str, poster_path: str | None, release_date: str | None, overview: str | None) -> Movie:
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
        print(f"Saved movie to database: {movie.title}")
        return movie
    except IntegrityError:
        db.rollback()
        raise AlreadyExistsError(f"Movie with tmdb_id {tmdb_id} already exists")