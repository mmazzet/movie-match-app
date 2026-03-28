
from fastapi import HTTPException, status
from http.client import HTTPException

from pytest import Session

from app.core.security import verify_password
from app.models import user
from app.repositories.user_repository import get_user_by_email
from app.core.oauth2 import create_access_token


def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    credentials = verify_password(password, user.password)
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    return create_access_token(data={"user_id": user.id})