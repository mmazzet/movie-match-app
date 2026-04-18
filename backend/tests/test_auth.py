from app.models.user import User
from tests.test_db_config import TestingSessionLocal


def test_register_user(client):
    response = client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    print("Status code:", response.status_code)
    print("Response body:", response.json())

    assert response.status_code == 201


def test_register_duplicate_email(client):
    client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 409


def test_login_user(client):
    client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/login",
        data={"username": "marge@example.com", "password": "Password123!"},
    )

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_wrong_password(client):
    client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/login",
        data={"username": "marge@example.com", "password": "WrongPassword123!"},
    )

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 401


def test_login_nonexistent_user(client):
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "homer@example.com", "password": "Password123!"},
    )

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 401


def test_protected_endpoint_rejects_no_token(client):
    response = client.get("/api/v1/users/me")

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 401


def test_protected_endpoint_rejects_invalid_token(client):
    response = client.get(
        "/api/v1/users/me", headers={"Authorization": "Bearer invalidtoken"}
    )

    print("🎇 Status code:", response.status_code)
    print("🎇 Response body:", response.json())

    assert response.status_code == 401
