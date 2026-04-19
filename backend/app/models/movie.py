from sqlalchemy import Column, Integer, String

from app.db.database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    tmdb_id = Column(Integer, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    poster_path = Column(String, nullable=True)
    release_date = Column(String, nullable=True)
    overview = Column(String, nullable=True)
