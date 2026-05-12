from sqlalchemy import Column, ForeignKey, Integer

from app.db.database import Base


class Watched(Base):
    __tablename__ = "watched"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    movie_id = Column(
        Integer, ForeignKey("movies.id", ondelete="CASCADE"), nullable=False
    )
