import html
import logging

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.order import Order, OrderStatusEvent
from app.services.order_lifecycle import record_event

logger = logging.getLogger(__name__)

TELEGRAM_SENT_EVENT = "TELEGRAM_SENT"
TELEGRAM_TIMEOUT_SECONDS = 10.0


def telegram_notifications_enabled() -> bool:
    if not settings.TELEGRAM_NOTIFICATIONS_ENABLED:
        return False
    if not settings.TELEGRAM_BOT_TOKEN.strip() or not settings.TELEGRAM_CHAT_ID.strip():
        return False
    return True


def escape_html(value: str) -> str:
    return html.escape(value, quote=False)


def format_city_and_address(order: Order) -> str:
    if order.city and order.city not in order.address:
        return f"{order.city}، {order.address}"
    return order.address


def build_crm_order_url(order_id: int) -> str:
    base = settings.CRM_PUBLIC_URL.rstrip("/")
    # Telegram inline buttons require a public http(s) URL; localhost fails sendMessage.
    if "localhost" in base or "127.0.0.1" in base:
        base = "https://shamangaro.com"
    return f"{base}/admin/orders/{order_id}"


def build_order_notification_message(order: Order) -> str:
    total = f"{float(order.total_price):g}"
    lines = [
        "🔔 طلبية جديدة — SHAMANGARO",
        "",
        f"🆔 رقم الطلب: #{escape_html(order.order_number)}",
        "",
        "👤 الزبون:",
        escape_html(order.customer_name),
        "",
        "📞 الهاتف:",
        escape_html(order.phone),
        "",
        "📍 العنوان:",
        escape_html(format_city_and_address(order)),
        "",
        "🛒 المنتج:",
        escape_html(order.offer_name),
        "",
        "📦 الكمية:",
        escape_html(str(order.quantity)),
        "",
        "💰 المبلغ:",
        f"{escape_html(total)} DH",
        "",
        "💵 الدفع عند الاستلام",
        "🚚 التوصيل مجاني",
    ]
    return "\n".join(lines)


def build_telegram_payload(order: Order) -> dict:
    return {
        "chat_id": settings.TELEGRAM_CHAT_ID,
        "text": build_order_notification_message(order),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        "text": "فتح الطلب في CRM",
                        "url": build_crm_order_url(order.id),
                    }
                ]
            ]
        },
    }


async def has_telegram_notification_sent(db: AsyncSession, order_id: int) -> bool:
    result = await db.execute(
        select(OrderStatusEvent.id)
        .where(
            OrderStatusEvent.order_id == order_id,
            OrderStatusEvent.event_type == TELEGRAM_SENT_EVENT,
        )
        .limit(1)
    )
    return result.scalar_one_or_none() is not None


async def send_new_order_telegram_notification(
    db: AsyncSession, order: Order
) -> bool:
    if not telegram_notifications_enabled():
        logger.info(
            "Telegram notifications disabled or not configured; skipping order_id=%s",
            order.id,
        )
        return False

    if await has_telegram_notification_sent(db, order.id):
        logger.info(
            "Telegram notification already sent for order_id=%s; skipping",
            order.id,
        )
        return False

    api_url = (
        f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN.strip()}/sendMessage"
    )
    payload = build_telegram_payload(order)

    try:
        async with httpx.AsyncClient(timeout=TELEGRAM_TIMEOUT_SECONDS) as client:
            response = await client.post(api_url, json=payload)
            if response.status_code >= 400:
                logger.warning(
                    "Telegram notification failed for order_id=%s status=%s",
                    order.id,
                    response.status_code,
                )
                return False

            data = response.json()
            if not data.get("ok"):
                logger.warning(
                    "Telegram notification rejected for order_id=%s: %s",
                    order.id,
                    data.get("description", "unknown error"),
                )
                return False
    except Exception as exc:
        logger.warning(
            "Telegram notification error for order_id=%s: %s",
            order.id,
            exc,
        )
        return False

    await record_event(
        db,
        order,
        event_type=TELEGRAM_SENT_EVENT,
        note="تم إرسال إشعار Telegram",
    )
    await db.commit()
    logger.info("Telegram notification sent for order_id=%s", order.id)
    return True
