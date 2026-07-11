from datetime import datetime

from pydantic import BaseModel, Field


class BlacklistCreate(BaseModel):
    phone: str = Field(min_length=10, max_length=20)
    name: str | None = Field(default=None, max_length=200)
    address: str | None = None
    city: str | None = Field(default=None, max_length=100)
    reason: str = Field(min_length=3, max_length=1000)


class BlacklistResponse(BaseModel):
    id: int
    phone: str
    name: str | None
    address: str | None
    city: str | None
    reason: str
    created_at: datetime

    model_config = {"from_attributes": True}
