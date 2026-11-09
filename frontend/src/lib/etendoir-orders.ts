import {
  ETENDOIR_OFFERS,
  ETENDOIR_PRODUCT,
  type EtendoirQuantity,
} from "@/components/etendoir-mural/config";
import { apiFetch } from "./api";
import { getApiBase } from "./api-base";
import type { OrderPublic } from "./orders";

export interface EtendoirOrderPayload {
  customer_name: string;
  phone: string;
  city: string;
  product_slug: "etendoir-mural";
  product_name: typeof ETENDOIR_PRODUCT.name;
  quantity: EtendoirQuantity;
  unit_price: typeof ETENDOIR_PRODUCT.unitPrice;
  total_amount: number;
  source_page: typeof ETENDOIR_PRODUCT.sourcePage;
}

export interface EtendoirOrderResponse {
  order_number: string;
  total_price: number;
}

export function buildEtendoirOrderPayload(
  form: {
    name: string;
    phone: string;
    city: string;
  },
  quantity: EtendoirQuantity
): EtendoirOrderPayload {
  return {
    customer_name: form.name.trim(),
    phone: form.phone,
    city: form.city.trim(),
    product_slug: ETENDOIR_PRODUCT.slug,
    product_name: ETENDOIR_PRODUCT.name,
    quantity,
    unit_price: ETENDOIR_PRODUCT.unitPrice,
    total_amount: ETENDOIR_OFFERS.find((offer) => offer.quantity === quantity)!.total,
    source_page: ETENDOIR_PRODUCT.sourcePage,
  };
}

export async function createEtendoirOrder(
  payload: EtendoirOrderPayload
): Promise<EtendoirOrderResponse> {
  return apiFetch<EtendoirOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "omit",
  });
}

export function getEtendoirThankYouHref(orderNumber: string, lang: "ar" | "fr"): string {
  const params = new URLSearchParams({
    order: orderNumber,
    lang,
  });
  return `/products/etendoir-mural/thank-you?${params.toString()}`;
}

/** True only when the local API answers /health. A failed proxy or a stopped backend is false. */
export async function isEtendoirOrderServiceAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBase()}/health`, {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { status?: string };
    return body.status === "healthy";
  } catch {
    return false;
  }
}

export function isEtendoirPublicOrder(
  order: Pick<OrderPublic, "offer_name"> | null | undefined
): boolean {
  if (!order) return false;
  return order.offer_name.includes(ETENDOIR_PRODUCT.name);
}

export function getEtendoirThankYouHomeHref(): string {
  return ETENDOIR_PRODUCT.sourcePage;
}
