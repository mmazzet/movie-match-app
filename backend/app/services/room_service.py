from sqlalchemy.orm import Session

from app.core.exceptions import AlreadyExistsError, NotFoundError
from app.core.logger import logger
from app.models.room import Room
from app.models.user import User
from app.repositories.like_repository import get_likes_by_user
from app.repositories.room_repository import (
    add_room_member,
    create_room,
    get_room_by_id,
    get_room_by_pair,
    get_room_members,
    get_rooms_by_user,
)
from app.repositories.user_repository import get_user_by_email, get_user_by_id
from app.schemas.room_schema import RoomDetailResponse


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


def get_friend_from_room(
    members: list, current_user_id: int, db: Session
) -> User | None:
    # Find the friend in the room (the member who is not the current user)
    for member in members:
        if member.user_id != current_user_id:
            return get_user_by_id(db=db, user_id=member.user_id)
    return None


def calculate_matches(your_movies: list, friend_movies: list) -> set:
    your_tmdb_ids = set(movie.tmdb_id for movie in your_movies)
    friend_tmdb_ids = set(movie.tmdb_id for movie in friend_movies)
    match_ids = your_tmdb_ids.intersection(friend_tmdb_ids)
    return match_ids


def get_matched_movies(movies: list, match_ids: set) -> list:
    matched = []
    for movie in movies:
        if movie.tmdb_id in match_ids:
            matched.append(movie)
    return matched


def get_room_details(
    db: Session, room_id: int, current_user: User
) -> RoomDetailResponse:

    room = get_room_by_id(db=db, room_id=room_id)
    if room is None:
        raise NotFoundError("Room not found")

    members = get_room_members(db=db, room_id=room_id)

    friend = get_friend_from_room(members, current_user.id, db)
    if friend is None:
        raise NotFoundError("Friend not found in room")

    your_movies = get_likes_by_user(db=db, user_id=current_user.id)
    friend_movies = get_likes_by_user(db=db, user_id=friend.id)

    match_ids = calculate_matches(your_movies, friend_movies)

    return RoomDetailResponse(
        room_id=room.id,
        room_name=room.name,
        current_user_email=current_user.email,
        friend_email=friend.email,
        your_movies=your_movies,
        friend_movies=friend_movies,
        matches=get_matched_movies(your_movies, match_ids),
    )
