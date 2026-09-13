import { getServerApiBase } from "@/lib/api-server";
import type { OrderPublic } from "@/lib/orders";

export async function getPublicThankYouOrder(
  orderNumber: string | undefined
): Promise<OrderPublic | null> {
  const trimmed = orderNumber?.trim();
  if (!trimmed) return null;

  try {
    const base = getServerApiBase();
    const res = await fetch(`${base}/orders/${trimmed}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
