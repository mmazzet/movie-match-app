def register_and_login(client):
    client.post(
        "/api/v1/auth/register",
        json={"email": "alice@example.com", "password": "Password123!"},
    )

    response = client.post(
        "/api/v1/auth/login",
        data={"username": "alice@example.com", "password": "Password123!"},
    )

    token = response.json()["access_token"]
    return token


def test_like_a_movie(client):
    token = register_and_login(client)

    response = client.post(
        "/api/v1/likes",
        json={
            "tmdb_id": 693134,
            "title": "Dune Part Two",
            "poster_path": "/poster.jpg",
            "release_date": "2024-02-28",
            "overview": "The continuation of Dune.",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    print("Status code:", response.status_code)
    print("Response body:", response.json())

    assert response.status_code == 200


def test_like_same_movie_twice(client):
    token = register_and_login(client)

    movie = {
        "tmdb_id": 693134,
        "title": "Dune Part Two",
        "poster_path": "/poster.jpg",
        "release_date": "2024-02-28",
        "overview": "The continuation of Dune.",
    }

    # Like once
    client.post(
        "/api/v1/likes", json=movie, headers={"Authorization": f"Bearer {token}"}
    )

    # Like again
    response = client.post(
        "/api/v1/likes", json=movie, headers={"Authorization": f"Bearer {token}"}
    )

    print("Status code:", response.status_code)
    print("Response body:", response.json())

    assert response.status_code == 200
    assert response.json()["message"] == "Movie already liked"


def test_get_likes(client):
    token = register_and_login(client)

    client.post(
        "/api/v1/likes",
        json={
            "tmdb_id": 693134,
            "title": "Dune Part Two",
            "poster_path": "/poster.jpg",
            "release_date": "2024-02-28",
            "overview": "The continuation of Dune.",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    response = client.get("/api/v1/likes", headers={"Authorization": f"Bearer {token}"})

    print("Status code:", response.status_code)
    print("Response body:", response.json())

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "Dune Part Two"


def test_unlike_a_movie(client):
    token = register_and_login(client)

    # Like a movie first
    client.post(
        "/api/v1/likes",
        json={
            "tmdb_id": 693134,
            "title": "Dune Part Two",
            "poster_path": "/poster.jpg",
            "release_date": "2024-02-28",
            "overview": "The continuation of Dune.",
        },
        headers={"Authorization": f"Bearer {token}"},
    )

    # Unlike it
    response = client.delete(
        "/api/v1/likes/693134", headers={"Authorization": f"Bearer {token}"}
    )

    print("Status code:", response.status_code)
    print("Response body:", response.json())

    assert response.status_code == 200
    assert response.json()["message"] == "Movie unliked"
