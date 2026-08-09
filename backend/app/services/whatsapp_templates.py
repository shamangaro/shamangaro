"""Product-aware WhatsApp templates for CRM order confirmation."""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from app.services.order_product import OrderProductType, classify_order_product
from app.services.products import WATCHES_PRODUCT_SLUG
from app.services.watch_line_items import parse_line_items

NEO_OFFER_LABELS = {
    "solo": "Pack Solo (1 Neo Transat)",
    "duo": "Pack Duo (2 Neo Transat)",
    "family": "Pack Family (3 Neo Transat)",
}


def _format_amount(total: float) -> str:
    return str(int(total)) if total == int(total) else str(total)


def _order_product_type(order: dict[str, Any]) -> OrderProductType:
    explicit = order.get("product_type")
    if explicit in {
        OrderProductType.NEO_TRANSAT.value,
        OrderProductType.WATCHES.value,
        OrderProductType.UNKNOWN.value,
    }:
        return OrderProductType(explicit)

    line_items = order.get("line_items")
    if line_items is None and order.get("internal_notes"):
        line_items = parse_line_items(order.get("internal_notes"))

    return classify_order_product(
        offer_id=order.get("offer_id"),
        internal_notes=order.get("internal_notes"),
        line_items=line_items or None,
    )


def format_watch_lines(line_items: list[dict[str, Any]]) -> str:
    lines: list[str] = []
    for item in line_items:
        label = (
            item.get("model_number")
            or item.get("watch_name")
            or item.get("watch_id")
            or "—"
        )
        quantity = item.get("quantity", 0)
        lines.append(f"• الساعة {label} × {quantity}")
    return "\n".join(lines)


def build_watches_confirmation_whatsapp(order: dict[str, Any]) -> str:
    customer_name = order["customer_name"]
    city = (order.get("city") or order.get("address") or "—").strip() or "—"
    line_items = order.get("line_items")
    if not line_items and order.get("internal_notes"):
        line_items = parse_line_items(order.get("internal_notes"))

    watch_lines = format_watch_lines(line_items or [])
    if not watch_lines and order.get("offer_name"):
        watch_lines = f"• {order['offer_name']}"

    total_quantity = sum(int(item.get("quantity", 0)) for item in (line_items or []))
    if total_quantity <= 0:
        total_quantity = int(order.get("quantity") or 0)

    total_price = _format_amount(float(order.get("total_price") or 0))

    return (
        f"السلام عليكم {customer_name} 🌸\n"
        "معك فريق SHAMANGARO لتأكيد طلبك.\n\n"
        "تفاصيل الطلب:\n"
        f"{watch_lines}\n\n"
        f"العدد الإجمالي: {total_quantity}\n"
        f"المجموع: {total_price} درهم\n"
        f"المدينة: {city}\n\n"
        "المرجو تأكيد الطلب والعنوان من فضلكِ ✅\n"
        "الدفع عند الاستلام والتوصيل مجاني 🚚"
    )


def build_neo_transat_received_whatsapp(
    customer_name: str, quantity: int, total: float, offer_id: str | None = None
) -> str:
    product_label = NEO_OFFER_LABELS.get((offer_id or "").strip().lower(), "Neo Transat")
    amount = _format_amount(total)
    return (
        f"السلام عليكم {customer_name} 👋\n\n"
        "شكراً لاختياركم SHAMANGARO ❤️\n\n"
        "تم استلام طلبكم بنجاح.\n\n"
        "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n"
        "━━━━━━━━━━━━━━━\n\n"
        "🛒 المنتج:\n"
        f"{product_label}\n\n"
        f"📦 الكمية:\n{quantity}\n\n"
        f"💰 المبلغ:\n{amount} DH\n\n"
        "🚚 التوصيل مجاني\n\n"
        "💵 الدفع عند الاستلام\n\n"
        "━━━━━━━━━━━━━━━\n\n"
        "شكراً لثقتكم.\n\n"
        "فريق SHAMANGARO"
    )


def build_generic_received_whatsapp(
    customer_name: str, quantity: int, total: float
) -> str:
    amount = _format_amount(total)
    return (
        f"السلام عليكم {customer_name} 👋\n\n"
        "شكراً لاختياركم SHAMANGARO ❤️\n\n"
        "تم استلام طلبكم بنجاح.\n\n"
        "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n"
        f"📦 الكمية:\n{quantity}\n\n"
        f"💰 المبلغ:\n{amount} DH\n\n"
        "🚚 التوصيل مجاني\n\n"
        "💵 الدفع عند الاستلام\n\n"
        "فريق SHAMANGARO"
    )


def build_order_received_whatsapp(order: dict[str, Any]) -> str:
    product = _order_product_type(order)
    if product == OrderProductType.WATCHES:
        return build_watches_confirmation_whatsapp(order)
    if product == OrderProductType.NEO_TRANSAT:
        return build_neo_transat_received_whatsapp(
            order["customer_name"],
            int(order.get("quantity") or 0),
            float(order.get("total_price") or 0),
            order.get("offer_id"),
        )
    return build_generic_received_whatsapp(
        order["customer_name"],
        int(order.get("quantity") or 0),
        float(order.get("total_price") or 0),
    )


def build_order_confirmed_whatsapp(order: dict[str, Any] | str) -> str:
    if isinstance(order, str):
        return (
            f"السلام عليكم {order}\n\n"
            "تم تأكيد طلبكم بنجاح ✅\n\n"
            "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n"
            "شكراً لاختياركم SHAMANGARO ❤️"
        )

    product = _order_product_type(order)
    if product == OrderProductType.WATCHES:
        return build_watches_confirmation_whatsapp(order)

    return (
        f"السلام عليكم {order['customer_name']}\n\n"
        "تم تأكيد طلبكم بنجاح ✅\n\n"
        "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n"
        "شكراً لاختياركم SHAMANGARO ❤️"
    )


def encode_whatsapp_message(message: str) -> str:
    return quote(message, safe="")
