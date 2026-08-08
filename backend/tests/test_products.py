"""Tests for multi-product order support."""

import pytest

from app.services.products import (
    WATCHES_PRODUCT_NAME,
    WATCHES_UNIT_PRICE,
    resolve_watches_multi_order,
    resolve_watches_order,
)
from app.services.watch_line_items import parse_line_items, serialize_line_items, WatchLineItemData


def test_resolve_watches_order_burgundy():
    order = resolve_watches_order(
        selected_variant="burgundy",
        quantity=1,
        source_page="/products/montres-femmes",
    )
    assert order.offer_id == "montres-femmes"
    assert order.offer_name == f"{WATCHES_PRODUCT_NAME} — Burgundy"
    assert order.quantity == 1
    assert order.unit_price == WATCHES_UNIT_PRICE
    assert order.total_price == WATCHES_UNIT_PRICE
    assert order.selected_variant == "Burgundy"


def test_resolve_watches_order_quantity_two():
    order = resolve_watches_order(
        selected_variant="taupe",
        quantity=2,
        source_page="/products/montres-femmes",
    )
    assert order.total_price == 498.0


def test_resolve_watches_order_invalid_variant():
    with pytest.raises(ValueError, match="الطراز"):
        resolve_watches_order(
            selected_variant="gold",
            quantity=1,
            source_page="/products/montres-femmes",
        )


def test_resolve_watches_order_quantity_three():
    order = resolve_watches_order(
        selected_variant="navy-blue",
        quantity=3,
        source_page="/products/montres-femmes",
    )
    assert order.total_price == 747.0
    assert order.quantity == 3


def test_resolve_watches_order_fatima_case():
    order = resolve_watches_order(
        selected_variant="burgundy",
        quantity=2,
        source_page="/products/montres-femmes",
    )
    assert order.total_price == 498.0
    assert order.selected_variant == "Burgundy"


def test_telegram_fatima_burgundy_quantity_two():
    from app.services.telegram_notifications import build_order_notification_message
    from app.models.order import Order, OrderStatus

    order = Order(
        order_number="SH-000100",
        customer_name="Fatima Zahra",
        phone="0612345678",
        address="الدار البيضاء، Maarif, Casablanca",
        offer_id="montres-femmes",
        offer_name="Montres Femmes Élégantes — Burgundy",
        quantity=2,
        unit_price=249.0,
        total_price=498.0,
        status=OrderStatus.NEW,
    )
    message = build_order_notification_message(order)
    assert "Montres Femmes Élégantes — Burgundy" in message
    assert "498" in message


def test_telegram_message_for_watches_order():
    from app.services.telegram_notifications import build_order_notification_message
    from app.models.order import Order, OrderStatus

    order = Order(
        order_number="SH-000099",
        customer_name="سارة",
        phone="0612345678",
        address="الدار البيضاء",
        offer_id="montres-femmes",
        offer_name="Montres Femmes Élégantes — Burgundy",
        quantity=1,
        unit_price=249.0,
        total_price=249.0,
        status=OrderStatus.NEW,
    )
    message = build_order_notification_message(order)
    assert "Montres Femmes Élégantes — Burgundy" in message
    assert "249" in message


def test_resolve_watches_multi_order_mixed():
    order = resolve_watches_multi_order(
        line_items=[
            {"variant_id": "taupe", "quantity": 2},
            {"variant_id": "burgundy", "quantity": 3},
        ],
        source_page="/products/montres-femmes",
    )
    assert order.quantity == 5
    assert order.total_price == 1245.0
    assert len(order.line_items) == 2
    assert "Taupe×2" in order.offer_name
    assert "Burgundy×3" in order.offer_name


def test_watch_line_items_serialize_parse_roundtrip():
    note = serialize_line_items(
        [
            WatchLineItemData(
                variant_id="navy-blue",
                variant_label="Navy Blue",
                quantity=2,
                image="/images/montres-femmes/slide-02-navy.png",
            )
        ]
    )
    parsed = parse_line_items(f"product_slug=montres-femmes; {note}")
    assert len(parsed) == 1
    assert parsed[0]["watch_id"] == "navy-blue"
    assert parsed[0]["quantity"] == 2
