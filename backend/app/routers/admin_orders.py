import csv
import io
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from fastapi.responses import StreamingResponse
from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.database import get_db
from app.models.admin_user import AdminUser
from app.models.order import Order, OrderStatus
from app.schemas.order import (
    OrderAdminResponse,
    OrderListResponse,
    OrderNotesUpdate,
    OrderStatsResponse,
    OrderStatusUpdate,
)

router = APIRouter(prefix="/admin/orders", tags=["admin-orders"])

STATUS_LABELS = {
    "NEW": "جديد",
    "CONTACTED": "تم الاتصال",
    "CONFIRMED": "مؤكد",
    "PREPARING": "تم الاتصال",
    "SHIPPED": "تم الشحن",
    "DELIVERED": "تم التوصيل",
    "CANCELLED": "ملغى",
}


def _normalize_status(status: OrderStatus) -> str:
    if status == OrderStatus.PREPARING:
        return OrderStatus.CONTACTED.value
    return status.value


def _order_to_admin(order: Order) -> OrderAdminResponse:
    return OrderAdminResponse(
        id=order.id,
        order_number=order.order_number,
        customer_name=order.customer_name,
        phone=order.phone,
        address=order.address,
        offer_id=order.offer_id,
        offer_name=order.offer_name,
        quantity=order.quantity,
        unit_price=float(order.unit_price),
        total_price=float(order.total_price),
        status=_normalize_status(order.status),
        internal_notes=order.internal_notes,
        created_at=order.created_at,
        updated_at=order.updated_at,
    )


def _build_filters(
    search: str | None,
    status_filter: str | None,
    date_from: str | None,
    date_to: str | None,
):
    conditions = [Order.deleted_at.is_(None)]

    if search:
        term = f"%{search.strip()}%"
        conditions.append(
            or_(
                Order.customer_name.ilike(term),
                Order.phone.ilike(term),
                Order.order_number.ilike(term),
            )
        )

    if status_filter:
        try:
            status_enum = OrderStatus(status_filter)
            if status_enum == OrderStatus.CONTACTED:
                conditions.append(
                    Order.status.in_([OrderStatus.CONTACTED, OrderStatus.PREPARING])
                )
            else:
                conditions.append(Order.status == status_enum)
        except ValueError:
            pass

    if date_from:
        try:
            dt_from = datetime.fromisoformat(date_from)
            conditions.append(Order.created_at >= dt_from)
        except ValueError:
            pass

    if date_to:
        try:
            dt_to = datetime.fromisoformat(date_to)
            if len(date_to) <= 10:
                dt_to = dt_to.replace(hour=23, minute=59, second=59)
            conditions.append(Order.created_at <= dt_to)
        except ValueError:
            pass

    return and_(*conditions)


@router.get("/stats", response_model=OrderStatsResponse)
async def get_order_stats(
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    today_start = datetime.now(timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    base = Order.deleted_at.is_(None)

    today_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.created_at >= today_start)
    )
    all_orders = await db.scalar(select(func.count(Order.id)).where(base))
    new_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.NEW)
    )
    contacted_orders = await db.scalar(
        select(func.count(Order.id)).where(
            base,
            Order.status.in_([OrderStatus.CONTACTED, OrderStatus.PREPARING]),
        )
    )
    confirmed_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.CONFIRMED)
    )
    shipped_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.SHIPPED)
    )
    delivered_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.DELIVERED)
    )
    cancelled_orders = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.CANCELLED)
    )
    today_sales = await db.scalar(
        select(func.coalesce(func.sum(Order.total_price), 0)).where(
            base, Order.created_at >= today_start, Order.status != OrderStatus.CANCELLED
        )
    )
    total_sales = await db.scalar(
        select(func.coalesce(func.sum(Order.total_price), 0)).where(
            base, Order.status != OrderStatus.CANCELLED
        )
    )

    return OrderStatsResponse(
        today_orders=today_orders or 0,
        all_orders=all_orders or 0,
        new_orders=new_orders or 0,
        contacted_orders=contacted_orders or 0,
        confirmed_orders=confirmed_orders or 0,
        shipped_orders=shipped_orders or 0,
        delivered_orders=delivered_orders or 0,
        cancelled_orders=cancelled_orders or 0,
        today_sales=float(today_sales or 0),
        total_sales=float(total_sales or 0),
    )


@router.get("", response_model=OrderListResponse)
async def list_orders(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: str | None = None,
    status_filter: str | None = Query(None, alias="status"),
    date_from: str | None = None,
    date_to: str | None = None,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    filters = _build_filters(search, status_filter, date_from, date_to)

    total = await db.scalar(select(func.count(Order.id)).where(filters)) or 0
    total_pages = max(1, (total + page_size - 1) // page_size)
    offset = (page - 1) * page_size

    result = await db.execute(
        select(Order)
        .where(filters)
        .order_by(Order.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    orders = result.scalars().all()

    return OrderListResponse(
        items=[_order_to_admin(o) for o in orders],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/export")
async def export_orders(
    search: str | None = None,
    status_filter: str | None = Query(None, alias="status"),
    date_from: str | None = None,
    date_to: str | None = None,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    filters = _build_filters(search, status_filter, date_from, date_to)

    result = await db.execute(
        select(Order).where(filters).order_by(Order.created_at.desc())
    )
    orders = result.scalars().all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        [
            "Order Number",
            "Date",
            "Customer",
            "Phone",
            "Address",
            "Offer",
            "Quantity",
            "Total (MAD)",
            "Status",
            "Notes",
        ]
    )
    for order in orders:
        writer.writerow(
            [
                order.order_number,
                order.created_at.isoformat(),
                order.customer_name,
                order.phone,
                order.address,
                order.offer_name,
                order.quantity,
                float(order.total_price),
                STATUS_LABELS.get(_normalize_status(order.status), order.status.value),
                order.internal_notes or "",
            ]
        )

    output.seek(0)
    filename = f"orders-{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{order_id}", response_model=OrderAdminResponse)
async def get_order(
    order_id: int,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    return _order_to_admin(order)


@router.patch("/{order_id}/status", response_model=OrderAdminResponse)
async def update_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    order.status = OrderStatus(payload.status)
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()
    return _order_to_admin(order)


@router.patch("/{order_id}/notes", response_model=OrderAdminResponse)
async def update_order_notes(
    order_id: int,
    payload: OrderNotesUpdate,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    order.internal_notes = payload.internal_notes
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()
    return _order_to_admin(order)


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(
    order_id: int,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    order.deleted_at = datetime.now(timezone.utc)
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
