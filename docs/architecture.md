# Application Architecture

This document describes the technical architecture of the **Collaborative Movie Decision App**.

The goal is to design a **clean, modular, and beginner-friendly architecture** that still follows good software engineering practices.

---

# System Overview

The application follows a **client-server architecture**.
Frontend (React + TypeScript)
|
| HTTP REST API
|
Backend (FastAPI)
|
| ORM
|
Database (PostgreSQL)


### Responsibilities

**Frontend**

- User interface
- Display movies
- Manage rooms
- Interact with backend API

**Backend**

- Authentication
- Business logic
- Matching logic
- API integration with TMDB

**Database**

- Store users
- Store liked movies
- Store rooms
- Store matches

---

# Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios or Fetch API

## Backend

- Python
- FastAPI
- Pydantic
- Pyright (static type checking)

## Database

- PostgreSQL
- SQLAlchemy ORM
- Alembic migrations

## Infrastructure

- Docker
- Environment variables for configuration
- Cloud deployment (future)

---

# Backend Architecture

The backend follows a **layered architecture**.
API Layer
↓
Service Layer
↓
Repository Layer
↓
Database


### API Layer

Handles:

- HTTP requests
- Request validation
- Authentication
- Response formatting

Implemented using **FastAPI routers**.

Example responsibilities:

- user login
- movie search
- room creation
- retrieving matches

---

### Service Layer

Contains the **business logic** of the application.

Examples:

- computing movie matches
- managing room membership
- processing likes
- calling external APIs

This layer ensures:

- separation of concerns
- reusable logic
- easier testing

---

### Repository Layer

Responsible for **database access**.

Responsibilities:

- database queries
- ORM interaction
- returning domain objects

This layer isolates the database from business logic.

---

# Backend Folder Structure

backend/
│
├── app/
│
│ ├── main.py
│
│ ├── api/
│ │ ├── auth_routes.py
│ │ ├── movie_routes.py
│ │ ├── room_routes.py
| | |── dependencies.py  
│
│ ├── services/
│ │ ├── auth_service.py
│ │ ├── movie_service.py
│ │ ├── room_service.py
│ │ ├── match_service.py
│
│ ├── repositories/
│ │ ├── user_repository.py
│ │ ├── movie_repository.py
│ │ ├── room_repository.py
│
│ ├── models/
│ │ ├── user.py
│ │ ├── movie.py
│ │ ├── room.py
│ │ ├── like.py
│
│ ├── schemas/
│ │ ├── user_schema.py
│ │ ├── movie_schema.py
│ │ ├── room_schema.py
│
│ ├── core/
│ │ ├── config.py
│ │ ├── security.py
│
│ └── db/
│ ├── database.py
│ ├── migrations/



---

# Frontend Architecture

The frontend is built using **React with TypeScript**.

The architecture follows a **component-based design**.

### Key Principles

- reusable components
- clear separation of pages and UI components
- type-safe API communication
- simple state management

---

# Frontend Folder Structure

frontend/
│
├── src/
│
│ ├── pages/
│ │ ├── LoginPage.tsx
│ │ ├── DiscoverPage.tsx
│ │ ├── MyMoviesPage.tsx
│ │ ├── RoomsPage.tsx
│ │ ├── RoomPage.tsx
│
│ ├── components/
│ │ ├── MovieCard.tsx
│ │ ├── MovieGrid.tsx
│ │ ├── MatchList.tsx
│ │ ├── RoomCard.tsx
│ │ ├── Navbar.tsx
│
│ ├── services/
│ │ ├── api.ts
│ │ ├── movieService.ts
│ │ ├── roomService.ts
│
│ ├── types/
│ │ ├── Movie.ts
│ │ ├── Room.ts
│ │ ├── User.ts
│
│ ├── hooks/
│ │ ├── useAuth.ts
│
│ └── App.tsx


---

# Database Design

The application uses a **relational database**.

Core tables:

### Users

users

Fields:

- id
- email
- password_hash
- created_at

---

### Movies

movies

Fields:

- id
- tmdb_id
- title
- poster
- release_date

---

### Likes

likes


Fields:

- id
- user_id
- movie_id
- created_at

This table represents **user movie preferences**.

---

### Room Membership

Rooms support multiple users through a membership table.

Two tables are used:

#### rooms

Stores information about each room.

Example fields:

- id
- name
- created_by
- created_at

#### room_members

Stores which users belong to which rooms.

Example fields:

- id
- room_id
- user_id

This design allows a room to contain multiple users and supports future expansion to group rooms.
---

# Matching Logic

Matches are determined by **intersection of liked movies**.

Example:

User A likes: [Dune, Interstellar, Batman]
User B likes: [Dune, Avatar, Batman]

Match result:

[Dune, Batman]


The backend computes matches dynamically.

---

# API Design

The backend exposes a **REST API**.

### Authentication

POST /auth/register
POST /auth/login

---

### Movies

GET /movies/trending
GET /movies/popular
GET /movies/latest
GET /movies/search
POST /movies/{movie_id}/like

---

### User Movies

GET /users/me/movies

---

### Rooms

POST /rooms
GET /rooms
GET /rooms/{room_id}
POST /rooms/{room_id}/join


---

### Matches

GET /rooms/{room_id}/matches


Returns movies liked by both users.

---

# Security Architecture

Basic security practices include:

### Authentication

- JWT tokens
- protected API routes

### Password Security

- bcrypt hashing
- no plaintext password storage

### Input Validation

- Pydantic validation for all requests

Example:

class MovieResponse(BaseModel):
    id: int
    title: str
    poster_path: str | None

### Configuration Security

- environment variables for secrets
- secure API key handling
- use localStorage for JWT for now

---

# Type Safety Strategy

The application enforces type safety using:

### Frontend

- TypeScript
- typed API responses

### Backend

- Python type hints
- Pydantic models
- Pyright static type checking
- Poetry (dependency and environment management)

---

# Testing Strategy

Testing will include multiple levels.

### Unit Tests

Test individual functions:

- matching logic
- services
- utilities

Using pytest.

---

### API Tests

Test API endpoints:

- authentication
- room creation
- movie likes

---

### Error handling

Centralized error handling will be implemented using FastAPI exception handlers.

### Integration Tests

Test full workflows:

- user login
- like movies
- create room
- detect matches

---

# Infrastructure Layer

The application implements cross-cutting infrastructure concerns that support all layers.

## Logging Architecture

### Backend

- **Framework**: Python's built-in `logging` module
- **Logger Name**: "movie_match"
- **Log Level**: INFO
- **Output**: StreamHandler (console)
- **Format**: `%(asctime)s - %(levelname)s - %(message)s`
- **Usage**: Integrated throughout service and repository layers with contextual emoji prefixes
- **Future**: Ready for Sentry/New Relic integration in production

### Frontend

- **Framework**: Custom logger utility in `services/logger.ts`
- **Environment-Aware**:
  - Development: Logs info and warnings to console
  - Production: Only errors logged (always sent, prepared for Sentry/New Relic)
- **Methods**: `info()`, `warn()`, `error()`
- **Integration Points**: Page loads, user interactions, API calls

## Exception Handling Architecture

### Backend

- **Strategy**: Centralized exception handling via `register_exception_handlers()` in `main.py`
- **Custom Exceptions**:
  - `NotFoundError` → 404 Not Found
  - `AlreadyExistsError` → 409 Conflict
  - `AuthenticationError` → 401 Unauthorized
  - `ExternalServiceError` → 503 Service Unavailable
- **Validation Errors** → 422 Unprocessable Entity with field-level error details
- **Generic Exceptions** → 500 Internal Server Error
- **Response Format**: JSON with error messages and field details

### Frontend

- **Request Interceptor**: Automatically attaches JWT token from localStorage to all requests
- **Response Interceptor**: Handles 401 errors by clearing token and redirecting to `/login`
- **Error Parser** (`getErrorMessage()`): Intelligently parses three types of error responses:
  - Custom exception messages (string format)
  - Validation errors (array format with field names)
  - Generic fallback error

This layered approach ensures:

- Consistent error responses across the API
- Type-safe error handling on the frontend
- Clear logging of errors for debugging
- Graceful degradation for end users

---

# Deployment Architecture (Future)

Initial deployment will include:

Docker container
|
FastAPI backend
React frontend
PostgreSQL database


Possible hosting options:

- VPS
- cloud platform

HTTPS will be used to encrypt traffic between frontend and backend

---

# Future Architecture Improvements

Potential improvements:

- multi-user rooms
- WebSocket support for real-time updates
- caching for movie queries
- recommendation algorithm
- notification system

---

# Guiding Architectural Principles

The architecture prioritizes:

- simplicity
- modularity
- type safety
- security best practices
- ease of testing

The system should remain **easy to understand and extend** as new features are added.



# Request Flow Example

Example flow for liking a movie:

1. The frontend sends a request:
POST /movies/{movie_id}/like

2. The API layer receives the request and validates input.

3. The API calls the service layer:
movie_service.like_movie(user_id, movie_id)

4. The service layer applies business logic.

5. The repository layer writes the like to the database.

6. The API returns a response to the frontend.

Frontend → API → Service → Repository → Database