"""Tests for fake order detection and blacklist."""

import pytest

from app.services.customer_risk import (
    CustomerHistory,
    calculate_trust_score,
    trust_label_from_score,
)


def test_trust_score_blacklisted():
    history = CustomerHistory(total_orders=5, cancelled_count=3)
    score = calculate_trust_score(history, is_blacklisted=True, warnings=[])
    assert score == 0
    label, display = trust_label_from_score(score, True)
    assert label == "high_risk"
    assert "High Risk" in display


def test_trust_score_delivered_over_cancelled():
    history = CustomerHistory(total_orders=4, delivered_count=3, cancelled_count=1)
    score = calculate_trust_score(history, is_blacklisted=False, warnings=[])
    assert score >= 90


def test_trust_score_one_cancelled():
    history = CustomerHistory(total_orders=2, cancelled_count=1)
    score = calculate_trust_score(history, is_blacklisted=False, warnings=[])
    assert score == 60


def test_trust_score_many_cancelled():
    history = CustomerHistory(total_orders=4, cancelled_count=3)
    score = calculate_trust_score(history, is_blacklisted=False, warnings=[])
    assert score == 20


def test_trust_label_warning():
    label, display = trust_label_from_score(55, False)
    assert label == "warning"
    assert "Warning" in display


@pytest.mark.asyncio
async def test_blacklist_crud(admin_client):
    res = await admin_client.post(
        "/admin/blacklist",
        json={
            "phone": "0655555555",
            "name": "Fake User",
            "address": "Casablanca",
            "reason": "طلبات وهمية متكررة",
        },
    )
    assert res.status_code == 201
    entry_id = res.json()["id"]

    list_res = await admin_client.get("/admin/blacklist")
    assert list_res.status_code == 200
    assert any(e["phone"] == "0655555555" for e in list_res.json())

    del_res = await admin_client.delete(f"/admin/blacklist/{entry_id}")
    assert del_res.status_code == 204


@pytest.mark.asyncio
async def test_blacklisted_order_marked_risk(client, admin_client):
    await admin_client.post(
        "/admin/blacklist",
        json={
            "phone": "0666666666",
            "reason": "احتيال",
        },
    )

    create = await client.post(
        "/orders",
        json={
            "customer_name": "Risk User",
            "phone": "0666666666",
            "address": "Rabat centre",
            "offer_id": "solo",
        },
    )
    assert create.status_code == 201

    list_res = await admin_client.get("/admin/orders")
    order = next(
        o for o in list_res.json()["items"] if o["phone"] == "0666666666"
    )
    assert order["is_risk"] is True


@pytest.mark.asyncio
async def test_order_detail_includes_risk(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Detail Risk",
            "phone": "0677777777",
            "address": "Marrakech",
            "offer_id": "solo",
        },
    )
    list_res = await admin_client.get("/admin/orders")
    order_id = list_res.json()["items"][0]["id"]

    detail = await admin_client.get(f"/admin/orders/{order_id}")
    assert detail.status_code == 200
    data = detail.json()
    assert "risk" in data
    assert data["risk"]["trust_score"] >= 0
    assert "history" in data["risk"]


@pytest.mark.asyncio
async def test_stats_include_trust_counts(admin_client):
    res = await admin_client.get("/admin/orders/stats")
    assert res.status_code == 200
    data = res.json()
    assert "trusted_customers" in data
    assert "warning_customers" in data
    assert "high_risk_customers" in data
    assert "blacklisted_customers" in data
