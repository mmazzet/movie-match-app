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

def test_create_user():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()

    response = client.post(
        "/api/v1/users/",
        json={
            "email": "test@example.com",
            "password": "password123"
        }
    )

    assert response.status_code == 201

    data = response.json()
    assert data["email"] == "test@example.com"

    db = TestingSessionLocal()
    user = db.query(User).filter(User.email == "test@example.com").first()
    assert user.password != "password123"
    db.close()


def test_get_user():
    db = TestingSessionLocal()
    db.query(User).delete()
    db.commit()

    # Create a test user
    test_user = User(email="getuser@example.com", password="hashedpassword")
    db.add(test_user)
    db.commit()
    db.refresh(test_user)
    db.close()

    # Call the endpoint
    response = client.get(f"/api/v1/users/{test_user.id}")
    print("🟢 Response JSON for existing user:", response.json())

    assert response.status_code == 200
    data = response.json()
    print("🔵 Data extracted:", data)
    assert data["id"] == test_user.id
    assert data["email"] == "getuser@example.com"
    assert "password" not in data  # password should not be in response

    # Test 404 case
    response_404 = client.get("/api/v1/users/99999")
    print("⚠️ Response JSON for non-existing user:", response_404.json())
    assert response_404.status_code == 404
    assert "not found" in response_404.json()["detail"].lower()