from unittest.mock import AsyncMock, patch


# Helper to register and login, returns the auth token
def get_auth_token(client):
    client.post(
        "/api/v1/auth/register",
        json={"email": "marge@example.com", "password": "Password123!"},
    )
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "marge@example.com", "password": "Password123!"},
    )
    return response.json()["access_token"]


FAKE_TMDB_RESPONSE = {
    "page": 1,
    "total_pages": 1,
    "movies": [
        {
            "tmdb_id": 157336,
            "title": "Interstellar",
            "poster_path": "/poster.jpg",
            "release_date": "2014-11-05",
            "overview": "A space movie.",
        }
    ],
}


def test_search_movies_by_query(client):
    token = get_auth_token(client)
    with patch(
        "app.api.movie_routes.search_and_filter_movies",
        new=AsyncMock(return_value=FAKE_TMDB_RESPONSE),
    ):
        response = client.get(
            "/api/v1/movies/search?query=interstellar",
            headers={"Authorization": f"Bearer {token}"},
        )

    print("🔍 Status code:", response.status_code)

    assert response.status_code == 200
    assert response.json()["movies"][0]["title"] == "Interstellar"


def test_search_movies_by_genre(client):
    token = get_auth_token(client)

    with patch(
        "app.api.movie_routes.search_and_filter_movies",
        new=AsyncMock(return_value=FAKE_TMDB_RESPONSE),
    ):
        response = client.get(
            "/api/v1/movies/search?genre=28",
            headers={"Authorization": f"Bearer {token}"},
        )

    print("🎬 Status code:", response.status_code)

    assert response.status_code == 200
    assert "movies" in response.json()


def test_search_movies_no_token(client):
    # No token, should be rejected
    response = client.get("/api/v1/movies/search?query=batman")

    print("🔒 Status code:", response.status_code)

    assert response.status_code == 401


def test_search_movies_no_params(client):
    # No query, no filters, should still work (returns all movies)
    token = get_auth_token(client)

    with patch(
        "app.api.movie_routes.search_and_filter_movies",
        new=AsyncMock(return_value=FAKE_TMDB_RESPONSE),
    ):
        response = client.get(
            "/api/v1/movies/search",
            headers={"Authorization": f"Bearer {token}"},
        )

    print("📋 Status code:", response.status_code)

    assert response.status_code == 200
