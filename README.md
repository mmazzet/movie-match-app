# Movie Match

Find all the movies you and your friend like.

## Key Features

- **User Authentication** - Registration and login with JWT tokens
- **Movie Discovery** - Browse trending and popular movies via TMDB
- **Collaborative Rooms** - Create rooms and invite friends to like movies together
- **Smart Matching** - Automatically displays movies liked by all members
- **Type-Safe Full Stack** - TypeScript frontend and Python backend with strict type checking

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, PostgreSQL
- **Infrastructure**: Docker, deployed online

## Project Status

Currently at 60% completion. Core features (authentication, movie display) are implemented and tested. Room creation and matching logic are implemented but not yet tested. In development: additional UI polish and other items marked in the backlog document.

## How It Works

### User Journey

1. **Register or Login** - Create an account with email and password (securely hashed with bcrypt)

2. **Discover Movies** - Browse trending  movies via TMDB API

3. **Like Movies** - Build your personal list of movies you'd like to watch

4. **Create a Room** - Invite a friend to see what movies you both like

5. **Compare Preferences** - The app shows movies that both of you liked

### Example

You like: [Dune, Interstellar, Batman]
Your Friend: [Dune, Avatar, Batman]

Matches: [Dune, Batman]

Perfect movies to watch together!


## Architecture Overview

Movie Match follows a clean, layered architecture that separates concerns and makes the code easier to test and maintain.

### System Design

Frontend (React + TypeScript)
|
HTTP API
|
Backend (FastAPI)
| | |
API - Service - Repository
|
Database (PostgreSQL)

### Backend Layers

The backend is organized into three layers:

- **API Layer** - Handles HTTP requests, validates input, manages authentication
- **Service Layer** - Contains business logic like computing matches and managing rooms
- **Repository Layer** - Handles all database queries and data persistence


### Frontend Architecture

- **Component-Based** - Reusable UI components (MovieCard, RoomMovieCard, Navbar, etc.)
- **Type-Safe** - TypeScript ensures all API responses are properly typed
- **Context-Based State** - Authentication state managed via React Context
- **Service Layer** -  API calls are organized into separate files so components don't have to handle network requests directly

### Technology Decisions

- **FastAPI** - Modern, fast, great for learning clean API design
- **PostgreSQL + SQLAlchemy** - Relational database with ORM for type safety
- **TypeScript** - Catches errors before runtime, easier to refactor
- **Docker** - Postgres runs in Docker locally, Neon (serverless Postgres) in production

For detailed architecture documentation, see [architecture.md](docs/architecture.md).

## Learning Highlights

Building Movie Match gave me hands-on experience with several important software engineering concepts:

### Clean Architecture Pattern

Implemented a 3-layer backend (API → Service → Repository) that separates concerns. This means:
- Business logic is testable without a database
- Changing the database doesn't affect business logic
- New features can be added without touching existing code

### Type Safety Across the Stack

Used TypeScript on the frontend and Python type hints on the backend to catch errors early:
- Pydantic models validate all API requests and responses
- TypeScript ensures frontend components receive data in the expected format
- Type hints throughout the codebase (functions, parameters, return types) with Pydantic validation prevents runtime errors

### Authentication & Security

Implemented secure user authentication:
- Passwords hashed with bcrypt (never stored in plaintext)
- JWT tokens for stateless authentication
- Protected API routes that verify user identity
- Environment variables for sensitive configuration

### Database Design

Designed a normalized relational database with multiple tables:
- Users, Movies, Likes, Rooms and RoomMembers tables with proper relationships
- Used Alembic migrations to version database schema changes
- Learned how to model many-to-many relationships (users and movies)

### API Design with FastAPI

Built a REST API that handles:
- Request validation with automatic error messages
- Consistent error responses across all endpoints
- Efficient queries using SQLAlchemy ORM

### Real-World Problem Solving

- Computed movie matches by finding the intersection of liked movies
- Managed multi-user rooms with membership tracking
- Integrated with external API (TMDB) for movie data
- Handled authentication across frontend and backend

## Known Limitations & Future Work

- **JWT storage**: Tokens are currently stored in localStorage for simplicity. Production apps should use httpOnly cookies to protect against XSS attacks.
- **Remaining features**: More items in [backlog.md](docs/backlog.md).