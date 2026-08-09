"""Tests for centralized order product classification and product-aware WhatsApp."""

from urllib.parse import quote, unquote

import pytest

from app.services.order_product import (
    OrderProductType,
    classify_order_product,
)
from app.services.whatsapp_templates import (
    build_order_confirmed_whatsapp,
    build_order_received_whatsapp,
    build_watches_confirmation_whatsapp,
    encode_whatsapp_message,
)


def test_classify_neo_transat_by_offer_id():
    assert (
        classify_order_product(offer_id="solo")
        == OrderProductType.NEO_TRANSAT
    )
    assert (
        classify_order_product(offer_id="duo")
        == OrderProductType.NEO_TRANSAT
    )
    assert (
        classify_order_product(offer_id="family")
        == OrderProductType.NEO_TRANSAT
    )


def test_classify_watches_by_offer_id():
    assert (
        classify_order_product(offer_id="montres-femmes")
        == OrderProductType.WATCHES
    )


def test_classify_watches_by_line_items():
    assert classify_order_product(
        offer_id="montres-femmes",
        line_items=[
            {
                "watch_id": "navy-blue",
                "watch_name": "أزرق بحري",
                "model_number": "Navy Blue",
                "quantity": 2,
            },
            {
                "watch_id": "burgundy",
                "watch_name": "عنابي",
                "model_number": "Burgundy",
                "quantity": 1,
            },
        ],
    ) == OrderProductType.WATCHES


def test_classify_watches_by_internal_notes():
    notes = (
        "product_slug=montres-femmes; "
        'line_items=[{"variant_id":"navy-blue","variant_label":"Navy Blue","quantity":1}]'
    )
    assert classify_order_product(
        offer_id="montres-femmes",
        internal_notes=notes,
    ) == OrderProductType.WATCHES


def test_classify_unknown_when_unreliable():
    assert classify_order_product(offer_id="mystery-product") == OrderProductType.UNKNOWN


def test_watches_whatsapp_includes_models_and_excludes_neo():
    message = build_watches_confirmation_whatsapp(
        {
            "customer_name": "Fatima",
            "city": "الدار البيضاء",
            "total_price": 747.0,
            "quantity": 3,
            "line_items": [
                {
                    "watch_id": "navy-blue",
                    "watch_name": "أزرق بحري",
                    "model_number": "Navy Blue",
                    "quantity": 2,
                },
                {
                    "watch_id": "burgundy",
                    "watch_name": "عنابي",
                    "model_number": "Burgundy",
                    "quantity": 1,
                },
            ],
        }
    )
    assert "Fatima" in message
    assert "• الساعة Navy Blue × 2" in message
    assert "• الساعة Burgundy × 1" in message
    assert "العدد الإجمالي: 3" in message
    assert "747" in message
    assert "Neo Transat" not in message
    assert "كرسي" not in message
    assert "Pack Neo" not in message


def test_neo_whatsapp_received_stays_correct():
    message = build_order_received_whatsapp(
        {
            "customer_name": "Youssef",
            "offer_id": "duo",
            "quantity": 2,
            "total_price": 458.0,
        }
    )
    assert "Neo Transat" in message
    assert "458" in message
    assert "Navy Blue" not in message
    assert "Montres Femmes" not in message


def test_neo_whatsapp_confirmed_has_no_watches_content():
    message = build_order_confirmed_whatsapp(
        {
            "customer_name": "Youssef",
            "offer_id": "solo",
            "quantity": 1,
            "total_price": 249.0,
        }
    )
    assert "تم تأكيد طلبكم بنجاح" in message
    assert "Navy Blue" not in message
    assert "الساعة" not in message


def test_arabic_whatsapp_url_encoding_roundtrip():
    message = build_watches_confirmation_whatsapp(
        {
            "customer_name": "سارة",
            "city": "مراكش",
            "total_price": 498.0,
            "quantity": 2,
            "line_items": [
                {
                    "watch_id": "burgundy",
                    "watch_name": "عنابي",
                    "model_number": "Burgundy",
                    "quantity": 2,
                }
            ],
        }
    )
    encoded = encode_whatsapp_message(message)
    assert "%" in encoded
    assert unquote(encoded) == message


@pytest.mark.asyncio
async def test_admin_product_filter_excludes_other_product(admin_client):
    neo_res = await admin_client.post(
        "/orders",
        json={
            "customer_name": "Neo Filter Test",
            "phone": "0611111111",
            "address": "Casablanca, Maarif",
            "offer_id": "solo",
        },
    )
    assert neo_res.status_code == 201

    watches_res = await admin_client.post(
        "/orders",
        json={
            "customer_name": "Watches Filter Test",
            "phone": "0622222222",
            "city": "الرباط",
            "product_slug": "montres-femmes",
            "product_name": "Montres Femmes Élégantes",
            "selected_variant": "burgundy",
            "quantity": 1,
            "unit_price": 249.0,
            "total_amount": 249.0,
            "source_page": "/products/montres-femmes",
        },
    )
    assert watches_res.status_code == 201

    neo_list = await admin_client.get("/admin/orders?product=neo-transat&search=Filter Test")
    assert neo_list.status_code == 200
    neo_items = neo_list.json()["items"]
    assert all(item["product_type"] == "neo-transat" for item in neo_items)
    assert any(item["customer_name"] == "Neo Filter Test" for item in neo_items)
    assert all(item["customer_name"] != "Watches Filter Test" for item in neo_items)

    watches_list = await admin_client.get("/admin/orders?product=watches&search=Filter Test")
    assert watches_list.status_code == 200
    watches_items = watches_list.json()["items"]
    assert all(item["product_type"] == "watches" for item in watches_items)
    assert any(item["customer_name"] == "Watches Filter Test" for item in watches_items)
    assert all(item["customer_name"] != "Neo Filter Test" for item in watches_items)

    counts = neo_list.json()["product_counts"]
    assert counts["all"] >= 2
    assert counts["neo_transat"] >= 1
    assert counts["watches"] >= 1

    status_filtered = await admin_client.get(
        "/admin/orders?product=watches&status=NEW&search=Filter Test"
    )
    assert status_filtered.status_code == 200
    status_body = status_filtered.json()
    assert all(item["product_type"] == "watches" for item in status_body["items"])
    assert all(item["status"] == "NEW" for item in status_body["items"])
