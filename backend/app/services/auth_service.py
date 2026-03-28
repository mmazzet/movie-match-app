
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.core.security import verify_password, hash_password
from app.models import user
from app.repositories import user_repository
from app.core.oauth2 import create_access_token
from app.schemas import schemas

def register_user(user: schemas.UserCreate, db: Session):
    hashed_password = hash_password(user.password)
    try:
        new_user = user_repository.create_user(user.email, hashed_password, db)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
def login_user(db: Session, email: str, password: str):
    user = user_repository.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    credentials = verify_password(password, user.password)
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    return create_access_token(data={"user_id": user.id})