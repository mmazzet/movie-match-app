from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.oauth2 import get_current_user
from app.schemas.room_schema import RoomDetailResponse, RoomRequest, RoomResponse
from app.services.room_service import (
    create_room_with_member,
    get_room_details,
    get_user_rooms,
)

router = APIRouter(tags=["rooms"])


@router.post("/rooms", status_code=status.HTTP_201_CREATED, response_model=RoomResponse)
def create_room(
    request: RoomRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    room = create_room_with_member(
        db=db,
        room_name=request.room_name,
        creator_id=current_user.id,
        friend_email=request.friend_email,
    )
    return room


@router.get("/rooms", response_model=list[RoomResponse])
def get_rooms(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    rooms = get_user_rooms(db=db, user_id=current_user.id)
    return rooms


@router.get("/rooms/{room_id}", response_model=RoomDetailResponse)
def get_room(
    room_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    room = get_room_details(db=db, room_id=room_id, current_user=current_user)
    return room
