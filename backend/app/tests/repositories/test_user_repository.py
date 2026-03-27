import pytest
from app.models.user import User
from app.core import security
from app.tests.test_db_config import TestingSessionLocal
from app.repositories.user_repository import get_user_by_id, register_user
from app.schemas import schemas
from sqlalchemy.exc import IntegrityError


def test_register_user_happy_path():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    hashed_password = security.hash_password("password123")

    user_data = schemas.UserCreate(email="gimbo@example.com", password=hashed_password)
    registered_user = register_user(user_data, db)

    assert registered_user.email == "gimbo@example.com"
    assert registered_user.password == hashed_password

    db.close()



def test_get_user_by_id_happy_path():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    test_user = User(email="testuser@example.com", password="hashedpassword")
    db.add(test_user)
    db.commit()
    db.refresh(test_user)

    fetched_user = get_user_by_id(test_user.id, db)
    print(f"😎Fetched user: {fetched_user.email}, ID: {fetched_user.id}")
    assert fetched_user is not None
    assert fetched_user.id == test_user.id
    assert fetched_user.email == "testuser@example.com"

    db.close()

def test_register_user_duplicate_email():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    hashed_password = security.hash_password("password123")
    user_data = schemas.UserCreate(email="duplicate@example.com", password=hashed_password)
    register_user(user_data, db)

    try:
        register_user(user_data, db)
        assert False, "Expected IntegrityError"
    except IntegrityError:
        assert True
        print("🟢 IntegrityError is: ", IntegrityError)

    db.close()



def test_get_user_by_id_non_existent_user():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    non_existent_user = get_user_by_id(99999, db)
    print(f"😎Fetched non-existent user: {non_existent_user}" )
    assert non_existent_user is None

    db.close()