"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  WATCHES_PRODUCT,
  WATCH_VARIANTS,
  computeWatchTotal,
  getWatchVariant,
  type WatchVariantId,
} from "./config";

export type WatchQuantity = 1 | 2 | 3;

interface WatchesPageState {
  variantId: WatchVariantId | null;
  quantity: WatchQuantity | null;
  unitPrice: number;
  total: number;
  hasSelection: boolean;
  setVariantId: (id: WatchVariantId) => void;
  setQuantity: (qty: WatchQuantity) => void;
}

const WatchesPageContext = createContext<WatchesPageState | null>(null);

export function WatchesPageProvider({ children }: { children: ReactNode }) {
  const [variantId, setVariantIdState] = useState<WatchVariantId | null>(null);
  const [quantity, setQuantityState] = useState<WatchQuantity | null>(null);

  const setVariantId = useCallback((id: WatchVariantId) => {
    setVariantIdState(id);
  }, []);

  const setQuantity = useCallback((qty: WatchQuantity) => {
    setQuantityState(qty);
  }, []);

  const total = quantity ? computeWatchTotal(quantity) : 0;

  const value = useMemo<WatchesPageState>(
    () => ({
      variantId,
      quantity,
      unitPrice: WATCHES_PRODUCT.unitPrice,
      total,
      hasSelection: variantId !== null && quantity !== null,
      setVariantId,
      setQuantity,
    }),
    [variantId, quantity, total, setVariantId, setQuantity]
  );

  return (
    <WatchesPageContext.Provider value={value}>
      {children}
    </WatchesPageContext.Provider>
  );
}

export function useWatchesPage() {
  const ctx = useContext(WatchesPageContext);
  if (!ctx) {
    throw new Error("useWatchesPage must be used within WatchesPageProvider");
  }
  return ctx;
}

export function useSelectedVariant() {
  const { variantId } = useWatchesPage();
  if (!variantId) return null;
  return getWatchVariant(variantId);
}

export { WATCH_VARIANTS, WATCHES_PRODUCT };
