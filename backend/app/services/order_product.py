"""Centralized order product classification for CRM, filters, and WhatsApp."""

from __future__ import annotations

from enum import Enum
from typing import Any

from sqlalchemy import or_

from app.models.order import Order
from app.services.products import WATCHES_PRODUCT_SLUG
from app.services.watch_line_items import parse_line_items

NEO_OFFER_IDS = frozenset({"solo", "duo", "family"})
PRODUCT_SLUG_NOTE = f"product_slug={WATCHES_PRODUCT_SLUG}"


class OrderProductType(str, Enum):
    NEO_TRANSAT = "neo-transat"
    WATCHES = "watches"
    UNKNOWN = "unknown"


def classify_order_product(
    *,
    offer_id: str | None,
    internal_notes: str | None = None,
    line_items: list[dict[str, Any]] | None = None,
) -> OrderProductType:
    normalized_offer = (offer_id or "").strip().lower()

    if normalized_offer == WATCHES_PRODUCT_SLUG:
        return OrderProductType.WATCHES

    if line_items:
        return OrderProductType.WATCHES

    notes = internal_notes or ""
    if PRODUCT_SLUG_NOTE in notes:
        return OrderProductType.WATCHES
    if "line_items=" in notes and parse_line_items(notes):
        return OrderProductType.WATCHES

    if normalized_offer in NEO_OFFER_IDS:
        return OrderProductType.NEO_TRANSAT

    return OrderProductType.UNKNOWN


def classify_order_model(order: Order) -> OrderProductType:
    parsed = parse_line_items(order.internal_notes)
    return classify_order_product(
        offer_id=order.offer_id,
        internal_notes=order.internal_notes,
        line_items=parsed or None,
    )


def watches_product_sql_condition():
    return or_(
        Order.offer_id == WATCHES_PRODUCT_SLUG,
        Order.internal_notes.ilike(f"%{PRODUCT_SLUG_NOTE}%"),
        Order.internal_notes.ilike("%line_items=%"),
    )


def neo_transat_product_sql_condition():
    return Order.offer_id.in_(tuple(NEO_OFFER_IDS))
