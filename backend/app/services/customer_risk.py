"""Fake order detection and customer trust scoring."""

from dataclasses import dataclass, field
from datetime import datetime

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.blacklist import BlacklistCustomer
from app.models.order import Order, OrderStatus

DELIVERED_STATUSES = {OrderStatus.DELIVERED}
CANCELLED_STATUSES = {OrderStatus.CANCELLED}
CONFIRMED_STATUSES = {OrderStatus.CONFIRMED, OrderStatus.SHIPPED, OrderStatus.DELIVERED}


@dataclass
class CustomerHistory:
    total_orders: int = 0
    delivered_count: int = 0
    cancelled_count: int = 0
    confirmed_count: int = 0
    last_order_date: datetime | None = None
    related_order_ids: list[int] = field(default_factory=list)


@dataclass
class RiskAnalysis:
    trust_score: int
    trust_label: str
    trust_display: str
    warnings: list[str]
    is_blacklisted: bool
    blacklist_reason: str | None
    history: CustomerHistory


def _normalize_text(value: str) -> str:
    return " ".join(value.strip().lower().split())


async def _fetch_related_orders(
    db: AsyncSession,
    phone: str,
    name: str,
    address: str,
    exclude_order_id: int | None = None,
) -> list[Order]:
    normalized_name = _normalize_text(name)
    normalized_address = _normalize_text(address)

    conditions = [
        Order.deleted_at.is_(None),
        or_(
            Order.phone == phone,
            func.lower(Order.customer_name) == normalized_name,
        ),
    ]

    result = await db.execute(select(Order).where(*conditions))
    orders = list(result.scalars().all())

    if len(normalized_address) >= 8:
        address_result = await db.execute(
            select(Order).where(
                Order.deleted_at.is_(None),
                func.lower(Order.address).contains(normalized_address[:40]),
            )
        )
        address_matches = list(address_result.scalars().all())
        seen_ids = {o.id for o in orders}
        for order in address_matches:
            if order.id not in seen_ids:
                orders.append(order)

    if exclude_order_id is not None:
        orders = [o for o in orders if o.id != exclude_order_id]

    return orders


def _build_history(orders: list[Order]) -> CustomerHistory:
    if not orders:
        return CustomerHistory()

    delivered = sum(1 for o in orders if o.status in DELIVERED_STATUSES)
    cancelled = sum(1 for o in orders if o.status in CANCELLED_STATUSES)
    confirmed = sum(1 for o in orders if o.status in CONFIRMED_STATUSES)
    last_date = max(o.created_at for o in orders)

    return CustomerHistory(
        total_orders=len(orders),
        delivered_count=delivered,
        cancelled_count=cancelled,
        confirmed_count=confirmed,
        last_order_date=last_date,
        related_order_ids=[o.id for o in orders],
    )


def _detect_warnings(
    phone: str,
    name: str,
    address: str,
    phone_orders: list[Order],
    address_orders: list[Order],
) -> list[str]:
    warnings: list[str] = []

    cancelled_on_phone = sum(
        1 for o in phone_orders if o.status in CANCELLED_STATUSES
    )
    if cancelled_on_phone >= 2:
        warnings.append("نفس رقم الهاتف لديه طلبين ملغيين أو أكثر")

    delivered_on_phone = sum(
        1 for o in phone_orders if o.status in DELIVERED_STATUSES
    )
    if len(phone_orders) >= 3 and delivered_on_phone == 0:
        warnings.append("نفس رقم الهاتف لديه 3 طلبات أو أكثر بدون أي توصيل")

    address_phones = {o.phone for o in address_orders}
    if len(address_orders) >= 2 and len(address_phones) >= 2:
        warnings.append("نفس العنوان مستخدم مع أرقام هواتف مختلفة")

    phone_names = {
        _normalize_text(o.customer_name) for o in phone_orders if o.customer_name
    }
    if len(phone_orders) >= 2 and len(phone_names) >= 2:
        warnings.append("نفس رقم الهاتف مستخدم بأسماء مختلفة")

    return warnings


def calculate_trust_score(
    history: CustomerHistory,
    is_blacklisted: bool,
    warnings: list[str],
) -> int:
    if is_blacklisted:
        return 0

    score = 80

    if history.delivered_count > history.cancelled_count:
        score = 92
    elif history.delivered_count > 0 and history.cancelled_count == 0:
        score = 90
    elif history.cancelled_count > 2:
        score = 20
    elif history.cancelled_count == 2:
        score = 35
    elif history.cancelled_count == 1:
        score = 60
    elif history.total_orders >= 3 and history.delivered_count == 0:
        score = 25

    if len(warnings) >= 2:
        score = min(score, 30)
    elif len(warnings) == 1:
        score = min(score, 50)

    return max(0, min(100, score))


def trust_label_from_score(score: int, is_blacklisted: bool) -> tuple[str, str]:
    if is_blacklisted or score == 0:
        return "high_risk", "🔴 High Risk"
    if score >= 80:
        return "trusted", "🟢 Trusted"
    if score >= 50:
        return "warning", "🟡 Warning"
    return "high_risk", "🔴 High Risk"


async def get_blacklist_entry(
    db: AsyncSession, phone: str
) -> BlacklistCustomer | None:
    result = await db.execute(
        select(BlacklistCustomer).where(BlacklistCustomer.phone == phone)
    )
    return result.scalar_one_or_none()


async def analyze_customer_risk(
    db: AsyncSession,
    phone: str,
    name: str,
    address: str,
    exclude_order_id: int | None = None,
) -> RiskAnalysis:
    blacklist = await get_blacklist_entry(db, phone)

    all_related = await _fetch_related_orders(
        db, phone, name, address, exclude_order_id
    )
    phone_orders = [o for o in all_related if o.phone == phone]
    normalized_address = _normalize_text(address)
    address_orders = [
        o
        for o in all_related
        if normalized_address
        and normalized_address in _normalize_text(o.address or "")
    ]

    history = _build_history(all_related)
    warnings = _detect_warnings(phone, name, address, phone_orders, address_orders)
    is_blacklisted = blacklist is not None
    score = calculate_trust_score(history, is_blacklisted, warnings)
    label, display = trust_label_from_score(score, is_blacklisted)

    return RiskAnalysis(
        trust_score=score,
        trust_label=label,
        trust_display=display,
        warnings=warnings,
        is_blacklisted=is_blacklisted,
        blacklist_reason=blacklist.reason if blacklist else None,
        history=history,
    )


async def count_customers_by_trust(db: AsyncSession) -> dict[str, int]:
    phone_result = await db.execute(
        select(Order.phone).where(Order.deleted_at.is_(None)).distinct()
    )
    phones = [row[0] for row in phone_result.all()]

    blacklist_result = await db.execute(select(func.count(BlacklistCustomer.id)))
    blacklisted_count = blacklist_result.scalar_one() or 0

    trusted = warning = high_risk = 0

    for phone in phones:
        latest = await db.execute(
            select(Order)
            .where(Order.deleted_at.is_(None), Order.phone == phone)
            .order_by(Order.created_at.desc())
            .limit(1)
        )
        order = latest.scalar_one_or_none()
        if not order:
            continue

        analysis = await analyze_customer_risk(
            db, order.phone, order.customer_name, order.address
        )
        if analysis.is_blacklisted:
            continue
        if analysis.trust_label == "trusted":
            trusted += 1
        elif analysis.trust_label == "warning":
            warning += 1
        else:
            high_risk += 1

    return {
        "trusted_customers": trusted,
        "warning_customers": warning,
        "high_risk_customers": high_risk,
        "blacklisted_customers": blacklisted_count,
    }
