from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.order import Order, OrderStatus
from app.schemas.order import (
    OrderCreate,
    OrderCreateResponse,
    OrderPublicResponse,
    WatchLineItemPublic,
)
from app.services.customer_risk import analyze_customer_risk, get_blacklist_entry
from app.services.offers import get_offer
from app.services.products import resolve_watches_multi_order, resolve_watches_order
from app.services.city import extract_city_from_address
from app.services.order_lifecycle import log_order_created
from app.services.order_notifications import enqueue_order_created
from app.services.order_number import generate_order_number
from app.services.watch_line_items import (
    WatchLineItemData,
    merge_internal_notes,
    parse_line_items,
    serialize_line_items,
)

router = APIRouter(prefix="/orders", tags=["orders"])

THANK_YOU_MAX_AGE = timedelta(days=7)


def _line_items_to_public(order: Order) -> list[WatchLineItemPublic] | None:
    parsed = parse_line_items(order.internal_notes)
    if not parsed:
        return None
    return [WatchLineItemPublic(**item) for item in parsed]


def _order_to_public(order: Order) -> OrderPublicResponse:
    return OrderPublicResponse(
        order_number=order.order_number,
        customer_name=order.customer_name,
        phone=order.phone,
        offer_name=order.offer_name,
        quantity=order.quantity,
        total_price=float(order.total_price),
        status=order.status.value,
        created_at=order.created_at,
        line_items=_line_items_to_public(order),
    )


@router.post("", response_model=OrderCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: OrderCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    order_number = await generate_order_number(db)

    blacklist = await get_blacklist_entry(db, payload.phone)
    is_risk = blacklist is not None
    if not is_risk:
        risk_address = payload.address or payload.city or ""
        analysis = await analyze_customer_risk(
            db, payload.phone, payload.customer_name, risk_address
        )
        is_risk = (
            analysis.is_blacklisted
            or analysis.trust_label == "high_risk"
            or len(analysis.warnings) > 0
        )

    internal_notes: str | None = None

    if payload.offer_id:
        offer = get_offer(payload.offer_id)
        if not offer:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="العرض المحدد غير صالح",
            )
        offer_id = offer.id
        offer_name = offer.name
        quantity = offer.quantity
        unit_price = offer.unit_price
        total_price = offer.total_price
    elif payload.line_items:
        try:
            product_order = resolve_watches_multi_order(
                line_items=[
                    {"variant_id": item.variant_id, "quantity": item.quantity}
                    for item in payload.line_items
                ],
                source_page=payload.source_page,
            )
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(exc),
            ) from exc
        offer_id = product_order.offer_id
        offer_name = product_order.offer_name
        quantity = product_order.quantity
        unit_price = product_order.unit_price
        total_price = product_order.total_price
        watches_city = (payload.city or "").strip()
        address_pending = not payload.address or payload.address.strip() == watches_city
        line_items_note = serialize_line_items(
            [
                WatchLineItemData(
                    variant_id=item.variant_id,
                    variant_label=item.variant_label,
                    quantity=item.quantity,
                    image=item.image or None,
                )
                for item in product_order.line_items
            ]
        )
        internal_notes = merge_internal_notes(
            f"product_slug={payload.product_slug}",
            line_items_note,
            f"source_page={product_order.source_page}",
            "address_pending_call=1" if address_pending else None,
        )
    else:
        try:
            product_order = resolve_watches_order(
                selected_variant=payload.selected_variant or "",
                quantity=payload.quantity or 1,
                source_page=payload.source_page,
            )
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(exc),
            ) from exc
        offer_id = product_order.offer_id
        offer_name = product_order.offer_name
        quantity = product_order.quantity
        unit_price = product_order.unit_price
        total_price = product_order.total_price
        watches_city = (payload.city or "").strip()
        address_pending = not payload.address or payload.address.strip() == watches_city
        line_items_note = serialize_line_items(
            [
                WatchLineItemData(
                    variant_id=item.variant_id,
                    variant_label=item.variant_label,
                    quantity=item.quantity,
                    image=item.image or None,
                )
                for item in product_order.line_items
            ]
        )
        internal_notes = merge_internal_notes(
            f"product_slug={payload.product_slug}",
            f"variant={product_order.selected_variant}",
            line_items_note,
            f"source_page={product_order.source_page}",
            "address_pending_call=1" if address_pending else None,
        )

    stored_address = (payload.address or "").strip()
    stored_city = (payload.city or "").strip() or extract_city_from_address(stored_address)

    order = Order(
        order_number=order_number,
        customer_name=payload.customer_name,
        phone=payload.phone,
        address=stored_address,
        city=stored_city,
        offer_id=offer_id,
        offer_name=offer_name,
        quantity=quantity,
        unit_price=unit_price,
        total_price=total_price,
        status=OrderStatus.NEW,
        is_risk=is_risk,
        internal_notes=internal_notes,
    )
    db.add(order)
    await db.flush()
    await log_order_created(db, order)
    enqueue_order_created(order.id, background_tasks)

    return OrderCreateResponse(
        order_number=order.order_number,
        total_price=float(order.total_price),
    )


@router.get("/{order_number}", response_model=OrderPublicResponse)
async def get_order_public(order_number: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Order).where(
            Order.order_number == order_number,
            Order.deleted_at.is_(None),
        )
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="الطلب غير موجود",
        )

    cutoff = datetime.now(timezone.utc) - THANK_YOU_MAX_AGE
    created = order.created_at
    if created.tzinfo is None:
        created = created.replace(tzinfo=timezone.utc)

    if created < cutoff:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="الطلب غير متاح",
        )

    return _order_to_public(order)
