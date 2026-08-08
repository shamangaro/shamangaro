import math
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.services.phone import is_valid_moroccan_phone, normalize_moroccan_phone
from app.services.products import (
    WATCHES_PRODUCT_NAME,
    WATCHES_PRODUCT_SLUG,
    WATCHES_UNIT_PRICE,
    WATCH_VARIANTS,
)


def _price_matches(value: float | None, expected: float) -> bool:
    if value is None:
        return True
    return math.isclose(float(value), expected, rel_tol=0.0, abs_tol=0.01)


class WatchLineItemCreate(BaseModel):
    variant_id: str = Field(min_length=1, max_length=40)
    quantity: int = Field(ge=1, le=99)


class WatchLineItemPublic(BaseModel):
    watch_id: str
    watch_name: str
    model_number: str
    image: str | None = None
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=200)
    phone: str = Field(min_length=10, max_length=20)
    address: str | None = Field(default=None, max_length=500)
    city: str | None = Field(default=None, max_length=120)
    offer_id: Literal["solo", "duo", "family"] | None = None
    product_slug: Literal["montres-femmes"] | None = None
    product_name: str | None = None
    selected_variant: str | None = None
    line_items: list[WatchLineItemCreate] | None = None
    quantity: int | None = Field(default=None, ge=1, le=99)
    unit_price: float | None = None
    total_amount: float | None = None
    source_page: str | None = None

    @field_validator("customer_name", "address", "city")
    @classmethod
    def strip_whitespace(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return value.strip()

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not is_valid_moroccan_phone(value):
            raise ValueError("رقم الهاتف غير صالح")
        return normalize_moroccan_phone(value)

    @model_validator(mode="after")
    def validate_order_payload(self) -> "OrderCreate":
        has_offer = self.offer_id is not None
        has_product = self.product_slug is not None

        if has_offer and has_product:
            raise ValueError("لا يمكن الجمع بين عرض Neo Transat ومنتج آخر")
        if not has_offer and not has_product:
            raise ValueError("يجب تحديد العرض أو المنتج")

        if has_offer:
            if not self.address or len(self.address) < 5:
                raise ValueError("العنوان مطلوب")

        if has_product:
            if self.product_slug != WATCHES_PRODUCT_SLUG:
                raise ValueError("المنتج غير مدعوم")
            if self.product_name and self.product_name.strip() != WATCHES_PRODUCT_NAME:
                raise ValueError("اسم المنتج غير صالح")
            if self.line_items:
                pass
            elif not self.selected_variant:
                raise ValueError("يجب اختيار الطراز")
            elif self.selected_variant.strip().lower() not in WATCH_VARIANTS:
                raise ValueError("الطراز المحدد غير صالح")
            elif self.quantity is None:
                raise ValueError("يجب تحديد الكمية")
            else:
                expected_total = round(WATCHES_UNIT_PRICE * self.quantity, 2)
                if not _price_matches(self.unit_price, WATCHES_UNIT_PRICE):
                    raise ValueError("سعر الوحدة غير صالح")
                if not _price_matches(self.total_amount, expected_total):
                    raise ValueError("المبلغ الإجمالي غير صالح")
                city = (self.city or "").strip()
                if not city:
                    raise ValueError("يجب تحديد المدينة")
                if not self.address:
                    self.address = city

        if has_product and self.line_items:
            if self.selected_variant:
                raise ValueError("لا يمكن الجمع بين طراز واحد وقائمة موديلات")
            if not self.line_items:
                raise ValueError("يجب اختيار ساعة واحدة على الأقل")
            total_qty = 0
            for item in self.line_items:
                variant_key = item.variant_id.strip().lower()
                if variant_key not in WATCH_VARIANTS:
                    raise ValueError("الطراز المحدد غير صالح")
                total_qty += item.quantity
            if self.quantity is not None and self.quantity != total_qty:
                raise ValueError("الكمية الإجمالية غير صالحة")
            self.quantity = total_qty
            expected_total = round(WATCHES_UNIT_PRICE * total_qty, 2)
            if not _price_matches(self.unit_price, WATCHES_UNIT_PRICE):
                raise ValueError("سعر الوحدة غير صالح")
            if not _price_matches(self.total_amount, expected_total):
                raise ValueError("المبلغ الإجمالي غير صالح")
            city = (self.city or "").strip()
            if not city:
                raise ValueError("يجب تحديد المدينة")
            if not self.address:
                self.address = city

        return self


class OrderPublicResponse(BaseModel):
    order_number: str
    customer_name: str
    phone: str
    offer_name: str
    quantity: int
    total_price: float
    status: str
    created_at: datetime
    line_items: list[WatchLineItemPublic] | None = None

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
    line_items: list[WatchLineItemPublic] | None = None
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
    model_config = ConfigDict(from_attributes=True)

    id: int
    event_type: str
    status: str | None = None
    note: str | None = None
    admin_username: str | None = None
    created_at: datetime


class OrderNoteResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    body: str
    admin_username: str | None = None
    created_at: datetime


class OrderCallResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    outcome: str
    notes: str | None = None
    admin_username: str | None = None
    created_at: datetime


class OrderAdminDetailResponse(OrderAdminResponse):
    is_archived: bool = False
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
