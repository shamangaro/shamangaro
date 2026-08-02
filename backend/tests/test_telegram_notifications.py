"""Tests for Telegram new-order notifications."""

from datetime import datetime, timezone
from unittest.mock import AsyncMock

import httpx
import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order, OrderStatus
from app.services.order_lifecycle import record_event
from app.services.order_notifications import run_order_created_hooks
from app.services.telegram_notifications import (
    build_crm_order_url,
    build_order_notification_message,
    build_telegram_payload,
    has_telegram_notification_sent,
    send_new_order_telegram_notification,
    telegram_notifications_enabled,
)


def _sample_order(**overrides) -> Order:
    defaults = {
        "id": 42,
        "order_number": "SH-000042",
        "customer_name": "أحمد بنعلي",
        "phone": "0612345678",
        "address": "الدار البيضاء، المعاريف",
        "city": "الدار البيضاء",
        "offer_id": "duo",
        "offer_name": "Pack Duo",
        "quantity": 2,
        "unit_price": 229.0,
        "total_price": 458.0,
        "status": OrderStatus.NEW,
        "created_at": datetime(2026, 8, 2, tzinfo=timezone.utc),
    }
    defaults.update(overrides)
    return Order(**defaults)


def test_telegram_notifications_disabled_by_default(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        False,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "token",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "123",
    )
    assert telegram_notifications_enabled() is False


def test_telegram_notifications_disabled_when_config_missing(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        True,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "",
    )
    assert telegram_notifications_enabled() is False


def test_telegram_notifications_enabled_with_config(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        True,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "123456:ABC",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "-100123456",
    )
    assert telegram_notifications_enabled() is True


def test_build_order_notification_message_content():
    order = _sample_order()
    message = build_order_notification_message(order)

    assert "🔔 طلبية جديدة — SHAMANGARO" in message
    assert "#SH-000042" in message
    assert "أحمد بنعلي" in message
    assert "0612345678" in message
    assert "الدار البيضاء، المعاريف" in message
    assert "Pack Duo" in message
    assert "458 DH" in message
    assert "💵 الدفع عند الاستلام" in message
    assert "🚚 التوصيل مجاني" in message


def test_build_order_notification_message_escapes_html():
    order = _sample_order(
        customer_name="<script>alert('x')</script>",
        address="Rue A & B > C",
        offer_name="Neo & Co",
    )
    message = build_order_notification_message(order)

    assert "<script>" not in message
    assert "&lt;script&gt;alert('x')&lt;/script&gt;" in message
    assert "Rue A &amp; B &gt; C" in message
    assert "Neo &amp; Co" in message


def test_build_crm_order_url(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.CRM_PUBLIC_URL",
        "https://shamangaro.com/",
    )
    assert build_crm_order_url(42) == "https://shamangaro.com/admin/orders/42"


def test_build_crm_order_url_falls_back_for_localhost(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.CRM_PUBLIC_URL",
        "http://localhost:3000",
    )
    assert build_crm_order_url(42) == "https://shamangaro.com/admin/orders/42"


def test_build_telegram_payload_includes_crm_button(monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "-100999",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.CRM_PUBLIC_URL",
        "https://shamangaro.com",
    )

    payload = build_telegram_payload(_sample_order())
    button = payload["reply_markup"]["inline_keyboard"][0][0]

    assert button["text"] == "فتح الطلب في CRM"
    assert button["url"] == "https://shamangaro.com/admin/orders/42"
    assert payload["parse_mode"] == "HTML"
    assert payload["chat_id"] == "-100999"


@pytest.mark.asyncio
async def test_send_telegram_skips_when_disabled(db_session: AsyncSession, monkeypatch):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        False,
    )
    order = _sample_order()
    db_session.add(order)
    await db_session.flush()

    called = False

    async def fake_post(self, url, json=None):
        nonlocal called
        called = True
        return httpx.Response(200, json={"ok": True})

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post)

    result = await send_new_order_telegram_notification(db_session, order)
    assert result is False
    assert called is False


@pytest.mark.asyncio
async def test_send_telegram_success_records_timeline_event(
    db_session: AsyncSession, monkeypatch
):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        True,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "123456:ABC",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "-100123456",
    )

    order = _sample_order()
    db_session.add(order)
    await db_session.flush()

    async def fake_post(self, url, json=None):
        assert "api.telegram.org/bot123456:ABC/sendMessage" in url
        assert json["parse_mode"] == "HTML"
        return httpx.Response(200, json={"ok": True})

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post)

    result = await send_new_order_telegram_notification(db_session, order)
    assert result is True
    assert await has_telegram_notification_sent(db_session, order.id) is True


@pytest.mark.asyncio
async def test_send_telegram_api_failure_does_not_record_event(
    db_session: AsyncSession, monkeypatch
):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        True,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "123456:ABC",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "-100123456",
    )

    order = _sample_order()
    db_session.add(order)
    await db_session.flush()

    async def fake_post(self, url, json=None):
        return httpx.Response(400, json={"ok": False, "description": "Bad Request"})

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post)

    result = await send_new_order_telegram_notification(db_session, order)
    assert result is False
    assert await has_telegram_notification_sent(db_session, order.id) is False


@pytest.mark.asyncio
async def test_send_telegram_duplicate_protection(
    db_session: AsyncSession, monkeypatch
):
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_NOTIFICATIONS_ENABLED",
        True,
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_BOT_TOKEN",
        "123456:ABC",
    )
    monkeypatch.setattr(
        "app.services.telegram_notifications.settings.TELEGRAM_CHAT_ID",
        "-100123456",
    )

    order = _sample_order()
    db_session.add(order)
    await db_session.flush()

    call_count = 0

    async def fake_post(self, url, json=None):
        nonlocal call_count
        call_count += 1
        return httpx.Response(200, json={"ok": True})

    monkeypatch.setattr(httpx.AsyncClient, "post", fake_post)

    first = await send_new_order_telegram_notification(db_session, order)
    second = await send_new_order_telegram_notification(db_session, order)

    assert first is True
    assert second is False
    assert call_count == 1


@pytest.mark.asyncio
async def test_telegram_failure_does_not_break_order_created_hooks(
    db_session: AsyncSession, monkeypatch
):
    order = _sample_order(order_number="SH-000100")
    db_session.add(order)
    await db_session.flush()
    order_id = order.id
    await db_session.commit()

    monkeypatch.setattr(
        "app.services.order_notifications.AsyncSessionLocal",
        lambda: _FakeSessionContext(db_session),
    )

    async def failing_send(db, order_obj):
        return False

    monkeypatch.setattr(
        "app.services.telegram_notifications.send_new_order_telegram_notification",
        failing_send,
    )
    monkeypatch.setattr(
        "app.services.google_sheets.sync_order_to_sheet",
        AsyncMock(),
    )

    await run_order_created_hooks(order_id)


class _FakeSessionContext:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def __aenter__(self) -> AsyncSession:
        return self.session

    async def __aexit__(self, *args):
        return None


@pytest.mark.asyncio
async def test_run_order_created_hooks_calls_telegram(
    db_session: AsyncSession, monkeypatch
):
    order = _sample_order(order_number="SH-000099")
    db_session.add(order)
    await db_session.flush()
    order_id = order.id
    await record_event(
        db_session,
        order,
        event_type="ORDER_CREATED",
        status="NEW",
        note="تم إنشاء الطلب",
    )
    await db_session.commit()

    monkeypatch.setattr(
        "app.services.order_notifications.AsyncSessionLocal",
        lambda: _FakeSessionContext(db_session),
    )

    telegram_mock = AsyncMock(return_value=True)
    monkeypatch.setattr(
        "app.services.telegram_notifications.send_new_order_telegram_notification",
        telegram_mock,
    )
    monkeypatch.setattr(
        "app.services.google_sheets.sync_order_to_sheet",
        AsyncMock(),
    )

    await run_order_created_hooks(order_id)

    telegram_mock.assert_awaited_once()
    called_order = telegram_mock.await_args.args[1]
    assert called_order.id == order_id


@pytest.mark.asyncio
async def test_create_order_endpoint_triggers_telegram_after_commit(
    client, db_session: AsyncSession, monkeypatch
):
    """POST /orders must run Telegram notification after the order transaction commits."""
    monkeypatch.setattr(
        "app.services.order_notifications.AsyncSessionLocal",
        lambda: _FakeSessionContext(db_session),
    )

    telegram_mock = AsyncMock(return_value=True)
    monkeypatch.setattr(
        "app.services.telegram_notifications.send_new_order_telegram_notification",
        telegram_mock,
    )
    monkeypatch.setattr(
        "app.services.google_sheets.sync_order_to_sheet",
        AsyncMock(),
    )

    res = await client.post(
        "/orders",
        json={
            "customer_name": "Integration Test",
            "phone": "0612345678",
            "address": "Casablanca",
            "offer_id": "solo",
        },
    )
    assert res.status_code == 201

    telegram_mock.assert_awaited_once()
    called_order = telegram_mock.await_args.args[1]
    assert called_order.order_number == res.json()["order_number"]
