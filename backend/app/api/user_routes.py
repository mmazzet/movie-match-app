from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.schemas import schemas
from app.services import user_service
from app.core.oauth2 import get_current_user
from app.models.user import User
from app.core import oauth2

router = APIRouter(tags=["users"])

@router.get("/users/me", response_model=schemas.UserResponse)
def get_me(current_user: User = Depends(oauth2.get_current_user)):
    return current_user
    

@router.get("/users/{user_id}", status_code=status.HTTP_200_OK, response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    try:
        return user_service.get_user(user_id, db)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.post("/users/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        return user_service.create_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))