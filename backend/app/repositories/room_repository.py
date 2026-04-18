from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from app.models.room import Room
from app.models.room_member import RoomMember
from app.core.logger import logger
from app.core.exceptions import AlreadyExistsError, NotFoundError


def create_room(db: Session, name: str, created_by: int) -> Room:
    try:
        new_room = Room(name=name, created_by=created_by)
        db.add(new_room)
        db.commit()
        db.refresh(new_room)
        logger.info(f"🏠 Room created: {new_room.name} | ID: {new_room.id}")
        return new_room
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ Failed to create room: %s", name)
        raise AlreadyExistsError("Room already exists")


def add_room_member(db: Session, room_id: int, user_id: int) -> RoomMember:
    try:
        new_member = RoomMember(room_id=room_id, user_id=user_id)
        db.add(new_member)
        db.commit()
        db.refresh(new_member)
        logger.info(
            f"🏠 New Member Added {new_member.user_id} to room: {new_member.room_id}"
        )
        return new_member
    except IntegrityError:
        db.rollback()
        logger.warning("⚠️ Failed to add member %s to room %s", user_id, room_id)
        raise AlreadyExistsError("Member already exists")


def get_rooms_by_user(db: Session, user_id: int) -> list[Room]:
    try:
        rooms = (
            db.query(Room)
            .join(RoomMember, RoomMember.room_id == Room.id)
            .filter(RoomMember.user_id == user_id)
            .all()
        )
        logger.info("✅ Rooms retrieved for user %s", user_id)
        return rooms
    except SQLAlchemyError:
        logger.error("❌ Failed to get rooms for user %s", user_id)
        raise NotFoundError("Failed to retrieve rooms for user")
