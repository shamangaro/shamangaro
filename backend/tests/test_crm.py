"""Unit tests for Google Sheets row helpers (no live API calls)."""

from datetime import datetime, timezone

from app.models.order import Order, OrderStatus
from app.services.google_sheets import _parse_service_account_info, _sheets_enabled
from app.services.order_notifications import order_to_sheet_row


def test_order_to_sheet_row_columns():
    order = Order(
        id=1,
        order_number="SH-000001",
        customer_name="Test User",
        phone="0612345678",
        address="Casablanca",
        city="Casablanca",
        offer_id="solo",
        offer_name="Pack Solo",
        quantity=1,
        unit_price=249.0,
        total_price=249.0,
        status=OrderStatus.NEW,
        created_at=datetime(2026, 7, 18, tzinfo=timezone.utc),
        updated_at=datetime(2026, 7, 18, tzinfo=timezone.utc),
    )
    row = order_to_sheet_row(order, "admin", "Note here")
    assert len(row) == 13
    assert row[0] == "SH-000001"
    assert row[2] == "Test User"
    assert row[10] == "admin"
    assert row[11] == "Note here"


def test_sheets_disabled_without_config(monkeypatch):
    monkeypatch.setattr(
        "app.services.google_sheets.settings.GOOGLE_SHEETS_SPREADSHEET_ID", ""
    )
    monkeypatch.setattr(
        "app.services.google_sheets.settings.GOOGLE_SERVICE_ACCOUNT_JSON", ""
    )
    assert _sheets_enabled() is False


def test_parse_inline_service_account_json(monkeypatch):
    monkeypatch.setattr(
        "app.services.google_sheets.settings.GOOGLE_SERVICE_ACCOUNT_JSON",
        '{"type":"service_account","project_id":"test"}',
    )
    info = _parse_service_account_info()
    assert info is not None
    assert info["project_id"] == "test"
