import { getOfferById } from "@/lib/offers";

export interface MetaPurchaseEvent {
  orderNumber: string;
  value: number;
  currency: "MAD";
  content_type: "product";
  content_ids: string[];
  num_items: number;
}

export interface WatchPurchaseLineItem {
  variant_id: string;
  quantity: number;
}

const PURCHASE_STORAGE_KEY = "shamangaro_meta_purchase_orders";

export class MetaPurchaseTracker {
  private tracked = new Set<string>();

  constructor(private readonly storage: Storage | null = getSessionStorage()) {
    this.loadFromStorage();
  }

  has(orderNumber: string): boolean {
    return this.tracked.has(orderNumber);
  }

  mark(orderNumber: string): void {
    if (this.tracked.has(orderNumber)) {
      return;
    }

    this.tracked.add(orderNumber);
    this.persist();
  }

  tryMark(orderNumber: string): boolean {
    if (this.has(orderNumber)) {
      return false;
    }

    this.mark(orderNumber);
    return true;
  }

  reset(): void {
    this.tracked.clear();
    if (this.storage) {
      try {
        this.storage.removeItem(PURCHASE_STORAGE_KEY);
      } catch {
        // Ignore storage failures in tests or restricted environments.
      }
    }
  }

  private loadFromStorage(): void {
    if (!this.storage) {
      return;
    }

    try {
      const raw = this.storage.getItem(PURCHASE_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return;
      }

      for (const orderNumber of parsed) {
        if (typeof orderNumber === "string" && orderNumber.length > 0) {
          this.tracked.add(orderNumber);
        }
      }
    } catch {
      // Ignore invalid storage payloads.
    }
  }

  private persist(): void {
    if (!this.storage) {
      return;
    }

    try {
      this.storage.setItem(
        PURCHASE_STORAGE_KEY,
        JSON.stringify(Array.from(this.tracked))
      );
    } catch {
      // Ignore quota or privacy-mode storage failures.
    }
  }
}

function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

let purchaseTracker = new MetaPurchaseTracker();

export function resetMetaPurchaseTrackerForTests(
  storage: Storage | null = null
): void {
  purchaseTracker = new MetaPurchaseTracker(storage);
}

export function buildNeoTransatPurchaseEvent(
  orderNumber: string,
  offerId: string,
  totalPrice: number
): MetaPurchaseEvent {
  const offer = getOfferById(offerId);

  return {
    orderNumber,
    value: totalPrice,
    currency: "MAD",
    content_type: "product",
    content_ids: [offerId],
    num_items: offer?.chairs ?? 1,
  };
}

export function buildWatchesPurchaseEvent(
  orderNumber: string,
  lineItems: WatchPurchaseLineItem[],
  totalPrice: number
): MetaPurchaseEvent {
  return {
    orderNumber,
    value: totalPrice,
    currency: "MAD",
    content_type: "product",
    content_ids: lineItems.map((item) => item.variant_id),
    num_items: lineItems.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export function toMetaPurchasePayload(
  event: MetaPurchaseEvent
): Omit<MetaPurchaseEvent, "orderNumber"> {
  return {
    value: event.value,
    currency: event.currency,
    content_type: event.content_type,
    content_ids: event.content_ids,
    num_items: event.num_items,
  };
}

/**
 * Fire Meta Pixel Purchase once per successful order number.
 * Returns true only when fbq was called for a new order.
 */
export function trackMetaPurchase(event: MetaPurchaseEvent): boolean {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  if (!purchaseTracker.tryMark(event.orderNumber)) {
    return false;
  }

  window.fbq("track", "Purchase", toMetaPurchasePayload(event));
  return true;
}
