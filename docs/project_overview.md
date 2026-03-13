# MOVIE-MATCH Collaborative Movie Decision App

## Project Purpose

This project is a **learning and portfolio project**.

Goals:

- Practice building a **full web application**
- Learn backend development with **Python and FastAPI**
- Practice **API integration**
- Design a **relational database**
- Implement **authentication and security**
- Learn **testing (unit and integration tests)**
- Practice **deployment and infrastructure**

The app will integrate with **TMDB (The Movie Database) API** to retrieve movie data.

---

## Security Approach

Security is treated as a core principle of the project.

The goal is not to implement enterprise-level security, but to learn and apply **good security practices from the beginning**.

Security will be considered in:

- authentication
- API design
- input validation
- database interactions
- configuration and deployment

The focus is on **simple but correct implementations** that are appropriate for a beginner project.

---

# Core Concept

The application helps **friends decide what movie to watch together**.

Each user builds a personal list of movies they want to watch.  
Users can create **rooms** with friends to compare their lists.

The app detects **matches automatically** when two users like the same movie.

Matched movies become the **shared watchlist for the room**.

---

# Main Entities

The application revolves around four core entities:

- Users
- Movies
- Rooms
- Likes

---

# User

A user represents a registered account in the application.

Users can:

- Create an account
- Log in
- Browse movies
- Search for movies
- Like movies
- Create rooms
- Join rooms
- View matches with friends

Each user has a **global list of liked movies**.

Likes are **not room-specific**.  
If a user likes a movie, that preference applies across all rooms.

---

# Movie

Movie information comes from the **TMDB API**.

Movies are not manually created by users.

Example movie data:

- TMDB ID
- title
- poster
- release date
- description
- genres

Movies can be:

- viewed
- liked
- added automatically to room matches if both users like them

---

# Personal Movie List

Each user builds a **personal list of liked movies**.

Users can add movies to this list in multiple ways:

### Discover Page

Users are shown movies such as:

- Latest releases
- Trending movies
- Popular movies

### Search

Users can search for any movie and add it to their list.

Example:

User Alice likes:

- Dune
- Interstellar
- The Batman

These likes are stored globally.

---

# Rooms

Rooms allow users to compare movie preferences with friends.

A user can create **multiple rooms**.

Examples:

- Room with Anna
- Room with Peter
- Room with another friend group

Initial implementation:

- Rooms support **2 users only**

Future improvement:

- Rooms may support **multiple users**

---

# Room Structure

Each room contains:

- two members
- a shared view of movie lists
- automatically generated matches

Room views include three sections:

### Your Movies

Movies liked by the current user.

### Friend Movies

Movies liked by the other user.

### Matches

Movies liked by **both users**.

These movies become the **shared watchlist**.

---

# Matching Logic

Matching is automatic.

Example:

Alice likes:

- Dune
- Interstellar
- The Batman

Bob likes:

- Dune
- Avatar
- The Batman

Matches detected:

- Dune
- The Batman

These appear in the **Matches section of the room**.

---

# Interaction With Friend Movies

If a friend has a movie in their list that the user does not have:

Example:

Bob likes:

- Avatar

Alice sees this in **Friend Movies**.

Alice can:

- Like the movie

If Alice likes it:

- the movie becomes a **Match**
- it moves into the **Matches list**

---

# Movie Discovery

Users can discover movies through several features.

### Latest Movies

Movies currently releasing.

### Trending Movies

Movies trending globally.

### Popular Movies

Popular movies from TMDB.

### Search

Users can search by movie title.

Example:

Search query:

Interstellar

Users can then like the movie and add it to their personal list.

---

### Inviting Friends

Rooms are created by inviting an existing user.

When creating a room, the user must provide the **email of another registered user**.

Example flow:

1. User creates a room.
2. User enters the friend's email address.
3. The system checks if the user exists.
4. If the user exists, both users are added to the room.

Only **existing users can be invited**.

If the email does not belong to a registered user, the room cannot be created.

This approach keeps the invitation system simple for the initial version of the application.

Future versions may introduce **invitation links or email invitations**.

# Room Example

Room:

Friday Movie Night

Members:

- Alice
- Bob

Room sections:

### Your Movies (Alice)

- Interstellar
- Dune
- Blade Runner

### Friend Movies (Bob)

- Avatar
- Dune
- The Batman

### Matches

- Dune

If Alice likes "The Batman", it moves into **Matches**.

---

# Initial Feature Scope

The first version of the app should support:

### Authentication

- user registration
- login
- logout

### Movie Discovery

- latest movies
- trending movies
- popular movies
- search movies

### Personal Likes

- like a movie
- store liked movies

### Rooms

- create room
- invite friend
- join room
- view room

### Matching

- detect shared liked movies
- display matches

---

# Future Features (Not in Initial Version)

Possible extensions later:

### Group Rooms

Rooms with more than two users.

### Movie Voting

Users vote on which movie to watch.

### Comments

Users comment on suggested movies.

### Movie Night Mode

Users vote on a final movie.

### Notifications

Users receive updates when:

- a friend adds a movie
- a new match appears

---

# Learning Goals

This project will help practice:

## Backend Development

- Python
- FastAPI
- REST API design
- Pydantic for request and response validation
- Static type checking with Pyright
- Authentication using JWT
- API integration with TMDB

## Frontend Development

- React
- TypeScript
- Tailwind CSS
- React Router for navigation
- Axios (or Fetch API) for backend communication
- Component-based UI architecture
- Type-safe API communication with the backend

## Database Design

- Relational database modeling
- PostgreSQL
- SQLAlchemy ORM
- Alembic for database migrations

### API Integration

- TMDB API integration

### Authentication

- secure password hashing
- token-based authentication (JWT)
- protected API routes
- user session management

### Testing

- unit tests
- API tests
- integration tests

### Security

Basic security best practices will be implemented:

- Password hashing using a secure algorithm (bcrypt)
- Token-based authentication using JWT
- Input validation using FastAPI/Pydantic
- Protection of authenticated API routes
- Environment variables for sensitive configuration
- Avoiding exposure of secrets in the codebase
- Static type checking to reduce runtime errors

The goal is to understand **how security is implemented in real applications**, while keeping the system simple and maintainable.

## Infrastructure & DevOps

- Docker
- Environment configuration using environment variables
- Secure handling of API keys
- Cloud deployment (TBD)
- CI/CD (future improvement)

---

# Guiding Principle

The project should start **simple, secure, and clean**.

Focus on:

- clear architecture
- readable code
- basic security best practices
- small features implemented well

Complex features can be added later through **refactoring and iteration**.