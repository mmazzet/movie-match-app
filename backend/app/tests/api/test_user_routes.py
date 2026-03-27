from fastapi.testclient import TestClient
from app.main import app
from app.models.user import User
from app.api.dependencies import get_db
from app.tests.test_db_config import TestingSessionLocal

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_user_api():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()

    response = client.post(
        "/api/v1/users/",
        json={
            "email": "api@example.com",
            "password": "password123"
        }
    )

    assert response.status_code == 201
    data = response.json()

    assert data["email"] == "api@example.com"
    assert "id" in data


def test_get_user_api():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    user = User(email="test@example.com", password="hashed")
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()

    response = client.get(f"/api/v1/users/{user.id}")

    assert response.status_code == 200
    data = response.json()

    assert data["email"] == "test@example.com"
    assert data["id"] == user.id

def test_get_user_not_found():
    response = client.get("/api/v1/users/99999")

    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()