from sqlalchemy.orm import Session
from app.repositories import user_repository


def get_user(user_id: int, db: Session):
    user = user_repository.get_user_by_id(user_id, db)
    if not user:
        raise ValueError(f"User with id: {user_id} not found")
    return user
