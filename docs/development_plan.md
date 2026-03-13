# Development Plan — Collaborative Movie Decision App

This document outlines a **practical development plan** for building the application in small, manageable steps.

The main goal is to **reach a working version quickly**, then improve and extend the application over time.

The development strategy focuses on:

- building a **vertical slice of functionality**
- keeping the architecture **simple and clean**
- implementing **core features first**
- improving the system through **iteration and refactoring**

---

# Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS

## Backend

- Python
- FastAPI
- Pydantic
- Pyright (static type checking)
- Poetry (dependency and environment management)

## Database

- PostgreSQL
- SQLAlchemy
- Alembic (migrations)

## Infrastructure

### Local Development

- Docker
- Docker Compose
- Environment variables for configuration

Docker will be used to run the local development environment, including the backend service and PostgreSQL database.

### Deployment

The first deployed version of the application may use simple managed hosting platforms rather than full container orchestration.

Possible platforms include:

- Render (backend + database)
- Railway (backend + database)
- Netlify or Vercel (frontend)

Docker-based deployment may be introduced in a later iteration.

## External APIs

- TMDB (The Movie Database)

---

# Development Phases

The application will be developed in **incremental phases**, where each phase introduces a small set of features.

The goal is to **always have a working application**, even in early stages.

---

# Phase 1 — Project Setup

### Estimated Time
3–4 hours

### Goal

Create the initial **full stack connection** between frontend and backend.

### Backend Setup

Create a minimal backend application using FastAPI.

Example endpoint:

GET /health

Response example:

{
"status": "ok"
}


This verifies that the backend server is running correctly.

Basic logging will also be configured to help debug API behavior during development.

### Frontend Setup

Create a frontend project using:

- React
- TypeScript

Create a simple page that calls the backend `/health` endpoint.

### Result of Phase 1

At the end of this phase:

- frontend runs
- backend runs
- frontend can call the backend API

---

# Phase 2 — Database Setup

### Estimated Time
3–4 hours

### Goal

Introduce the database and configure the ORM layer.

### Tasks

Install and configure:

- PostgreSQL
- SQLAlchemy
- Alembic

Create the first table:

users

Example columns:

id
email
password_hash
created_at


Create the SQLAlchemy model for `User`.

Test inserting a user record from the backend.

### Result of Phase 2

- backend connected to database
- user table exists
- ORM models working

---

# Phase 3 — Authentication

### Estimated Time
6–8 hours

### Goal

Allow users to create accounts and log in.

### Features

User Registration

POST /auth/register

User Login

POST /auth/login

### Security Features

- password hashing using bcrypt
- JWT token authentication
- JWT expiration (e.g. 24 hours)
- protected routes

Advanced authentication features such as refresh tokens and token rotation are intentionally excluded from the first iteration to keep the implementation simple.

### Frontend Pages

/register
/login


### Result of Phase 3

The application now supports:

- user accounts
- login
- authentication tokens
- protected endpoints

---

# Phase 4 — Movie Discovery

### Estimated Time
5–6 hours

### Goal

Allow users to browse movies from the TMDB API.

### Backend Endpoints

GET /movies/trending
GET /movies/popular
GET /movies/search

The backend integrates with the TMDB API and returns movie data to the frontend.

### Frontend Page

/discover


Users can browse movies and search for specific titles.

### Result of Phase 4

Users can now **discover movies**.

---
### SUGGESTION: EARLY DEPLOYMENT TO CHECK IF EVERYTHING WORKS
---


# Phase 5 — Likes System

### Estimated Time
4–6 hours

### Goal

Allow users to save movies they want to watch.

### Database Table

likes

Columns:

id
user_id
movie_id

### Backend Endpoint

POST /movies/{movie_id}/like

### Frontend Feature

Movie cards include a **Like button**.

### Result of Phase 5

Users can build a **personal list of movies they like**.

---

# Phase 6 — Rooms

### Estimated Time
6–8 hours

### Goal

Allow users to create rooms with friends.

### Database Tables

rooms
room_members

### Room Creation Flow

A room is created by inviting an existing user.

Steps:

1. User creates a room.
2. User enters the friend's email address.
3. The backend checks if the user exists.
4. If the user exists, a room is created.
5. Both users are added to the `room_members` table.

If the email does not belong to a registered user, the room cannot be created.

### Backend Endpoints

POST /rooms  
GET /rooms  
GET /rooms/{room_id}

### Result of Phase 6

Users can:

- create rooms
- invite friends (existing users)
- view shared rooms

---

# Phase 7 — Matches

### Estimated Time
3–4 hours

### Goal

Automatically detect movies liked by both users.

### Matching Logic

Matches are calculated as:

movies liked by both users

### Backend Endpoint

GET /rooms/{room_id}/matches


### Room UI Sections

Each room displays three sections:

#### Your Movies

Movies liked by the current user.

#### Friend Movies

Movies liked by the friend.

#### Matches

Movies liked by both users.

### Result of Phase 7

The **core functionality of the application is complete**.

Users can see which movies they both want to watch.

---

# Phase 8 — Basic Testing

### Estimated Time
3–4 hours

### Goal
Introduce basic automated testing for critical backend functionality.

### Testing Approach
Testing will focus on the most important application flows:

- user registration
- user login
- liking a movie
- creating a room

The goal is not full test coverage but verifying that core functionality works reliably.

### Tools

- pytest
- FastAPI TestClient

### Result of Phase 8
The project contains a minimal automated test suite verifying key API functionality.

---

# Phase 9 — UI Improvements

### Estimated Time
Optional

### Goals

Improve the user experience.

Possible improvements:

- movie cards with posters
- responsive layout
- loading states
- better navigation
- improved room view
- invitation links (system generates a unique invitation token, user shares a link with a friend, friend joins the room through the link)

---

# Phase 10 — Deployment

### Estimated Time
6–10 hours

### Goal

Deploy the application to the cloud.

### Tasks

- containerize the application using Docker
- configure environment variables
- deploy backend
- deploy frontend

Possible platforms:

- Render
- Fly.io
- Railway

---

# Development Timeline Example

Example timeline if working part-time:

Week 1
Project setup + authentication

Week 2
Movie discovery + likes

Week 3
Rooms + matches

Week 4
UI improvements + deployment


---

# Expected Outcome

At the end of development, the application will demonstrate experience with:

### Frontend

- React
- TypeScript
- component-based architecture

### Backend

- FastAPI
- REST API design
- authentication and security

### Database

- PostgreSQL
- relational data modeling
- SQLAlchemy ORM

### Infrastructure

- Docker
- environment configuration
- deployment

### API Integration

- TMDB movie data

---

# Guiding Principle

Development should prioritize:

- small, incremental progress
- clean architecture
- readable code
- basic security practices

The goal is to **build a working system first**, then improve it through **refactoring and iteration**.


# Possible Future Improvements

After the first working version is complete, the project may be extended with:

- CI/CD pipelines using GitHub Actions
- refresh token authentication
- invitation links for rooms
- group rooms with more than two users
- additional automated tests
- improved UI design
- performance optimizations