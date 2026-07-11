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
    assert patch.json()["status"] == "CONTACTED"
