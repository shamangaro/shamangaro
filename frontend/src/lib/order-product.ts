import type { WatchOrderLineItem } from "./orders";

export type OrderProductType = "neo-transat" | "watches" | "unknown";

export interface OrderProductFields {
  offer_id: string;
  internal_notes?: string | null;
  line_items?: WatchOrderLineItem[] | null;
  product_type?: OrderProductType;
}

const NEO_OFFER_IDS = new Set(["solo", "duo", "family"]);
const WATCHES_PRODUCT_SLUG = "montres-femmes";

export function classifyOrderProduct(order: OrderProductFields): OrderProductType {
  if (order.product_type) {
    return order.product_type;
  }

  const offerId = order.offer_id?.trim().toLowerCase() ?? "";
  if (offerId === WATCHES_PRODUCT_SLUG) {
    return "watches";
  }
  if (order.line_items && order.line_items.length > 0) {
    return "watches";
  }

  const notes = order.internal_notes ?? "";
  if (notes.includes(`product_slug=${WATCHES_PRODUCT_SLUG}`)) {
    return "watches";
  }
  if (notes.includes("line_items=")) {
    return "watches";
  }

  if (NEO_OFFER_IDS.has(offerId)) {
    return "neo-transat";
  }

  return "unknown";
}

export const PRODUCT_BADGE_LABELS: Record<OrderProductType, string> = {
  "neo-transat": "Neo Transat",
  watches: "ساعات",
  unknown: "غير محدد",
};

export const PRODUCT_BADGE_CLASSES: Record<OrderProductType, string> = {
  "neo-transat": "bg-navy/10 text-navy ring-1 ring-navy/15",
  watches: "bg-[#0A2F23]/10 text-[#0A2F23] ring-1 ring-[#134A35]/20",
  unknown: "bg-amber-50 text-amber-900 ring-1 ring-amber-200",
};
