"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BASE_PRICE_PER_CHAIR,
  getOfferById,
  getOfferLabel,
  getOfferSavings,
  getOfferSubtitle,
  getOfferTotal,
  getOriginalTotal,
  getPricePerChair,
  productOffers,
} from "@/lib/offers";

export const CART_STORAGE_KEY = "shamangaro-cart";
export const CART_PRODUCT_ID = "neo-transat";

export interface CartItem {
  id: typeof CART_PRODUCT_ID;
  name: string;
  subtitle: string;
  thumbnail: string;
  quantity: number;
  color?: string;
}

export const DEFAULT_PRODUCT_COLOR = "أزرق بحري غامق (Bleu Marine)";

const CART_PRODUCT = {
  id: CART_PRODUCT_ID,
  name: "Neo Transat",
  thumbnail: "/images/neo-transat-open.png",
  color: DEFAULT_PRODUCT_COLOR,
} as const;

/** Quick-add options shown when the cart is empty (matches LP packs). */
export const cartCatalog = productOffers.map((offer) => ({
  id: offer.id,
  name: CART_PRODUCT.name,
  subtitle: offer.label,
  total: offer.total,
  chairs: offer.chairs,
  color: DEFAULT_PRODUCT_COLOR,
}));

type LegacyCartItem = {
  id: string;
  quantity: number;
  color?: string;
};

function buildCartItem(chairCount: number, color?: string): CartItem {
  return {
    ...CART_PRODUCT,
    subtitle: getOfferSubtitle(chairCount),
    quantity: chairCount,
    color: color ?? DEFAULT_PRODUCT_COLOR,
  };
}

function normalizeCart(rawItems: LegacyCartItem[]): CartItem[] {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return [];

  const neoItem = rawItems.find((item) => item.id === CART_PRODUCT_ID);
  if (neoItem && typeof neoItem.quantity === "number" && neoItem.quantity > 0) {
    return [buildCartItem(neoItem.quantity, neoItem.color)];
  }

  let chairs = 0;
  let color = DEFAULT_PRODUCT_COLOR;

  for (const item of rawItems) {
    if (item.color) color = item.color;

    if (item.id === "solo") chairs += item.quantity;
    else if (item.id === "duo") chairs += item.quantity * 2;
    else if (item.id === "family") chairs += item.quantity * 3;
  }

  if (chairs <= 0) return [];
  return [buildCartItem(chairs, color)];
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LegacyCartItem[];
    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getOfferTotal(item.quantity), 0);
}

export function getCartItemColor(item: CartItem): string | undefined {
  return item.color ?? DEFAULT_PRODUCT_COLOR;
}

export function getCartItemPricing(item: CartItem) {
  const pricePerChair = getPricePerChair(item.quantity);
  const lineTotal = getOfferTotal(item.quantity);
  const originalTotal = getOriginalTotal(item.quantity);
  const savings = getOfferSavings(item.quantity);

  return {
    pricePerChair,
    lineTotal,
    originalTotal,
    originalPricePerChair: BASE_PRICE_PER_CHAIR,
    savings,
    label: getOfferLabel(item.quantity),
    subtitle: getOfferSubtitle(item.quantity),
  };
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const sync = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as LegacyCartItem[]) : [];
      const normalized = normalizeCart(parsed);

      if (
        Array.isArray(parsed) &&
        parsed.some((item) => ["solo", "duo", "family"].includes(item.id))
      ) {
        writeCart(normalized);
      }

      setItems(normalized);
    } catch {
      setItems([]);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    sync();

    const handleUpdate = () => sync();
    window.addEventListener("cart-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [sync]);

  const persist = useCallback((next: CartItem[]) => {
    writeCart(next);
    setItems(next);
  }, []);

  const setChairCount = useCallback(
    (chairCount: number, color?: string) => {
      if (chairCount < 1) {
        persist([]);
        return;
      }

      persist([buildCartItem(chairCount, color)]);
    },
    [persist]
  );

  const addItem = useCallback(
    (offerId: string) => {
      const offer = getOfferById(offerId);
      if (!offer) return;

      const current = readCart();
      const existing = current[0];

      if (!existing) {
        setChairCount(offer.chairs);
        return;
      }

      setChairCount(existing.quantity + offer.chairs, existing.color);
    },
    [setChairCount]
  );

  const removeItem = useCallback(
    (_productId?: string) => {
      persist([]);
    },
    [persist]
  );

  const updateQuantity = useCallback(
    (_productId: string, chairCount: number) => {
      if (chairCount < 1) {
        removeItem();
        return;
      }

      const current = readCart()[0];
      setChairCount(chairCount, current?.color);
    },
    [removeItem, setChairCount]
  );

  const chairCount = getCartItemCount(items);
  const subtotal = getCartSubtotal(items);
  const savings = getOfferSavings(chairCount);

  return {
    items,
    hydrated,
    itemCount: chairCount,
    chairCount,
    subtotal,
    savings,
    pricePerChair: getPricePerChair(chairCount),
    addItem,
    removeItem,
    updateQuantity,
    getCartItemPricing,
  };
}
