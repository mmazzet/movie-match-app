from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.oauth2 import get_current_user
from app.schemas.watched_schema import WatchedRequest
from app.services import watched_service

router = APIRouter(tags=["watched"])


@router.post("/watched")
def watched_movie(
    request: WatchedRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    already_watched = watched_service.watch_movie(
        db,
        current_user.id,
        request.tmdb_id,
        request.title,
        request.poster_path,
        request.release_date,
        request.overview,
    )
    if already_watched:
        return {"message": "Movie already watched"}
    return {"message": "Movie watched"}


@router.delete("/watched/{tmdb_id}")
def unwatch_movie(
    tmdb_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    watched_service.unwatch_movie(db, current_user.id, tmdb_id)
    return {"message": "Movie unwatched"}


@router.get("/watched")
def get_watched(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return watched_service.get_user_watched(db, current_user.id)
