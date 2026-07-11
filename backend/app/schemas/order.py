from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from app.services.phone import is_valid_moroccan_phone, normalize_moroccan_phone


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=200)
    phone: str = Field(min_length=10, max_length=20)
    address: str = Field(min_length=5, max_length=500)
    offer_id: Literal["solo", "duo", "family"]

    @field_validator("customer_name", "address")
    @classmethod
    def strip_whitespace(cls, value: str) -> str:
        return value.strip()

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not is_valid_moroccan_phone(value):
            raise ValueError("رقم الهاتف غير صالح")
        return normalize_moroccan_phone(value)


class OrderPublicResponse(BaseModel):
    order_number: str
    customer_name: str
    phone: str
    offer_name: str
    quantity: int
    total_price: float
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class OrderCreateResponse(BaseModel):
    order_number: str
    total_price: float


class OrderAdminResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    phone: str
    address: str
    offer_id: str
    offer_name: str
    quantity: int
    unit_price: float
    total_price: float
    status: str
    internal_notes: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class OrderStatusUpdate(BaseModel):
    status: Literal[
        "NEW", "CONTACTED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"
    ]


class OrderNotesUpdate(BaseModel):
    internal_notes: str | None = Field(default=None, max_length=5000)


class OrderListResponse(BaseModel):
    items: list[OrderAdminResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class OrderStatsResponse(BaseModel):
    today_orders: int
    all_orders: int
    new_orders: int
    contacted_orders: int
    confirmed_orders: int
    shipped_orders: int
    delivered_orders: int
    cancelled_orders: int
    today_sales: float
    total_sales: float
