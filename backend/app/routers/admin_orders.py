import csv
import io
from datetime import datetime, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, Response, status
from fastapi.responses import StreamingResponse
from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.database import get_db
from app.models.admin_user import AdminUser
from app.models.order import Order, OrderStatus
from app.schemas.order import (
    CustomerHistoryResponse,
    OrderAdminDetailResponse,
    OrderAdminResponse,
    OrderCallCreate,
    OrderCallResponse,
    OrderListResponse,
    OrderNoteCreate,
    OrderNoteResponse,
    OrderNotesUpdate,
    OrderRiskResponse,
    OrderStatsResponse,
    OrderStatusUpdate,
    OrderTimelineEvent,
)
from app.services.analytics import get_analytics, get_extended_stats
from app.services.customer_risk import analyze_customer_risk, count_customers_by_trust
from app.services.order_lifecycle import (
    STATUS_LABELS,
    add_order_note,
    change_order_status,
    get_order_calls,
    get_order_notes,
    get_order_timeline,
    log_order_call,
    public_status,
)
from app.services.order_notifications import enqueue_status_side_effects

router = APIRouter(prefix="/admin/orders", tags=["admin-orders"])

SORTABLE_COLUMNS = {
    "created_at": Order.created_at,
    "customer_name": Order.customer_name,
    "total_price": Order.total_price,
    "status": Order.status,
    "city": Order.city,
}


def _normalize_status(status: OrderStatus) -> str:
    return public_status(status)


async def _agent_name(db: AsyncSession, order: Order) -> str | None:
    if not order.confirmation_agent_id:
        return None
    result = await db.execute(
        select(AdminUser.username).where(AdminUser.id == order.confirmation_agent_id)
    )
    return result.scalar_one_or_none()


def _order_to_admin(order: Order, agent: str | None = None) -> OrderAdminResponse:
    return OrderAdminResponse(
        id=order.id,
        order_number=order.order_number,
        customer_name=order.customer_name,
        phone=order.phone,
        address=order.address,
        city=order.city,
        offer_id=order.offer_id,
        offer_name=order.offer_name,
        quantity=order.quantity,
        unit_price=float(order.unit_price),
        total_price=float(order.total_price),
        status=_normalize_status(order.status),
        internal_notes=order.internal_notes,
        is_risk=order.is_risk,
        confirmation_agent=agent,
        created_at=order.created_at,
        updated_at=order.updated_at,
    )


async def _build_risk_response(order: Order, db: AsyncSession) -> OrderRiskResponse:
    analysis = await analyze_customer_risk(
        db,
        order.phone,
        order.customer_name,
        order.address,
        exclude_order_id=order.id,
    )
    all_history = await analyze_customer_risk(
        db, order.phone, order.customer_name, order.address
    )
    return OrderRiskResponse(
        trust_score=analysis.trust_score,
        trust_label=analysis.trust_label,
        trust_display=analysis.trust_display,
        warnings=analysis.warnings,
        is_blacklisted=analysis.is_blacklisted,
        blacklist_reason=analysis.blacklist_reason,
        history=CustomerHistoryResponse(
            total_orders=all_history.history.total_orders,
            delivered_count=all_history.history.delivered_count,
            cancelled_count=all_history.history.cancelled_count,
            confirmed_count=all_history.history.confirmed_count,
            last_order_date=all_history.history.last_order_date,
        ),
    )


def _build_filters(
    search: str | None,
    status_filter: str | None,
    date_from: str | None,
    date_to: str | None,
    confirmation_queue: bool = False,
    archived: bool = False,
):
    conditions = [
        Order.deleted_at.isnot(None) if archived else Order.deleted_at.is_(None)
    ]

    if confirmation_queue:
        conditions.append(
            Order.status.in_(
                [
                    OrderStatus.NEW,
                    OrderStatus.WAITING_CONFIRMATION,
                    OrderStatus.CONTACTED,
                    OrderStatus.PREPARING,
                    OrderStatus.NO_ANSWER,
                    OrderStatus.CALLBACK,
                ]
            )
        )

    if search:
        term = f"%{search.strip()}%"
        conditions.append(
            or_(
                Order.customer_name.ilike(term),
                Order.phone.ilike(term),
                Order.order_number.ilike(term),
                Order.city.ilike(term),
                Order.address.ilike(term),
            )
        )

    if status_filter:
        try:
            status_enum = OrderStatus(status_filter)
            if status_enum == OrderStatus.WAITING_CONFIRMATION:
                conditions.append(
                    Order.status.in_(
                        [
                            OrderStatus.WAITING_CONFIRMATION,
                            OrderStatus.CONTACTED,
                            OrderStatus.PREPARING,
                        ]
                    )
                )
            elif status_enum == OrderStatus.CONTACTED:
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
    extended = await get_extended_stats(db)
    trust_counts = await count_customers_by_trust(db)
    total_sales = float(
        await db.scalar(
            select(func.coalesce(func.sum(Order.total_price), 0)).where(
                Order.deleted_at.is_(None), Order.status != OrderStatus.CANCELLED
            )
        )
        or 0
    )

    return OrderStatsResponse(
        today_orders=extended["today_orders"],
        all_orders=extended["all_orders"],
        new_orders=extended["new_orders"],
        waiting_confirmation_orders=extended["waiting_confirmation_orders"],
        contacted_orders=extended["waiting_confirmation_orders"],
        confirmed_orders=extended["confirmed_orders"],
        packed_orders=extended["packed_orders"],
        shipped_orders=extended["shipped_orders"],
        delivered_orders=extended["delivered_orders"],
        cancelled_orders=extended["cancelled_orders"],
        no_answer_orders=extended["no_answer_orders"],
        callback_orders=extended["callback_orders"],
        today_sales=extended["today_sales"],
        week_sales=extended["week_sales"],
        month_sales=extended["month_sales"],
        total_sales=total_sales,
        trusted_customers=trust_counts["trusted_customers"],
        warning_customers=trust_counts["warning_customers"],
        high_risk_customers=trust_counts["high_risk_customers"],
        blacklisted_customers=trust_counts["blacklisted_customers"],
    )


@router.get("/analytics")
async def analytics(
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    return await get_analytics(db)


@router.get("", response_model=OrderListResponse)
async def list_orders(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: str | None = None,
    status_filter: str | None = Query(None, alias="status"),
    date_from: str | None = None,
    date_to: str | None = None,
    confirmation_queue: bool = False,
    archived: bool = Query(False),
    sort_by: str = Query("created_at"),
    sort_dir: str = Query("desc"),
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    filters = _build_filters(
        search, status_filter, date_from, date_to, confirmation_queue, archived
    )

    total = await db.scalar(select(func.count(Order.id)).where(filters)) or 0
    total_pages = max(1, (total + page_size - 1) // page_size)
    offset = (page - 1) * page_size

    sort_column = SORTABLE_COLUMNS.get(sort_by, Order.created_at)
    order_clause = sort_column.desc() if sort_dir.lower() == "desc" else sort_column.asc()

    result = await db.execute(
        select(Order).where(filters).order_by(order_clause).offset(offset).limit(page_size)
    )
    orders = result.scalars().all()
    items = []
    for order in orders:
        agent = await _agent_name(db, order)
        items.append(_order_to_admin(order, agent))

    return OrderListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


async def _fetch_orders_for_export(db: AsyncSession, filters):
    result = await db.execute(
        select(Order).where(filters).order_by(Order.created_at.desc())
    )
    return result.scalars().all()


def _export_headers():
    return [
        "Order ID",
        "Date",
        "Customer Name",
        "Phone",
        "City",
        "Address",
        "Quantity",
        "Unit Price",
        "Total",
        "Status",
        "Confirmation Agent",
        "Notes",
        "Last Update",
    ]


async def _export_rows(db: AsyncSession, orders: list[Order]):
    rows = []
    for order in orders:
        agent = await _agent_name(db, order)
        rows.append(
            [
                order.order_number,
                order.created_at.isoformat() if order.created_at else "",
                order.customer_name,
                order.phone,
                order.city or "",
                order.address,
                order.quantity,
                float(order.unit_price),
                float(order.total_price),
                STATUS_LABELS.get(_normalize_status(order.status), order.status.value),
                agent or "",
                order.internal_notes or "",
                order.updated_at.isoformat() if order.updated_at else "",
            ]
        )
    return rows


@router.get("/export")
async def export_orders(
    search: str | None = None,
    status_filter: str | None = Query(None, alias="status"),
    date_from: str | None = None,
    date_to: str | None = None,
    format: str = Query("csv", alias="format"),
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    filters = _build_filters(search, status_filter, date_from, date_to)
    orders = await _fetch_orders_for_export(db, filters)
    headers = _export_headers()
    rows = await _export_rows(db, orders)

    if format == "xlsx":
        from openpyxl import Workbook

        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "Orders"
        sheet.append(headers)
        for row in rows:
            sheet.append(row)
        output = io.BytesIO()
        workbook.save(output)
        output.seek(0)
        filename = f"orders-{datetime.now(timezone.utc).strftime('%Y%m%d')}.xlsx"
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )

    if format == "pdf":
        from reportlab.lib.pagesizes import A4
        from reportlab.pdfgen import canvas

        output = io.BytesIO()
        pdf = canvas.Canvas(output, pagesize=A4)
        pdf.setFont("Helvetica", 10)
        y = 800
        pdf.drawString(40, y, "SHAMANGARO Orders Export")
        y -= 24
        for order in orders[:100]:
            line = f"{order.order_number} | {order.customer_name} | {float(order.total_price)} MAD"
            pdf.drawString(40, y, line[:110])
            y -= 14
            if y < 60:
                pdf.showPage()
                y = 800
        pdf.save()
        output.seek(0)
        filename = f"orders-{datetime.now(timezone.utc).strftime('%Y%m%d')}.pdf"
        return StreamingResponse(
            output,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(headers)
    writer.writerows(rows)
    output.seek(0)
    filename = f"orders-{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{order_id}", response_model=OrderAdminDetailResponse)
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

    agent = await _agent_name(db, order)
    base = _order_to_admin(order, agent)
    risk = await _build_risk_response(order, db)
    timeline = [
        OrderTimelineEvent.model_validate(event)
        for event in await get_order_timeline(db, order.id)
    ]
    notes = [
        OrderNoteResponse.model_validate(note)
        for note in await get_order_notes(db, order.id)
    ]
    calls = [
        OrderCallResponse.model_validate(call)
        for call in await get_order_calls(db, order.id)
    ]
    return OrderAdminDetailResponse(
        **base.model_dump(),
        risk=risk,
        timeline=timeline,
        notes=notes,
        calls=calls,
    )


@router.patch("/{order_id}/status", response_model=OrderAdminResponse)
async def update_order_status(
    order_id: int,
    payload: OrderStatusUpdate,
    background_tasks: BackgroundTasks,
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    await change_order_status(db, order, OrderStatus(payload.status), admin)
    enqueue_status_side_effects(order.id, background_tasks)
    agent = await _agent_name(db, order)
    return _order_to_admin(order, agent)


@router.patch("/{order_id}/notes", response_model=OrderAdminResponse)
async def update_order_notes(
    order_id: int,
    payload: OrderNotesUpdate,
    background_tasks: BackgroundTasks,
    admin: AdminUser = Depends(get_current_admin),
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
    enqueue_status_side_effects(order.id, background_tasks)
    agent = await _agent_name(db, order)
    return _order_to_admin(order, agent)


@router.post("/{order_id}/notes", response_model=OrderNoteResponse)
async def create_order_note(
    order_id: int,
    payload: OrderNoteCreate,
    background_tasks: BackgroundTasks,
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    note = await add_order_note(db, order, payload.body, admin)
    enqueue_status_side_effects(order.id, background_tasks)
    return OrderNoteResponse.model_validate(note)


@router.post("/{order_id}/calls", response_model=OrderCallResponse)
async def create_order_call(
    order_id: int,
    payload: OrderCallCreate,
    background_tasks: BackgroundTasks,
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.is_(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    call = await log_order_call(db, order, payload.outcome, payload.notes, admin)

    if payload.outcome == "no_answer":
        await change_order_status(db, order, OrderStatus.NO_ANSWER, admin)
    elif payload.outcome == "callback":
        await change_order_status(db, order, OrderStatus.CALLBACK, admin)
    elif payload.outcome == "confirmed":
        await change_order_status(db, order, OrderStatus.CONFIRMED, admin)
    elif payload.outcome == "answered":
        await change_order_status(db, order, OrderStatus.WAITING_CONFIRMATION, admin)

    enqueue_status_side_effects(order.id, background_tasks)
    return OrderCallResponse.model_validate(call)


@router.post("/{order_id}/archive", status_code=status.HTTP_204_NO_CONTENT)
async def archive_order(
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


@router.post("/{order_id}/restore", status_code=status.HTTP_204_NO_CONTENT)
async def restore_order(
    order_id: int,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.isnot(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود في الأرشيف")

    order.deleted_at = None
    order.updated_at = datetime.now(timezone.utc)
    await db.flush()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def permanently_delete_order(
    order_id: int,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Order).where(Order.id == order_id, Order.deleted_at.isnot(None))
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(
            status_code=404,
            detail="الطلب غير موجود في الأرشيف — لا يمكن الحذف النهائي",
        )

    await db.delete(order)
    await db.flush()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
