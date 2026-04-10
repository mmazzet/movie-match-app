from app.db.database import Base, engine
from app.models.user import User  # import User model, Movie and Like models as well
from app.models.movie import Movie
from app.models.like import Like
from app.core.logger import logger

try:
  # This creates all tables that inherit from Base
  Base.metadata.create_all(bind=engine)
  logger.info("✅ Tables created successfully")
except Exception as e:
  logger.error("❌ Failed to create tables: %s", e)