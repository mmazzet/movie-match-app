## API Design

This document defines the **REST API endpoints** for the Collaborative Movie Decision App.

The API allows the frontend to:

- Authenticate users
- Discover movies
- Like movies
- Manage rooms
- View matches with friends

All endpoints return **JSON responses**.


POST /auth/register
POST /auth/login

GET /movies/popular
GET /movies/trending
GET /movies/search
GET /movies/{movie_id}

GET /users/me

POST /likes
GET /likes
DELETE /likes/{movie_id}

POST /rooms
GET /rooms
GET /rooms/{room_id}
POST /rooms/{id}/join
POST /rooms/{room_id}/invite
GET /rooms/{room_id}/matches
DELETE /rooms/{room_id}/leave

---

## Base URL

```
/api/v1
```

Example request:

```
GET /api/v1/movies/popular
```

---

## Authentication

The API uses **JWT (JSON Web Token)** authentication.

### Authentication Workflow

1. User logs in
2. Server validates credentials
3. Server returns a JWT token
4. Client stores the token
5. Client includes the token in future requests

Example header:

```
Authorization: Bearer <jwt_token>
```

Protected endpoints require authentication.

---

# Authentication Endpoints

## Register User

Creates a new account.

### Endpoint

```
POST /auth/register
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "id": 1,
  "email": "user@example.com"
}
```

---

## Login

Authenticates a user and returns a JWT token.

### Endpoint

```
POST /auth/login
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "access_token": "jwt_token",
  "token_type": "bearer"
}
```

---

# Movie Endpoints

These endpoints retrieve movie data from the **TMDB API**.

## Get Popular Movies

### Endpoint

```
GET /movies/popular
```

### Response

```json
[
  {
    "id": 123,
    "title": "Dune",
    "poster_path": "/poster.jpg",
    "release_date": "2021-10-22"
  }
]
```

---

## Get Trending Movies

### Endpoint

```
GET /movies/trending
```

Returns a list of trending movies.

---

## Search Movies

### Endpoint

```
GET /movies/search
```

### Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| query | string | Movie title to search |

Example request:

```
GET /movies/search?query=interstellar
```

---

# Likes Endpoints

These endpoints manage the movies liked by a user.

## Like a Movie

### Endpoint

```
POST /likes
```

### Request Body

```json
{
  "movie_id": 123
}
```

Adds a movie to the user's liked list.

---

## Get User Likes

### Endpoint

```
GET /likes
```

Returns the list of movies liked by the current user.

### Example Response

```json
[
  {
    "movie_id": 123,
    "title": "Dune"
  }
]
```

---

## Remove Like

### Endpoint

```
DELETE /likes/{movie_id}
```

Example:

```
DELETE /likes/123
```

Removes the movie from the user's liked list.

---

# Room Endpoints

Rooms allow users to compare their liked movies with friends.

## Create Room

### Endpoint

```
POST /rooms
```

### Request Body

```json
{
  "name": "Friday Movie Night"
}
```

### Response

```json
{
  "id": 1,
  "name": "Friday Movie Night"
}
```

---

## Get User Rooms

### Endpoint

```
GET /rooms
```

Returns all rooms the user belongs to.

### Example Response

```json
[
  {
    "id": 1,
    "name": "Friday Movie Night"
  },
  {
    "id": 2,
    "name": "Sci-Fi Watchlist"
  }
]
```

---

## Join Room

Allows another user to join a room.

### Endpoint

```
POST /rooms/{room_id}/join
```

### Request Body

```json
{
  "user_id": 5
}
```

---

## Get Room Details

### Endpoint

```
GET /rooms/{room_id}
```

Returns:

- Your liked movies
- Friend liked movies
- Matching movies

### Example Response

```json
{
  "room_id": 1,
  "your_movies": [],
  "friend_movies": [],
  "matches": []
}
```

## Response Format

Most endpoints return data using a standard structure.

Example:

{
  "data": [...]
}

This allows the API to include additional metadata in the future
such as pagination information.

---

# Error Responses

### Example Error

```json
{
  "error": {
    "message": "Invalid credentials"
  }
}
```

---

### Pagination

Add pagination to:
GET /movies/popular
GET /movies/trending
GET /movies/search

Example:

GET /movies/popular?page=1

Query parameters:

page (integer) – page number

---

### Common Status Codes

| Code | Meaning |
|-----|--------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# API Design Principles

The API follows these principles:

- **RESTful design**
- **JSON request and responses**
- **Stateless authentication using JWT**
- **Simple and predictable endpoints**

The goal is to keep the API **clean, consistent, and easy to use** for the frontend application.

