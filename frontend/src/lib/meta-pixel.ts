export const META_PIXEL_ID = "623550512951566";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: Window["fbq"];
  }
}

export function trackMetaPageView(): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export interface MetaAddToCartEvent {
  contentId: string;
  value: number;
  numItems?: number;
}

/** Standard Meta AddToCart. PageView stays in MetaPixel; Purchase stays in meta-pixel-purchase. */
export function trackMetaAddToCart(event: MetaAddToCartEvent): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", "AddToCart", {
    content_ids: [event.contentId],
    content_type: "product",
    value: event.value,
    currency: "MAD",
    num_items: event.numItems ?? 1,
  });
}
