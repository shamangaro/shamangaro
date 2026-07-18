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
    city: str | None = None
    offer_id: str
    offer_name: str
    quantity: int
    unit_price: float
    total_price: float
    status: str
    internal_notes: str | None = None
    is_risk: bool = False
    confirmation_agent: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CustomerHistoryResponse(BaseModel):
    total_orders: int
    delivered_count: int
    cancelled_count: int
    confirmed_count: int
    last_order_date: datetime | None


class OrderRiskResponse(BaseModel):
    trust_score: int
    trust_label: str
    trust_display: str
    warnings: list[str]
    is_blacklisted: bool
    blacklist_reason: str | None
    history: CustomerHistoryResponse


class OrderTimelineEvent(BaseModel):
    id: int
    event_type: str
    status: str | None = None
    note: str | None = None
    admin_username: str | None = None
    created_at: datetime


class OrderNoteResponse(BaseModel):
    id: int
    body: str
    admin_username: str | None = None
    created_at: datetime


class OrderCallResponse(BaseModel):
    id: int
    outcome: str
    notes: str | None = None
    admin_username: str | None = None
    created_at: datetime


class OrderAdminDetailResponse(OrderAdminResponse):
    risk: OrderRiskResponse | None = None
    timeline: list[OrderTimelineEvent] = []
    notes: list[OrderNoteResponse] = []
    calls: list[OrderCallResponse] = []


class OrderStatusUpdate(BaseModel):
    status: Literal[
        "NEW",
        "WAITING_CONFIRMATION",
        "CONTACTED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "NO_ANSWER",
        "CALLBACK",
    ]


class OrderNotesUpdate(BaseModel):
    internal_notes: str | None = Field(default=None, max_length=5000)


class OrderNoteCreate(BaseModel):
    body: str = Field(min_length=1, max_length=5000)


class OrderCallCreate(BaseModel):
    outcome: Literal["answered", "no_answer", "callback", "confirmed"]
    notes: str | None = Field(default=None, max_length=2000)


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
    waiting_confirmation_orders: int = 0
    contacted_orders: int
    confirmed_orders: int
    packed_orders: int = 0
    shipped_orders: int
    delivered_orders: int
    cancelled_orders: int
    no_answer_orders: int = 0
    callback_orders: int = 0
    today_sales: float
    week_sales: float = 0
    month_sales: float = 0
    total_sales: float
    trusted_customers: int = 0
    warning_customers: int = 0
    high_risk_customers: int = 0
    blacklisted_customers: int = 0


class AnalyticsResponse(BaseModel):
    today_revenue: float
    week_revenue: float
    month_revenue: float
    orders_by_city: list[dict]
    revenue_by_day: list[dict]
    revenue_by_month: list[dict]
    conversion_rate: float
    delivered_rate: float
    cancelled_rate: float
    average_basket: float


class NotificationSummaryResponse(BaseModel):
    pending_count: int
    latest_order_number: str | None = None
    items: list[dict]
