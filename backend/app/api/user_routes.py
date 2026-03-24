from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.user import User
from app.schemas import schemas
from app.core import security

router = APIRouter()

@router.post("/users/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    hashed_password = security.hash_password(user.password)
    user.password = hashed_password
    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user