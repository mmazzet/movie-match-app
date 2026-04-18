from pydantic import BaseModel, ConfigDict, EmailStr


class RoomRequest(BaseModel):
    room_name: str
    friend_email: EmailStr


class RoomResponse(BaseModel):
    name: str
    id: int
    model_config = ConfigDict(from_attributes=True)
