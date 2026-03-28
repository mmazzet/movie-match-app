from fastapi import APIRouter, HTTPException, status, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.schemas import schemas
from app.models.user import User
from app.core.oauth2 import create_access_token
from app.services.auth_service import login_user
from app.services import auth_service


router = APIRouter(tags=["authentication"])

@router.post("/login", response_model=schemas.TokenResponse)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    access_token = auth_service.login_user(db, user_credentials.username, user_credentials.password) 
    # return token
    return schemas.TokenResponse(access_token=access_token, token_type="bearer")