from sqlalchemy.orm import Session
from app.repositories import user_repository
from app.core.exceptions import NotFoundError
from app.core.logger import logger


def get_user(user_id: int, db: Session):
    user = user_repository.get_user_by_id(user_id, db)
    if not user:
        logger.warning("⚠️ User not found, id: %s", user_id)
        raise NotFoundError(f"User with id: {user_id} not found")
    return user
