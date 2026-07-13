"use client";

import { useCallback, useEffect, useState } from "react";

export const CART_STORAGE_KEY = "shamangaro-cart";

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
}

export const cartCatalog: Omit<CartItem, "quantity">[] = [
  {
    id: "solo",
    name: "Neo Transat",
    subtitle: "كرسي واحد",
    thumbnail: "/images/neo-transat-open.png",
    unitPrice: 249,
  },
  {
    id: "duo",
    name: "Neo Transat",
    subtitle: "كرسيين",
    thumbnail: "/images/neo-transat-open.png",
    unitPrice: 458,
  },
  {
    id: "family",
    name: "Neo Transat",
    subtitle: "3 كراسي",
    thumbnail: "/images/neo-transat-open.png",
    unitPrice: 657,
  },
];

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
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
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const sync = useCallback(() => {
    setItems(readCart());
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

  const addItem = useCallback(
    (productId: string) => {
      const product = cartCatalog.find((entry) => entry.id === productId);
      if (!product) return;

      const current = readCart();
      const existing = current.find((item) => item.id === productId);

      if (existing) {
        persist(
          current.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        return;
      }

      persist([...current, { ...product, quantity: 1 }]);
    },
    [persist]
  );

  const removeItem = useCallback(
    (productId: string) => {
      persist(readCart().filter((item) => item.id !== productId));
    },
    [persist]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(productId);
        return;
      }

      persist(
        readCart().map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [persist, removeItem]
  );

  return {
    items,
    hydrated,
    itemCount: getCartItemCount(items),
    subtotal: getCartSubtotal(items),
    addItem,
    removeItem,
    updateQuantity,
  };
}
