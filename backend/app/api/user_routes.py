from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.user import User
from app.schemas import schemas
from app.services import user_service

router = APIRouter(tags=["users"])

""" @router.get("/users/me")
def get_current_user(db: Session = Depends(get_db)):
    print("This is the get_current_user endpoint") """
    

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