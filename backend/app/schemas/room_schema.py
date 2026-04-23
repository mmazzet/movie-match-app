from pydantic import BaseModel, ConfigDict, EmailStr


class RoomRequest(BaseModel):
    room_name: str
    friend_email: EmailStr


class RoomResponse(BaseModel):
    name: str
    id: int
    model_config = ConfigDict(from_attributes=True)


# Movie summary used inside room details
class RoomMovieResponse(BaseModel):
    tmdb_id: int
    title: str
    poster_path: str | None
    model_config = ConfigDict(from_attributes=True)


# Full room details response
class RoomDetailResponse(BaseModel):
    room_id: int
    room_name: str
    current_user_email: EmailStr
    friend_email: EmailStr
    your_movies: list[RoomMovieResponse]
    friend_movies: list[RoomMovieResponse]
    matches: list[RoomMovieResponse]
