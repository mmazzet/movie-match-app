##############################
# auth = who are you?
# register
# login
# logout
# refresh token
##############################


from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.schemas import schemas
from app.services import auth_service


router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(user, db)


@router.post("/login", response_model=schemas.TokenResponse)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    access_token = auth_service.login_user(db, user_credentials.username, user_credentials.password) 
    # return token
    return schemas.TokenResponse(access_token=access_token, token_type="bearer")