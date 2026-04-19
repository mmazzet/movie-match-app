from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.core.logger import logger
from app.models.room import Room
from app.repositories.room_repository import add_room_member, create_room
from app.repositories.user_repository import get_user_by_email


def create_room_with_member(
    db: Session, room_name: str, creator_id: int, friend_email: str
) -> Room:

    # Step 1: Check if the friend exists by email
    friend = get_user_by_email(db=db, email=friend_email)

    if friend is None:
        logger.warning("⚠️ Friend not found: %s", friend_email)
        raise NotFoundError("User with that email does not exist")

    print("✅ Friend found:", friend.email)

    # Step 2: Create the room
    room = create_room(db=db, name=room_name, created_by=creator_id)

    print("🏠 Room created:", room.name)

    # Step 3: Add the creator as a member
    add_room_member(db=db, room_id=room.id, user_id=creator_id)

    print("👤 Creator added to room")

    # Step 4: Add the friend as a member
    add_room_member(db=db, room_id=room.id, user_id=friend.id)

    print("👤 Friend added to room")

    return room
