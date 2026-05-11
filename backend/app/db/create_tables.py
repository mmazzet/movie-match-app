from app.core.logger import logger
from app.db.database import Base, engine
from app.models.like import Like
from app.models.movie import Movie
from app.models.room import Room
from app.models.room_member import RoomMember
from app.models.user import User

try:
    # This creates all tables that inherit from Base
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Tables created successfully")
except Exception as e:
    logger.error("❌ Failed to create tables: %s", e)
