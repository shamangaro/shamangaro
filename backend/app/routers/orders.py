from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.order import Order, OrderStatus
from app.schemas.order import OrderCreate, OrderCreateResponse, OrderPublicResponse
from app.services.customer_risk import analyze_customer_risk, get_blacklist_entry
from app.services.offers import get_offer
from app.services.city import extract_city_from_address
from app.services.order_lifecycle import log_order_created
from app.services.order_notifications import enqueue_order_created
from app.services.order_number import generate_order_number

router = APIRouter(prefix="/orders", tags=["orders"])

THANK_YOU_MAX_AGE = timedelta(days=7)


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
    )


@router.post("", response_model=OrderCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: OrderCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    offer = get_offer(payload.offer_id)
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="العرض المحدد غير صالح",
        )

    order_number = await generate_order_number(db)

    blacklist = await get_blacklist_entry(db, payload.phone)
    is_risk = blacklist is not None
    if not is_risk:
        analysis = await analyze_customer_risk(
            db, payload.phone, payload.customer_name, payload.address
        )
        is_risk = (
            analysis.is_blacklisted
            or analysis.trust_label == "high_risk"
            or len(analysis.warnings) > 0
        )

    order = Order(
        order_number=order_number,
        customer_name=payload.customer_name,
        phone=payload.phone,
        address=payload.address,
        city=extract_city_from_address(payload.address),
        offer_id=offer.id,
        offer_name=offer.name,
        quantity=offer.quantity,
        unit_price=offer.unit_price,
        total_price=offer.total_price,
        status=OrderStatus.NEW,
        is_risk=is_risk,
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
