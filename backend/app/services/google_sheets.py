import asyncio
import json
import logging
from pathlib import Path

from sqlalchemy import select

from app.config import settings
from app.database import AsyncSessionLocal
from app.models.admin_user import AdminUser
from app.models.order import Order
from app.services.order_notifications import order_to_sheet_row

logger = logging.getLogger(__name__)

_sheet_lock = asyncio.Lock()


def _sheets_enabled() -> bool:
    return bool(
        settings.GOOGLE_SHEETS_SPREADSHEET_ID
        and settings.GOOGLE_SERVICE_ACCOUNT_JSON
    )


def _parse_service_account_info() -> dict | None:
    raw = settings.GOOGLE_SERVICE_ACCOUNT_JSON.strip()
    if not raw:
        return None
    if raw.startswith("{"):
        return json.loads(raw)
    path = Path(raw)
    if path.is_file():
        return json.loads(path.read_text(encoding="utf-8"))
    return None


def _build_sheets_client():
    try:
        from google.oauth2.service_account import Credentials
        from googleapiclient.discovery import build
    except ImportError:
        return None

    info = _parse_service_account_info()
    if not info:
        return None

    creds = Credentials.from_service_account_info(
        info,
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    service = build("sheets", "v4", credentials=creds, cache_discovery=False)
    return service.spreadsheets()


def _find_row_index(sheets, order_number: str) -> int | None:
    range_name = f"{settings.GOOGLE_SHEETS_TAB}!A:A"
    result = (
        sheets.values()
        .get(spreadsheetId=settings.GOOGLE_SHEETS_SPREADSHEET_ID, range=range_name)
        .execute()
    )
    values = result.get("values", [])
    for idx, row in enumerate(values, start=1):
        if row and row[0] == order_number:
            return idx
    return None


def _upsert_row(sheets, row: list[str], order_number: str) -> None:
    existing_row = _find_row_index(sheets, order_number)
    if existing_row:
        update_range = f"{settings.GOOGLE_SHEETS_TAB}!A{existing_row}:M{existing_row}"
        sheets.values().update(
            spreadsheetId=settings.GOOGLE_SHEETS_SPREADSHEET_ID,
            range=update_range,
            valueInputOption="RAW",
            body={"values": [row]},
        ).execute()
    else:
        sheets.values().append(
            spreadsheetId=settings.GOOGLE_SHEETS_SPREADSHEET_ID,
            range=f"{settings.GOOGLE_SHEETS_TAB}!A:M",
            valueInputOption="RAW",
            insertDataOption="INSERT_ROWS",
            body={"values": [row]},
        ).execute()


async def sync_order_to_sheet(order_id: int) -> None:
    if not _sheets_enabled():
        return

    async with _sheet_lock:
        async with AsyncSessionLocal() as db:
            result = await db.execute(
                select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
            )
            order = result.scalar_one_or_none()
            if not order:
                return

            agent_name = None
            if order.confirmation_agent_id:
                admin_result = await db.execute(
                    select(AdminUser).where(AdminUser.id == order.confirmation_agent_id)
                )
                admin = admin_result.scalar_one_or_none()
                agent_name = admin.username if admin else None

            row = order_to_sheet_row(order, agent_name, order.internal_notes)

            try:
                sheets = _build_sheets_client()
                if sheets is None:
                    return
                await asyncio.to_thread(_upsert_row, sheets, row, order.order_number)
            except Exception as exc:
                logger.warning(
                    "Google Sheets sync failed for order %s: %s", order_id, exc
                )
