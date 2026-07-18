from datetime import datetime, timedelta, timezone

from sqlalchemy import and_, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order, OrderStatus


def _active_orders_filter():
    return and_(Order.deleted_at.is_(None), Order.status != OrderStatus.CANCELLED)


async def get_analytics(db: AsyncSession) -> dict:
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = today_start.replace(day=1)

    base = Order.deleted_at.is_(None)
    active = _active_orders_filter()

    today_revenue = float(
        await db.scalar(
            select(func.coalesce(func.sum(Order.total_price), 0)).where(
                active, Order.created_at >= today_start
            )
        )
        or 0
    )
    week_revenue = float(
        await db.scalar(
            select(func.coalesce(func.sum(Order.total_price), 0)).where(
                active, Order.created_at >= week_start
            )
        )
        or 0
    )
    month_revenue = float(
        await db.scalar(
            select(func.coalesce(func.sum(Order.total_price), 0)).where(
                active, Order.created_at >= month_start
            )
        )
        or 0
    )

    total_orders = await db.scalar(select(func.count(Order.id)).where(base)) or 0
    delivered = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.DELIVERED)
    ) or 0
    cancelled = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.CANCELLED)
    ) or 0
    confirmed = await db.scalar(
        select(func.count(Order.id)).where(base, Order.status == OrderStatus.CONFIRMED)
    ) or 0

    avg_basket = float(
        await db.scalar(
            select(func.coalesce(func.avg(Order.total_price), 0)).where(active)
        )
        or 0
    )

    city_rows = await db.execute(
        select(Order.city, func.count(Order.id))
        .where(base, Order.city.is_not(None), Order.city != "")
        .group_by(Order.city)
        .order_by(func.count(Order.id).desc())
        .limit(10)
    )
    orders_by_city = [
        {"city": row[0], "count": row[1]} for row in city_rows.all() if row[0]
    ]

    day_rows = await db.execute(
        select(
            func.date(Order.created_at).label("day"),
            func.coalesce(func.sum(Order.total_price), 0),
            func.count(Order.id),
        )
        .where(active, Order.created_at >= now - timedelta(days=30))
        .group_by(func.date(Order.created_at))
        .order_by(func.date(Order.created_at))
    )
    revenue_by_day = [
        {"date": str(row[0]), "revenue": float(row[1]), "orders": row[2]}
        for row in day_rows.all()
    ]

    month_rows = await db.execute(
        select(Order.created_at, Order.total_price)
        .where(active, Order.created_at >= now - timedelta(days=365))
        .order_by(Order.created_at)
    )
    month_map: dict[str, dict[str, float | int]] = {}
    for created_at, total_price in month_rows.all():
        if not created_at:
            continue
        key = created_at.strftime("%Y-%m")
        bucket = month_map.setdefault(key, {"revenue": 0.0, "orders": 0})
        bucket["revenue"] = float(bucket["revenue"]) + float(total_price)
        bucket["orders"] = int(bucket["orders"]) + 1
    revenue_by_month = [
        {"month": month, "revenue": values["revenue"], "orders": values["orders"]}
        for month, values in sorted(month_map.items())
    ]

    conversion_rate = round((confirmed / total_orders) * 100, 1) if total_orders else 0
    delivered_rate = round((delivered / total_orders) * 100, 1) if total_orders else 0
    cancelled_rate = round((cancelled / total_orders) * 100, 1) if total_orders else 0

    return {
        "today_revenue": today_revenue,
        "week_revenue": week_revenue,
        "month_revenue": month_revenue,
        "orders_by_city": orders_by_city,
        "revenue_by_day": revenue_by_day,
        "revenue_by_month": revenue_by_month,
        "conversion_rate": conversion_rate,
        "delivered_rate": delivered_rate,
        "cancelled_rate": cancelled_rate,
        "average_basket": round(avg_basket, 2),
    }


async def get_extended_stats(db: AsyncSession) -> dict:
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = today_start.replace(day=1)
    base = Order.deleted_at.is_(None)
    active = _active_orders_filter()

    waiting_statuses = [
        OrderStatus.WAITING_CONFIRMATION,
        OrderStatus.CONTACTED,
        OrderStatus.PREPARING,
    ]

    async def count_status(*statuses: OrderStatus) -> int:
        return (
            await db.scalar(
                select(func.count(Order.id)).where(base, Order.status.in_(statuses))
            )
            or 0
        )

    return {
        "today_orders": await db.scalar(
            select(func.count(Order.id)).where(base, Order.created_at >= today_start)
        )
        or 0,
        "waiting_confirmation_orders": await count_status(*waiting_statuses),
        "confirmed_orders": await count_status(OrderStatus.CONFIRMED),
        "packed_orders": await count_status(OrderStatus.PACKED),
        "shipped_orders": await count_status(OrderStatus.SHIPPED),
        "delivered_orders": await count_status(OrderStatus.DELIVERED),
        "cancelled_orders": await count_status(OrderStatus.CANCELLED),
        "no_answer_orders": await count_status(OrderStatus.NO_ANSWER),
        "callback_orders": await count_status(OrderStatus.CALLBACK),
        "new_orders": await count_status(OrderStatus.NEW),
        "today_sales": float(
            await db.scalar(
                select(func.coalesce(func.sum(Order.total_price), 0)).where(
                    active, Order.created_at >= today_start
                )
            )
            or 0
        ),
        "week_sales": float(
            await db.scalar(
                select(func.coalesce(func.sum(Order.total_price), 0)).where(
                    active, Order.created_at >= week_start
                )
            )
            or 0
        ),
        "month_sales": float(
            await db.scalar(
                select(func.coalesce(func.sum(Order.total_price), 0)).where(
                    active, Order.created_at >= month_start
                )
            )
            or 0
        ),
        "all_orders": await db.scalar(select(func.count(Order.id)).where(base)) or 0,
    }
