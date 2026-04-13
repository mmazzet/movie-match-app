### Database Schema — Collaborative Movie Decision App

## Overview

The database is built around five main tables:

- users
- movies
- likes
- rooms
- room_members

Relationships:

Users can like many movies

Movies can be liked by many users

Users can belong to multiple rooms

Rooms contain multiple users

## Schema Diagram

users
-----
id (PK)
email
password
created_at


movies
------
id (PK)
tmdb_id
title
poster_path
release_date
overview


likes
-----
id (PK)
user_id (FK → users.id)
movie_id (FK → movies.id)


rooms
-----
id (PK)
name
created_by (FK → users.id)
created_at


room_members
------------
id (PK)
room_id (FK → rooms.id)
user_id (FK → users.id)

## Relationship diagram

          +--------+
          | users  |
          +--------+
          | id     |
          | email  |
          | pwd    |
          +---+----+
              |
              |
              | 1
              |
              | N
        +-----v------+
        |  likes     |
        +------------+
        | id         |
        | user_id    |
        | movie_id   |
        +-----+------+
              |
              | N
              |
              | 1
         +----v-----+
         | movies   |
         +----------+
         | id       |
         | tmdb_id  |
         | title    |
         +----------+


users
  |
  | N
  |
  | 1
+--v-----------+
| room_members |
+--------------+
| id           |
| room_id      |
| user_id      |
+------+-------+
       |
       | N
       |
       | 1
   +---v----+
   | rooms  |
   +--------+
   | id     |
   | name   |
   | creator|
   +--------+




The schema supports the core features of the application:

- user accounts
- movie discovery
- liking movies
- creating rooms
- sharing rooms with friends
- detecting movie matches

---

# Indexes

likes.user_id
likes.movie_id
room_members.user_id
room_members.room_id
users.email

---

# Cascate Deletes

Add ON DELETE CASCADE to 

likes.user_id
likes.movie_id
room_members.user_id
room_members.room_id

---

# DB Violations

- backend should catch IntegrityError and return proper API response

# Tables Overview

The database contains the following tables:

- `users`
- `movies`
- `likes`
- `rooms`
- `room_members`

## Relationships

- A user can like many movies
- A movie can be liked by many users
- A user can belong to multiple rooms
- A room can contain multiple users

---

# Users Table

## Purpose

Stores registered user accounts.

Each user can:

- log in
- like movies
- create rooms
- join rooms

## Table

`users`

## Fields

```
id (PK)
email
password
created_at
```

## Notes

- `id` is the primary key
- `email` must be unique
- `password` stores the hashed password
- Plain passwords must **never** be stored

Example constraint:

```sql
UNIQUE(email)
```

---

# Movies Table

## Purpose

Stores movie information retrieved from the TMDB API.

This table acts as a **local cache** of movie data.

Caching movies locally helps:

- reduce external API calls
- improve performance
- simplify querying liked movies

## Table

`movies`

## Fields

```
id (PK)
tmdb_id
title
poster_path
release_date
overview
```

## Notes

- `tmdb_id` corresponds to the movie ID from TMDB (must be unique to prevent duplicates)
- `poster_path` stores the movie poster path returned by the API
- `release_date` stores the movie release date
- `overview` stores the movie description/synopsis from TMDB

Recommended constraint:

```sql
UNIQUE(tmdb_id)
```

This prevents storing the same movie multiple times.

---

# Likes Table

## Purpose

Stores movies that users have liked.

This table represents a **many-to-many relationship** between users and movies.

One user can like many movies.  
One movie can be liked by many users.

## Table

`likes`

## Fields

```
id (PK)
user_id (FK → users.id)
movie_id (FK → movies.id)
```

## Notes

- Cascade delete enabled on both `user_id` and `movie_id` foreign keys
- Deleting a user removes all their likes
- Deleting a movie removes all associated likes

## Relationships

- User → many likes  
- Movie → many likes
```

---

# Rooms Table

## Purpose

Represents a shared movie room.

Rooms allow users to compare their liked movies and detect matches.

Each room has a creator and can contain multiple members.

## Table

`rooms`

## Fields

```
id (PK)
name
created_by (FK → users.id)
created_at
```

## Notes

- `created_by` references the user who created the room
- The creator is automatically added as a member of the room

Example:

```
Room Name: Friday Movie Night
Created By: Alice
```

---

# Room Members Table

## Purpose

Stores which users belong to which rooms.

This table supports:

- multiple users in one room
- one user belonging to multiple rooms

## Table

`room_members`

## Fields

```
id (PK)
room_id (FK → rooms.id)
user_id (FK → users.id)
```

## Relationships

- Room → many members  
- User → many rooms

## Notes

This design supports both:

- the initial implementation (two users per room)
- future versions with group rooms

Recommended constraint:

```sql
UNIQUE(room_id, user_id)
```

This prevents adding the same user to the same room multiple times.

---

# Match Logic

Matches **do not require a separate database table**.

Matches are calculated dynamically by the backend.

A match occurs when **two users in the same room have liked the same movie**.

Example:

```
User A likes:
Dune
Interstellar
The Batman

User B likes:
Dune
Avatar
The Batman
```

Matches:

```
Dune
The Batman
```

These matches will be displayed in the **Matches section of the room**.

---

# Schema Summary

## users

```
id
email
password_hash
created_at
```

## movies

```
id
tmdb_id
title
poster_path
release_date
```

## likes

```
id
user_id
movie_id
```

## rooms

```
id
name
created_by
created_at
```

## room_members

```
id
room_id
user_id
```

---

# Design Principles

The database design follows these principles:

- simple relational modeling
- normalized structure
- minimal redundancy
- support for future features

The schema is designed to support:

- personal movie lists
- shared rooms
- automatic movie matching

