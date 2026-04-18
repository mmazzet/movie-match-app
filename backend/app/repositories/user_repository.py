from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.core.exceptions import AlreadyExistsError
from app.core.logger import logger


def create_user(user_email: str, hashed_password: str, db: Session):
    new_user = User(email=user_email, password=hashed_password)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
        logger.info("✅ New user created: %s", user_email)
        return new_user
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ Registration failed for email: %s", user_email)
        raise AlreadyExistsError("Registration failed")


# get_user_by_id: Fetch a user by their ID.
def get_user_by_id(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    return user


def get_user_by_email(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    return user
