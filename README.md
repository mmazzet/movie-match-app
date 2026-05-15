# Movie Match

Find the movies you and your friend both want to watch.

## Key Features

- **User Authentication** - Registration and login with JWT tokens
  <details>
    <summary>View Screenshot</summary>
    
    ![Sign in page](./assets/screenshots/signin_page.png)
  </details>
- **Movie Discovery** - Browse trending and popular movies via TMDB
  <details>
    <summary>View Screenshot</summary>
    
    ![Discover Movies page](./assets/screenshots/discover_movies_page.png)
  </details>
- **Like System** - Build a personal list of movies you like
  <details>
    <summary>View Screenshot</summary>
    
    ![My Movies page](./assets/screenshots/my_movies_page.png)
  </details>
- **Watched Tracking** - Mark movies as watched with eye icon indicator
- **Rooms** - Create a room with a friend to compare your movie preferences
  <details>
    <summary>View Screenshots</summary>
    
    ![Room creation](./assets/screenshots/room_creation_page.png)
    ![List of rooms](./assets/screenshots/room_list_page.png)
  </details>
- **Match Results** - See which movies you both liked
  <details>
    <summary>View Screenshot</summary>
    
    ![Room page](./assets/screenshots/my_movies_page.png)
  </details>
- **Type-Safe Full Stack** - TypeScript frontend and Python backend with strict type checking
- **Search and Filter** - Browse movies by title, genre, year, country, language, and rating
  <details>
    <summary>View Screenshot</summary>
    
    ![Search and Filter options](./assets/screenshots/search_and_filter.png)
  </details>

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, PostgreSQL
- **Infrastructure**: Docker, GitHub Actions CI/CD, deployed online

## Project Status

Core features are implemented and working: authentication, movie search and filtering, liking movies, room creation, and match calculation. See [backlog.md](docs/backlog.md) for planned improvements.

## How It Works

### User Journey

1. Create an account and log in
2. Search for movies and like the ones you want to watch
3. Create a room and add a friend by their email
4. Both of you like movies in the app
5. The room shows movies you both liked

### Example

You like: [Dune, Interstellar, Batman]
Your Friend: [Dune, Avatar, Batman]

Matches: [Dune, Batman]

## Installation

### Prerequisites

- Python 3.12
- Node.js 24
- Docker and Docker Compose

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - **Windows:**
     ```bash
     .venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```bash
     source .venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install poetry
   poetry install
   ```

5. Create a `.env` file in the backend directory with:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/movie_match
   POSTGRES_USER=user
   POSTGRES_PASSWORD=password
   POSTGRES_DB=movie_match
   SECRET_KEY=your_secret_key_here
   TMDB_API_KEY=your_tmdb_api_key
   ```

6. Start PostgreSQL:
   ```bash
   docker-compose up -d
   ```

7. Run migrations:
   ```bash
   alembic upgrade head
   ```

8. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:8000`.

### Docker Setup (Full Stack)

For a complete containerized environment:

1. Ensure Docker and Docker Compose are installed
2. Create `.env` file in the backend directory with required variables
3. Run the full stack:
   ```bash
   docker-compose up --build
   ```

This starts three services:
- **Frontend** (Nginx) on `http://localhost:80`
- **Backend** (FastAPI) on `http://localhost:8000` (internal)
- **Database** (PostgreSQL) on `http://localhost:5432` (internal)

The frontend Nginx container:
- Serves the optimized React build (multi-stage Docker build with Node builder + Nginx server)
- Reverse-proxies API requests (`/api/`) to the backend service
- Handles SPA routing for client-side navigation
- Passes `VITE_API_URL=/api/v1` at build time for correct API endpoint configuration

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
- **GitHub Actions** - Automated CI/CD pipelines ensure code quality on every push and pull request to mainline
- **Docker** - Full stack containerised environment (frontend, backend, database) for consistent local development and production deployments

For architecture documentation, see [architecture.md](docs/architecture.md).

## CI/CD Pipeline

The project uses GitHub Actions to automate testing, linting, type checking, and deployment on every commit and pull request to the `mainline` branch.

### Backend Pipeline (`backend-ci.yml`)

Runs automated checks on all backend code:
- **Python Tests**: Full test suite with pytest against a PostgreSQL 16 test database
- **Linting**: Code quality analysis with Ruff to catch common issues
- **Code Formatting**: Black formatting verification for consistent style
- **Setup**: Python 3.12 with Poetry dependency management
- **Deploy**: On success, automatically deploys to Render

### Frontend Pipeline (`frontend-ci.yml`)

Runs automated checks on all frontend code:
- **TypeScript Type Checking**: `tsc --noEmit` verifies type safety across the React codebase
- **ESLint**: Linting analysis catches code quality issues and potential bugs
- **Prettier**: Runs formatting 
- **Setup**: Node.js 24 with npm dependency caching for faster builds
- **Deploy**: On success, automatically deploys to Vercel

Both pipelines must pass before code can be merged to mainline, enforced via GitHub branch protection rules.


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

### API Design with FastAPI

Built a REST API that handles:
- Request validation with automatic error messages
- Consistent error responses across all endpoints
- Queries using SQLAlchemy ORM


## Known Limitations & Future Work

- **JWT storage**: Tokens are currently stored in localStorage for simplicity. Production apps should use httpOnly cookies to protect against XSS attacks.
- **Remaining features**: More items in [backlog.md](docs/backlog.md).