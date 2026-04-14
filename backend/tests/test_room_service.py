from app.services.room_service import create_room_with_member
from app.repositories.user_repository import create_user
from app.core.security import hash_password
from app.core.exceptions import NotFoundError
import pytest


def test_create_room_with_member(db):
    # Create two users — creator and friend
    creator = create_user(user_email="creator@example.com", hashed_password=hash_password("password"), db=db)
    friend = create_user(user_email="friend@example.com", hashed_password=hash_password("password"), db=db)

    # Create a room — creator invites friend by email
    room = create_room_with_member(db=db, room_name="Movie Night", creator_id=creator.id, friend_email="friend@example.com")

    assert room.name == "Movie Night"
    assert room.created_by == creator.id


def test_create_room_friend_not_found(db):
    # Create only the creator — friend does not exist
    creator = create_user(user_email="creator2@example.com", hashed_password=hash_password("password"), db=db)

    # This should raise NotFoundError because the email doesn't exist
    with pytest.raises(NotFoundError):
        create_room_with_member(db=db, room_name="Movie Night", creator_id=creator.id, friend_email="doesnotexist@example.com")