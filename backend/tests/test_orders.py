import pytest


@pytest.mark.asyncio
async def test_health(client):
    res = await client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_create_order(client):
    res = await client.post(
        "/orders",
        json={
            "customer_name": "أحمد بنعلي",
            "phone": "0612345678",
            "address": "الدار البيضاء، المعاريف",
            "offer_id": "duo",
        },
    )
    assert res.status_code == 201
    data = res.json()
    assert data["order_number"].startswith("SH-")
    assert data["total_price"] == 458.0


@pytest.mark.asyncio
async def test_create_order_invalid_phone(client):
    res = await client.post(
        "/orders",
        json={
            "customer_name": "Test",
            "phone": "0512345678",
            "address": "Address here",
            "offer_id": "solo",
        },
    )
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_create_order_invalid_offer(client):
    res = await client.post(
        "/orders",
        json={
            "customer_name": "Test",
            "phone": "0612345678",
            "address": "Address here",
            "offer_id": "invalid",
        },
    )
    assert res.status_code == 422


@pytest.mark.asyncio
async def test_get_order_public(client):
    create = await client.post(
        "/orders",
        json={
            "customer_name": "فاطمة",
            "phone": "0712345678",
            "address": "الرباط",
            "offer_id": "solo",
        },
    )
    order_number = create.json()["order_number"]
    res = await client.get(f"/orders/{order_number}")
    assert res.status_code == 200
    assert res.json()["customer_name"] == "فاطمة"
    assert res.json()["total_price"] == 249.0


@pytest.mark.asyncio
async def test_admin_orders_protected(client):
    res = await client.get("/admin/orders")
    assert res.status_code == 401


@pytest.mark.asyncio
async def test_admin_list_orders(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Order 1",
            "phone": "0611111111",
            "address": "Casablanca",
            "offer_id": "family",
        },
    )
    res = await admin_client.get("/admin/orders")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] >= 1
    assert len(data["items"]) >= 1


@pytest.mark.asyncio
async def test_admin_update_status(admin_client):
    create = await admin_client.post(
        "/orders",
        json={
            "customer_name": "Status Test",
            "phone": "0622222222",
            "address": "Marrakech",
            "offer_id": "solo",
        },
    )
    order_number = create.json()["order_number"]
    list_res = await admin_client.get("/admin/orders")
    order_id = list_res.json()["items"][0]["id"]

    patch = await admin_client.patch(
        f"/admin/orders/{order_id}/status",
        json={"status": "CONFIRMED"},
    )
    assert patch.status_code == 200
    assert patch.json()["status"] == "CONFIRMED"

    get_res = await admin_client.get(f"/admin/orders/{order_id}")
    assert get_res.json()["order_number"] == order_number


@pytest.mark.asyncio
async def test_admin_update_notes(admin_client):
    create = await admin_client.post(
        "/orders",
        json={
            "customer_name": "Notes Test",
            "phone": "0633333333",
            "address": "Fes centre",
            "offer_id": "solo",
        },
    )
    list_res = await admin_client.get("/admin/orders")
    order_id = list_res.json()["items"][0]["id"]

    patch = await admin_client.patch(
        f"/admin/orders/{order_id}/notes",
        json={"internal_notes": "سيتصل العميل غداً"},
    )
    assert patch.status_code == 200
    assert patch.json()["internal_notes"] == "سيتصل العميل غداً"


@pytest.mark.asyncio
async def test_admin_contacted_status(admin_client):
    create = await admin_client.post(
        "/orders",
        json={
            "customer_name": "Contact Test",
            "phone": "0644444444",
            "address": "Tanger",
            "offer_id": "solo",
        },
    )
    assert create.status_code == 201
    list_res = await admin_client.get("/admin/orders")
    order_id = list_res.json()["items"][0]["id"]

    patch = await admin_client.patch(
        f"/admin/orders/{order_id}/status",
        json={"status": "CONTACTED"},
    )
    assert patch.status_code == 200
    assert patch.json()["status"] == "WAITING_CONFIRMATION"


@pytest.mark.asyncio
async def test_admin_order_timeline_and_notes(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Timeline Test",
            "phone": "0655555555",
            "address": "Agadir، centre",
            "offer_id": "solo",
        },
    )
    list_res = await admin_client.get("/admin/orders?search=Timeline")
    order_id = list_res.json()["items"][0]["id"]

    note_res = await admin_client.post(
        f"/admin/orders/{order_id}/notes",
        json={"body": "Customer requested delivery on Monday."},
    )
    assert note_res.status_code == 200

    detail = await admin_client.get(f"/admin/orders/{order_id}")
    assert detail.status_code == 200
    data = detail.json()
    assert len(data["timeline"]) >= 2
    assert len(data["notes"]) == 1
    assert data["city"] == "Agadir"


@pytest.mark.asyncio
async def test_admin_log_call_updates_status(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Call Test",
            "phone": "0666666666",
            "address": "Rabat",
            "offer_id": "solo",
        },
    )
    order_id = (await admin_client.get("/admin/orders?search=Call")).json()["items"][0]["id"]

    call_res = await admin_client.post(
        f"/admin/orders/{order_id}/calls",
        json={"outcome": "confirmed", "notes": "Confirmed by phone"},
    )
    assert call_res.status_code == 200

    detail = await admin_client.get(f"/admin/orders/{order_id}")
    assert detail.json()["status"] == "CONFIRMED"
    assert len(detail.json()["calls"]) == 1


@pytest.mark.asyncio
async def test_admin_analytics(admin_client):
    res = await admin_client.get("/admin/orders/analytics")
    assert res.status_code == 200
    data = res.json()
    assert "today_revenue" in data
    assert "orders_by_city" in data
    assert "conversion_rate" in data


@pytest.mark.asyncio
async def test_admin_stats_v2(admin_client):
    res = await admin_client.get("/admin/orders/stats")
    assert res.status_code == 200
    data = res.json()
    assert "waiting_confirmation_orders" in data
    assert "packed_orders" in data
    assert "week_sales" in data


@pytest.mark.asyncio
async def test_admin_notifications(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Notify Test",
            "phone": "0677777777",
            "address": "Oujda",
            "offer_id": "solo",
        },
    )
    res = await admin_client.get("/admin/notifications/summary")
    assert res.status_code == 200
    data = res.json()
    assert data["pending_count"] >= 1
    item = next(
        (entry for entry in data["items"] if entry["customer_name"] == "Notify Test"),
        None,
    )
    assert item is not None
    assert item["offer_id"] == "solo"
    assert item["offer_name"] == "كرسي واحد"
    assert item["total_price"] == 249.0


@pytest.mark.asyncio
async def test_archive_restore_and_permanent_delete(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Archive Flow",
            "phone": "0699999999",
            "address": "Tanger",
            "offer_id": "solo",
        },
    )
    list_res = await admin_client.get("/admin/orders?search=Archive+Flow")
    assert list_res.status_code == 200
    order_id = list_res.json()["items"][0]["id"]

    archive_res = await admin_client.post(f"/admin/orders/{order_id}/archive")
    assert archive_res.status_code == 204

    active_res = await admin_client.get("/admin/orders?search=Archive+Flow")
    assert active_res.json()["items"] == []

    archived_res = await admin_client.get(
        "/admin/orders?archived=true&search=Archive+Flow"
    )
    assert len(archived_res.json()["items"]) == 1

    restore_res = await admin_client.post(f"/admin/orders/{order_id}/restore")
    assert restore_res.status_code == 204

    active_res = await admin_client.get("/admin/orders?search=Archive+Flow")
    assert len(active_res.json()["items"]) == 1

    await admin_client.post(f"/admin/orders/{order_id}/archive")
    delete_res = await admin_client.delete(f"/admin/orders/{order_id}")
    assert delete_res.status_code == 204

    archived_res = await admin_client.get(
        "/admin/orders?archived=true&search=Archive+Flow"
    )
    assert archived_res.json()["items"] == []

    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Active Delete Block",
            "phone": "0699999998",
            "address": "Tanger",
            "offer_id": "solo",
        },
    )
    active_id = (
        await admin_client.get("/admin/orders?search=Active+Delete+Block")
    ).json()["items"][0]["id"]
    blocked_delete = await admin_client.delete(f"/admin/orders/{active_id}")
    assert blocked_delete.status_code == 404


@pytest.mark.asyncio
async def test_admin_export_formats(admin_client):
    await admin_client.post(
        "/orders",
        json={
            "customer_name": "Export Test",
            "phone": "0688888888",
            "address": "Meknes",
            "offer_id": "solo",
        },
    )
    for fmt, content_type in (
        ("csv", "text/csv"),
        ("xlsx", "spreadsheetml"),
        ("pdf", "application/pdf"),
    ):
        res = await admin_client.get(f"/admin/orders/export?format={fmt}")
        assert res.status_code == 200
        assert content_type in res.headers.get("content-type", "")


@pytest.mark.asyncio
async def test_whatsapp_templates():
    from app.services.whatsapp_templates import (
        build_order_confirmed_whatsapp,
        build_order_received_whatsapp,
    )

    received = build_order_received_whatsapp("أحمد", 2, 458.0)
    assert "SHAMANGARO" in received
    assert "Neo Transat" in received
    assert "458" in received

    confirmed = build_order_confirmed_whatsapp("أحمد")
    assert "تم تأكيد طلبكم بنجاح" in confirmed
