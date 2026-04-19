##############################
# auth = who are you?
# register
# login
# logout
# refresh token
##############################


from fastapi import APIRouter, Depends, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.schemas import schemas
from app.services import auth_service

limiter = Limiter(key_func=get_remote_address)


router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserResponse,
)
@limiter.limit("5/minute")
def register(request: Request, user: schemas.UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(user, db)


@router.post("/login", response_model=schemas.TokenResponse)
@limiter.limit("5/minute")
def login(
    request: Request,
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    access_token = auth_service.login_user(
        db, user_credentials.username, user_credentials.password
    )
    # return token
    return schemas.TokenResponse(access_token=access_token, token_type="bearer")
