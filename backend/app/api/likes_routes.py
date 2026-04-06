from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.core.oauth2 import get_current_user
from app.services import likes_service
from app.schemas.movie_schema import MovieResponse
from app.schemas.like_schema import LikeRequest

router = APIRouter(tags=["likes"])

@router.post("/likes")
def like_movie(request: LikeRequest, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    already_liked = likes_service.like_movie(db, current_user.id, request.tmdb_id, request.title, request.poster_path, request.release_date, request.overview)
    if already_liked:
        return {"message": "Movie already liked"}
    return {"message": "Movie liked"}

@router.delete("/likes/{tmdb_id}")
def unlike_movie(tmdb_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    likes_service.unlike_movie(db, current_user.id, tmdb_id)
    return {"message": "Movie unliked"}

@router.get("/likes")
def get_likes(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return likes_service.get_user_likes(db, current_user.id)