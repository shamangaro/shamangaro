import logging
from datetime import datetime, timezone

import httpx
from fastapi import BackgroundTasks
from sqlalchemy import select

from app.config import settings
from app.database import AsyncSessionLocal
from app.models.order import Order
from app.services.order_lifecycle import STATUS_LABELS, public_status

logger = logging.getLogger(__name__)

_pending_new_orders: list[dict] = []


def mark_notification_seen() -> None:
    pass


def queue_new_order_notification(order: Order) -> None:
    global _pending_new_orders
    payload = {
        "order_id": order.id,
        "order_number": order.order_number,
        "customer_name": order.customer_name,
        "offer_id": order.offer_id,
        "offer_name": order.offer_name,
        "total_price": float(order.total_price),
        "created_at": order.created_at.isoformat()
        if order.created_at
        else datetime.now(timezone.utc).isoformat(),
    }
    _pending_new_orders.append(payload)
    if len(_pending_new_orders) > 50:
        _pending_new_orders = _pending_new_orders[-50:]


def drain_pending_notifications(since: datetime | None) -> list[dict]:
    global _pending_new_orders
    if since is None:
        drained = list(_pending_new_orders)
        _pending_new_orders = []
        return drained

    kept: list[dict] = []
    drained: list[dict] = []
    for item in _pending_new_orders:
        created = datetime.fromisoformat(item["created_at"])
        if created.tzinfo is None:
            created = created.replace(tzinfo=timezone.utc)
        if created > since:
            drained.append(item)
        else:
            kept.append(item)
    _pending_new_orders = kept
    return drained


async def send_admin_new_order_email(order: Order) -> None:
    if not settings.RESEND_API_KEY or not settings.ADMIN_NOTIFY_EMAIL:
        return

    subject = f"طلب جديد — {order.order_number}"
    html = (
        f"<h2>طلب جديد على SHAMANGARO</h2>"
        f"<p><strong>رقم الطلب:</strong> {order.order_number}</p>"
        f"<p><strong>الزبون:</strong> {order.customer_name}</p>"
        f"<p><strong>الهاتف:</strong> {order.phone}</p>"
        f"<p><strong>المدينة:</strong> {order.city or '—'}</p>"
        f"<p><strong>المبلغ:</strong> {float(order.total_price)} د.م</p>"
    )

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": settings.RESEND_FROM_EMAIL,
                    "to": [settings.ADMIN_NOTIFY_EMAIL],
                    "subject": subject,
                    "html": html,
                },
            )
            if response.status_code >= 400:
                logger.warning("Admin email failed: %s", response.text)
    except Exception as exc:
        logger.warning("Admin email error: %s", exc)


async def run_order_created_hooks(order_id: int) -> None:
    """Runs after DB commit via BackgroundTasks."""
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
        )
        order = result.scalar_one_or_none()
        if not order:
            return
        queue_new_order_notification(order)
        await send_admin_new_order_email(order)

    from app.services.google_sheets import sync_order_to_sheet

    await sync_order_to_sheet(order_id)


async def run_status_side_effects(order_id: int) -> None:
    """Runs after DB commit via BackgroundTasks."""
    from app.services.google_sheets import sync_order_to_sheet

    await sync_order_to_sheet(order_id)


def enqueue_order_created(order_id: int, background_tasks: BackgroundTasks) -> None:
    background_tasks.add_task(run_order_created_hooks, order_id)


def enqueue_status_side_effects(
    order_id: int, background_tasks: BackgroundTasks
) -> None:
    background_tasks.add_task(run_status_side_effects, order_id)


def order_to_sheet_row(order: Order, agent_name: str | None, notes: str | None) -> list[str]:
    return [
        order.order_number,
        order.created_at.isoformat() if order.created_at else "",
        order.customer_name,
        order.phone,
        order.city or "",
        order.address,
        str(order.quantity),
        str(float(order.unit_price)),
        str(float(order.total_price)),
        STATUS_LABELS.get(public_status(order.status), public_status(order.status)),
        agent_name or "",
        notes or order.internal_notes or "",
        order.updated_at.isoformat() if order.updated_at else "",
    ]
