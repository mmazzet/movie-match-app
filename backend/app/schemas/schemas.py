import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        errors = []

        if len(value) < 8:
            errors.append("at least 8 characters")
        if not re.search(r"[A-Z]", value):
            errors.append("one uppercase letter")
        if not re.search(r"[a-z]", value):
            errors.append("one lowercase letter")
        if not re.search(r"[0-9]", value):
            errors.append("one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            errors.append("one special character (!@#$%^&*...)")

        if errors:
            raise ValueError("Password must contain: " + ", ".join(errors))

        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None
