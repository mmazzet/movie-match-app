from app.repositories.room_repository import (
    add_room_member,
    create_room,
    get_rooms_by_user,
)
from app.repositories.user_repository import create_user
from app.core.security import hash_password


def test_create_room(db):
    user = create_user(
        user_email="testuser@example.com",
        hashed_password=hash_password("password"),
        db=db,
    )
    room = create_room(db, name="Test Room", created_by=user.id)

    assert room.name == "Test Room"
    assert room.created_by == user.id


def test_add_room_member(db):
    user = create_user(
        user_email="member@example.com",
        hashed_password=hash_password("password"),
        db=db,
    )
    room = create_room(db, name="Member Room", created_by=user.id)

    member = add_room_member(db, room_id=room.id, user_id=user.id)

    assert member.room_id == room.id
    assert member.user_id == user.id


def test_get_rooms_by_user(db):
    user = create_user(
        user_email="roomuser@example.com",
        hashed_password=hash_password("password"),
        db=db,
    )
    room1 = create_room(db, name="Room One", created_by=user.id)
    room2 = create_room(db, name="Room Two", created_by=user.id)

    add_room_member(db, room_id=room1.id, user_id=user.id)
    add_room_member(db, room_id=room2.id, user_id=user.id)

    rooms = get_rooms_by_user(db, user_id=user.id)

    assert len(rooms) == 2
