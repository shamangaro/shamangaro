def build_order_received_whatsapp(
    customer_name: str, quantity: int, total: float
) -> str:
    return (
        f"السلام عليكم {customer_name} 👋\n\n"
        "شكراً لاختياركم SHAMANGARO ❤️\n\n"
        "تم استلام طلبكم بنجاح.\n\n"
        "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n"
        "━━━━━━━━━━━━━━━\n\n"
        "🛒 المنتج:\n"
        "Neo Transat\n\n"
        f"📦 الكمية:\n{quantity}\n\n"
        f"💰 المبلغ:\n{int(total) if total == int(total) else total} DH\n\n"
        "🚚 التوصيل مجاني\n\n"
        "💵 الدفع عند الاستلام\n\n"
        "━━━━━━━━━━━━━━━\n\n"
        "شكراً لثقتكم.\n\n"
        "فريق SHAMANGARO"
    )


def build_order_confirmed_whatsapp(customer_name: str) -> str:
    return (
        f"السلام عليكم {customer_name}\n\n"
        "تم تأكيد طلبكم بنجاح ✅\n\n"
        "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n"
        "شكراً لاختياركم SHAMANGARO ❤️"
    )
