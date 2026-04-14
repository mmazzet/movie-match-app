def test_create_room(client):
    creator = client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    friend = client.post(
        "/api/v1/auth/register",
        json={"email": "homer@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/login",
        data={"username": "marge@example.com", "password": "Password123!"},
    )

    token = response.json()["access_token"]

    response = client.post(
        "/api/v1/rooms",
        headers={"Authorization": "Bearer " + token},
        json={"room_name": "Movie Night", "friend_email": "homer@example.com"},
    )

    assert response.status_code == 201


def test_create_room_friend_not_found(client):
    creator = client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/login",
        data={"username": "marge@example.com", "password": "Password123!"},
    )

    token = response.json()["access_token"]

    response = client.post(
        "/api/v1/rooms",
        headers={"Authorization": "Bearer " + token},
        json={"room_name": "Movie Night", "friend_email": "jim@email.com"},
    )

    assert response.status_code == 404


def test_create_room_no_token(client):
    response = client.post(
        "/api/v1/rooms",
        json={"room_name": "Movie Night", "friend_email": "homer@email.com"},
    )
    assert response.status_code == 401
