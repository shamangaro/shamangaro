import { contactInfo } from "@/config/legal";

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${contactInfo.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildOrderReceivedWhatsApp(
  customerName: string,
  quantity: number,
  total: number
): string {
  const amount =
    total === Math.floor(total) ? String(Math.floor(total)) : String(total);
  return (
    `السلام عليكم ${customerName} 👋\n\n` +
    "شكراً لاختياركم SHAMANGARO ❤️\n\n" +
    "تم استلام طلبكم بنجاح.\n\n" +
    "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "🛒 المنتج:\n" +
    "Neo Transat\n\n" +
    `📦 الكمية:\n${quantity}\n\n` +
    `💰 المبلغ:\n${amount} DH\n\n` +
    "🚚 التوصيل مجاني\n\n" +
    "💵 الدفع عند الاستلام\n\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "شكراً لثقتكم.\n\n" +
    "فريق SHAMANGARO"
  );
}

export function buildOrderConfirmedWhatsApp(customerName: string): string {
  return (
    `السلام عليكم ${customerName}\n\n` +
    "تم تأكيد طلبكم بنجاح ✅\n\n" +
    "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n" +
    "شكراً لاختياركم SHAMANGARO ❤️"
  );
}
