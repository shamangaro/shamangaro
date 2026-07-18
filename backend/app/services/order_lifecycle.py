from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.admin_user import AdminUser
from app.models.order import Order, OrderCall, OrderNote, OrderStatus, OrderStatusEvent


def normalize_status_value(status: OrderStatus | str) -> str:
    value = status.value if isinstance(status, OrderStatus) else status
    if value == OrderStatus.PREPARING.value:
        return OrderStatus.CONTACTED.value
    return value


def public_status(status: OrderStatus | str) -> str:
    value = normalize_status_value(status)
    if value == OrderStatus.CONTACTED.value:
        return OrderStatus.WAITING_CONFIRMATION.value
    return value


STATUS_LABELS = {
    "NEW": "جديد",
    "WAITING_CONFIRMATION": "في انتظار التأكيد",
    "CONTACTED": "في انتظار التأكيد",
    "CONFIRMED": "مؤكد",
    "PACKED": "تم التغليف",
    "SHIPPED": "تم الشحن",
    "DELIVERED": "تم التوصيل",
    "CANCELLED": "ملغى",
    "NO_ANSWER": "لا رد",
    "CALLBACK": "اتصل لاحقاً",
    "PREPARING": "في انتظار التأكيد",
}


async def record_event(
    db: AsyncSession,
    order: Order,
    *,
    event_type: str,
    status: str | None = None,
    note: str | None = None,
    admin: AdminUser | None = None,
) -> OrderStatusEvent:
    event = OrderStatusEvent(
        order_id=order.id,
        event_type=event_type,
        status=status,
        note=note,
        admin_id=admin.id if admin else None,
        admin_username=admin.username if admin else None,
    )
    db.add(event)
    await db.flush()
    return event


async def log_order_created(db: AsyncSession, order: Order) -> OrderStatusEvent:
    return await record_event(
        db,
        order,
        event_type="ORDER_CREATED",
        status=public_status(order.status),
        note="تم إنشاء الطلب",
    )


async def change_order_status(
    db: AsyncSession,
    order: Order,
    new_status: OrderStatus,
    admin: AdminUser | None = None,
) -> OrderStatusEvent:
    previous = public_status(order.status)
    order.status = new_status
    order.updated_at = datetime.now(timezone.utc)

    if new_status in {
        OrderStatus.CONFIRMED,
        OrderStatus.WAITING_CONFIRMATION,
        OrderStatus.CONTACTED,
        OrderStatus.NO_ANSWER,
        OrderStatus.CALLBACK,
    } and admin is not None:
        order.confirmation_agent_id = admin.id

    next_status = public_status(new_status)
    return await record_event(
        db,
        order,
        event_type="STATUS_CHANGE",
        status=next_status,
        note=f"من {STATUS_LABELS.get(previous, previous)} إلى {STATUS_LABELS.get(next_status, next_status)}",
        admin=admin,
    )


async def add_order_note(
    db: AsyncSession,
    order: Order,
    body: str,
    admin: AdminUser,
) -> OrderNote:
    note = OrderNote(
        order_id=order.id,
        body=body.strip(),
        admin_id=admin.id,
        admin_username=admin.username,
    )
    db.add(note)
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()

    await record_event(
        db,
        order,
        event_type="NOTE",
        note=body.strip(),
        admin=admin,
    )
    return note


async def log_order_call(
    db: AsyncSession,
    order: Order,
    outcome: str,
    notes: str | None,
    admin: AdminUser,
) -> OrderCall:
    call = OrderCall(
        order_id=order.id,
        outcome=outcome,
        notes=notes.strip() if notes else None,
        admin_id=admin.id,
        admin_username=admin.username,
    )
    db.add(call)
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()

    await record_event(
        db,
        order,
        event_type="CALL",
        note=notes.strip() if notes else outcome,
        admin=admin,
    )
    return call


async def get_order_timeline(db: AsyncSession, order_id: int) -> list[OrderStatusEvent]:
    result = await db.execute(
        select(OrderStatusEvent)
        .where(OrderStatusEvent.order_id == order_id)
        .order_by(OrderStatusEvent.created_at.asc())
    )
    return list(result.scalars().all())


async def get_order_notes(db: AsyncSession, order_id: int) -> list[OrderNote]:
    result = await db.execute(
        select(OrderNote)
        .where(OrderNote.order_id == order_id)
        .order_by(OrderNote.created_at.desc())
    )
    return list(result.scalars().all())


async def get_order_calls(db: AsyncSession, order_id: int) -> list[OrderCall]:
    result = await db.execute(
        select(OrderCall)
        .where(OrderCall.order_id == order_id)
        .order_by(OrderCall.created_at.desc())
    )
    return list(result.scalars().all())
