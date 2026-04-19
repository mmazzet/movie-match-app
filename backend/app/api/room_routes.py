from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.core.oauth2 import get_current_user
from app.schemas.room_schema import RoomRequest, RoomResponse
from app.services.room_service import create_room_with_member

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
