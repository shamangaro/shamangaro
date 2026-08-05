"""Tests for multi-product order support."""

import pytest

from app.services.products import (
    WATCHES_PRODUCT_NAME,
    WATCHES_UNIT_PRICE,
    resolve_watches_order,
)


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
    assert order.total_price == 245.0
    assert order.selected_variant == "Burgundy"


def test_resolve_watches_order_quantity_two():
    order = resolve_watches_order(
        selected_variant="taupe",
        quantity=2,
        source_page="/products/montres-femmes",
    )
    assert order.total_price == 490.0


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
    assert order.total_price == 735.0
    assert order.quantity == 3


def test_resolve_watches_order_fatima_case():
    order = resolve_watches_order(
        selected_variant="burgundy",
        quantity=2,
        source_page="/products/montres-femmes",
    )
    assert order.total_price == 490.0
    assert order.selected_variant == "Burgundy"


def test_telegram_fatima_burgundy_quantity_two():
    from app.services.telegram_notifications import build_order_notification_message
    from app.models.order import Order, OrderStatus

    order = Order(
        order_number="SH-000100",
        customer_name="Fatima Zahra",
        phone="0679653509",
        address="الدار البيضاء، Maarif, Casablanca",
        offer_id="montres-femmes",
        offer_name="Montres Femmes Élégantes — Burgundy",
        quantity=2,
        unit_price=245.0,
        total_price=490.0,
        status=OrderStatus.NEW,
    )
    message = build_order_notification_message(order)
    assert "Montres Femmes Élégantes — Burgundy" in message
    assert "490" in message


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
        unit_price=245.0,
        total_price=245.0,
        status=OrderStatus.NEW,
    )
    message = build_order_notification_message(order)
    assert "Montres Femmes Élégantes — Burgundy" in message
    assert "245" in message
