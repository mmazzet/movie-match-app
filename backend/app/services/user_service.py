from pytest import Session
from app.repositories import user_repository
from app.core import security
from app.schemas import schemas


def create_user(user: schemas.UserCreate, db: Session):
    user.password = security.hash_password(user.password)
    new_user = user_repository.register_user(user, db)
    return new_user

def get_user(user_id: int, db: Session):
    user = user_repository.get_user_by_id(user_id, db)
    if not user:
        raise ValueError(f"User with id: {user_id} not found")
    return user
