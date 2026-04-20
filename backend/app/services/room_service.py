from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError, NotFoundError
from app.core.logger import logger
from app.models.room import Room
from app.repositories.room_repository import (
    add_room_member,
    create_room,
    get_rooms_by_user,
    get_room_by_pair,
)
from app.repositories.user_repository import get_user_by_email


def create_room_with_member(
    db: Session, room_name: str, creator_id: int, friend_email: str
) -> Room:

    # Step 1: Check if the friend exists by email
    friend = get_user_by_email(db=db, email=friend_email)

    if friend is None:
        logger.warning("⚠️ Friend not found: %s", friend_email)
        raise NotFoundError("User with that email does not exist")

    logger.info("✅ Friend found: %s", friend.email)

    existing_room = get_room_by_pair(db=db, user1_id=creator_id, user2_id=friend.id)

    if existing_room is not None:
        logger.warning("⚠️ Room already exists between %s and %s", creator_id, friend.id)
        raise AlreadyExistsError("A room with this user already exists")

    # Step 2: Create the room
    room = create_room(db=db, name=room_name, created_by=creator_id)

    logger.info("🏠 Room created: %s", room.name)

    # Step 3: Add the creator as a member
    add_room_member(db=db, room_id=room.id, user_id=creator_id)

    logger.info("👤 Creator added to room: %s", creator_id)

    # Step 4: Add the friend as a member
    add_room_member(db=db, room_id=room.id, user_id=friend.id)

    logger.info("👤 Friend added to room: %s", friend.id)

    return room


def get_user_rooms(db: Session, user_id: int) -> list[Room]:
    rooms = get_rooms_by_user(db=db, user_id=user_id)
    logger.info("✅ Found %s rooms for user %s", len(rooms), user_id)
    return rooms
