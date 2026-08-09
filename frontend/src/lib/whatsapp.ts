import { contactInfo } from "@/config/legal";
import { getOfferById } from "@/lib/offers";
import {
  classifyOrderProduct,
  type OrderProductType,
} from "@/lib/order-product";
import type { WatchOrderLineItem } from "@/lib/orders";

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

export interface OrderWhatsAppContext {
  customer_name: string;
  quantity: number;
  total_price: number;
  unit_price?: number;
  offer_id: string;
  offer_name?: string;
  city?: string | null;
  address?: string | null;
  line_items?: WatchOrderLineItem[] | null;
  internal_notes?: string | null;
  product_type?: OrderProductType;
}

function formatAmount(total: number): string {
  return total === Math.floor(total) ? String(Math.floor(total)) : String(total);
}

function resolveProductType(order: OrderWhatsAppContext): OrderProductType {
  return classifyOrderProduct(order);
}

function formatWatchLines(lineItems: WatchOrderLineItem[]): string {
  return lineItems
    .map((item) => {
      const label = item.model_number || item.watch_name || item.watch_id;
      return `• الساعة ${label} × ${item.quantity}`;
    })
    .join("\n");
}

export function buildWatchesConfirmationWhatsApp(order: OrderWhatsAppContext): string {
  const city = (order.city || order.address || "—").trim() || "—";
  const lineItems = order.line_items ?? [];
  const watchLines =
    lineItems.length > 0
      ? formatWatchLines(lineItems)
      : order.offer_name
        ? `• ${order.offer_name}`
        : "• —";

  const totalQuantity =
    lineItems.reduce((sum, item) => sum + item.quantity, 0) || order.quantity;
  const totalPrice = formatAmount(order.total_price);

  return (
    `السلام عليكم ${order.customer_name} 🌸\n` +
    "معك فريق SHAMANGARO لتأكيد طلبك.\n\n" +
    "تفاصيل الطلب:\n" +
    `${watchLines}\n\n` +
    `العدد الإجمالي: ${totalQuantity}\n` +
    `المجموع: ${totalPrice} درهم\n` +
    `المدينة: ${city}\n\n` +
    "المرجو تأكيد الطلب والعنوان من فضلكِ ✅\n" +
    "الدفع عند الاستلام والتوصيل مجاني 🚚"
  );
}

function buildNeoTransatReceivedWhatsApp(order: OrderWhatsAppContext): string {
  const offer = getOfferById(order.offer_id);
  const productLabel = offer?.subtitle ?? "Neo Transat";
  const amount = formatAmount(order.total_price);

  return (
    `السلام عليكم ${order.customer_name} 👋\n\n` +
    "شكراً لاختياركم SHAMANGARO ❤️\n\n" +
    "تم استلام طلبكم بنجاح.\n\n" +
    "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "🛒 المنتج:\n" +
    `${productLabel}\n\n` +
    `📦 الكمية:\n${order.quantity}\n\n` +
    `💰 المبلغ:\n${amount} DH\n\n` +
    "🚚 التوصيل مجاني\n\n" +
    "💵 الدفع عند الاستلام\n\n" +
    "━━━━━━━━━━━━━━━\n\n" +
    "شكراً لثقتكم.\n\n" +
    "فريق SHAMANGARO"
  );
}

function buildGenericReceivedWhatsApp(order: OrderWhatsAppContext): string {
  const amount = formatAmount(order.total_price);
  return (
    `السلام عليكم ${order.customer_name} 👋\n\n` +
    "شكراً لاختياركم SHAMANGARO ❤️\n\n" +
    "تم استلام طلبكم بنجاح.\n\n" +
    "سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب قبل الشحن.\n\n" +
    `📦 الكمية:\n${order.quantity}\n\n` +
    `💰 المبلغ:\n${amount} DH\n\n` +
    "🚚 التوصيل مجاني\n\n" +
    "💵 الدفع عند الاستلام\n\n" +
    "فريق SHAMANGARO"
  );
}

export function buildOrderReceivedWhatsApp(order: OrderWhatsAppContext): string {
  const product = resolveProductType(order);
  if (product === "watches") {
    return buildWatchesConfirmationWhatsApp(order);
  }
  if (product === "neo-transat") {
    return buildNeoTransatReceivedWhatsApp(order);
  }
  return buildGenericReceivedWhatsApp(order);
}

export function buildOrderConfirmedWhatsApp(
  order: OrderWhatsAppContext | string
): string {
  if (typeof order === "string") {
    return (
      `السلام عليكم ${order}\n\n` +
      "تم تأكيد طلبكم بنجاح ✅\n\n" +
      "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n" +
      "شكراً لاختياركم SHAMANGARO ❤️"
    );
  }

  if (resolveProductType(order) === "watches") {
    return buildWatchesConfirmationWhatsApp(order);
  }

  return (
    `السلام عليكم ${order.customer_name}\n\n` +
    "تم تأكيد طلبكم بنجاح ✅\n\n" +
    "سيتم تجهيز الشحنة وإرسالها في أقرب وقت.\n\n" +
    "شكراً لاختياركم SHAMANGARO ❤️"
  );
}

export function toOrderWhatsAppContext(order: {
  customer_name: string;
  quantity: number;
  total_price: number;
  unit_price?: number;
  offer_id: string;
  offer_name?: string;
  city?: string | null;
  address?: string | null;
  line_items?: WatchOrderLineItem[] | null;
  internal_notes?: string | null;
  product_type?: OrderProductType;
}): OrderWhatsAppContext {
  return {
    customer_name: order.customer_name,
    quantity: order.quantity,
    total_price: order.total_price,
    unit_price: order.unit_price,
    offer_id: order.offer_id,
    offer_name: order.offer_name,
    city: order.city,
    address: order.address,
    line_items: order.line_items,
    internal_notes: order.internal_notes,
    product_type: order.product_type,
  };
}
