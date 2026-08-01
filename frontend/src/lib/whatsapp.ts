import { contactInfo } from "@/config/legal";

/**
 * Build the official WhatsApp send URL from a plain UTF-8 message.
 * Encodes the message exactly once — never pass pre-encoded text.
 */
export function buildWhatsAppSendUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
}

export function whatsappLink(message?: string): string {
  if (!message) {
    return `https://api.whatsapp.com/send?phone=${contactInfo.whatsapp}`;
  }
  return buildWhatsAppSendUrl(contactInfo.whatsapp, message);
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
