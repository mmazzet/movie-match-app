from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError, AuthenticationError
from app.core.logger import logger
from app.core.oauth2 import create_access_token
from app.core.security import hash_password, verify_password
from app.repositories import user_repository
from app.schemas import schemas


def register_user(user: schemas.UserCreate, db: Session):
    hashed_password = hash_password(user.password)
    try:
        new_user = user_repository.create_user(user.email, hashed_password, db)
        return new_user
    except ValueError:
        raise AlreadyExistsError("Registration failed")


def login_user(db: Session, email: str, password: str):
    user = user_repository.get_user_by_email(db, email)
    if not user:
        logger.warning("⚠️ Login failed, user not found")
        raise AuthenticationError("Invalid credentials")
    credentials = verify_password(password, user.password)
    if not credentials:
        logger.warning("⚠️ Login failed, wrong password")
        raise AuthenticationError("Invalid credentials")
    return create_access_token(data={"user_id": user.id})
