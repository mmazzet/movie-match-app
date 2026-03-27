from app.models.user import User
from app.tests.test_db_config import TestingSessionLocal
from app.services import user_service
from app.schemas import schemas


def test_create_user_happy_path():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    user_data = schemas.UserCreate(email="gimbo@example.com", password="password123")

    created_user = user_service.create_user(user_data, db)
    print(f"🟢 Created user password: {created_user.password}" )

    assert created_user.email == "gimbo@example.com"
    assert created_user.password != "password123"  

    db.close()

def test_get_user_happy_path():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    test_user = User(email="testuser@example.com", password="hashedpassword")
    db.add(test_user)
    db.commit()
    db.refresh(test_user)

    fetched_user = user_service.get_user(test_user.id, db)
    print(f"🟢 Fetched user: {fetched_user.email}, ID: {fetched_user.id}")
    assert fetched_user is not None
    assert fetched_user.id == test_user.id
    assert fetched_user.email == "testuser@example.com"

    db.close()

