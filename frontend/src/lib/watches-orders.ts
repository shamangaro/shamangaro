import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import {
  lineItemsToPayload,
  type SelectedWatchLine,
} from "@/components/montres-femmes/watch-selection-utils";
import { apiFetch } from "./api";
import type { OrderPublic } from "./orders";

export interface WatchOrderLineItemPayload {
  variant_id: string;
  quantity: number;
}

export interface WatchesOrderPayload {
  customer_name: string;
  phone: string;
  city: string;
  product_slug: "montres-femmes";
  product_name: "Montres Femmes Élégantes";
  line_items: WatchOrderLineItemPayload[];
  quantity: number;
  unit_price: 250;
  total_amount: number;
  source_page: "/products/montres-femmes";
}

export interface WatchOrderLineItemPublic {
  watch_id: string;
  watch_name: string;
  model_number: string;
  image?: string | null;
  quantity: number;
}

export interface WatchesOrderResponse {
  order_number: string;
  total_price: number;
}

/** Build a backend-valid payload from cart lines + checkout form. */
export function buildWatchesOrderPayload(
  selectedLines: SelectedWatchLine[],
  form: { name: string; phone: string; city: string }
): WatchesOrderPayload {
  const line_items = lineItemsToPayload(selectedLines);
  const quantity = line_items.reduce((sum, item) => sum + item.quantity, 0);
  const total_amount =
    Math.round(WATCHES_PRODUCT.unitPrice * quantity * 100) / 100;

  return {
    customer_name: form.name.trim(),
    phone: form.phone,
    city: form.city.trim(),
    product_slug: "montres-femmes",
    product_name: "Montres Femmes Élégantes",
    line_items,
    quantity,
    unit_price: WATCHES_PRODUCT.unitPrice,
    total_amount,
    source_page: "/products/montres-femmes",
  };
}

export async function createWatchesOrder(
  payload: WatchesOrderPayload
): Promise<WatchesOrderResponse> {
  return apiFetch<WatchesOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "omit",
  });
}

/** Detect Montres Femmes orders on public thank-you / order pages. */
export function isWatchesPublicOrder(
  order: Pick<OrderPublic, "offer_name" | "line_items"> | null | undefined
): boolean {
  if (!order) return false;
  if (order.line_items && order.line_items.length > 0) return true;
  return order.offer_name.includes(WATCHES_PRODUCT.name);
}

export function getWatchesThankYouHomeHref(
  order: Pick<OrderPublic, "offer_name" | "line_items"> | null | undefined
): string {
  return isWatchesPublicOrder(order) ? WATCHES_PRODUCT.sourcePage : "/";
}
