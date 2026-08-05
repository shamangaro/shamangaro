import { apiFetch } from "./api";

export interface WatchesOrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  product_slug: "montres-femmes";
  product_name: "Montres Femmes Élégantes";
  selected_variant: string;
  quantity: number;
  unit_price: 245;
  total_amount: number;
  source_page: "/products/montres-femmes";
}

export interface WatchesOrderResponse {
  order_number: string;
  total_price: number;
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
