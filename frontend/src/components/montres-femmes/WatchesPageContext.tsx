"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WATCHES_PRODUCT } from "./config";
import type { WatchSlide } from "./config";
import {
  countSelectedModels,
  countSelectedWatches,
  computeWatchTotalFromLines,
  decrementWatchLineQuantity,
  incrementWatchLineQuantity,
  isSlideSelectedInCart,
  MAX_WATCH_LINE_QUANTITY,
  normalizeWatchLines,
  removeWatchLine,
  selectWatchLine,
  type SelectedWatchLine,
  type SelectWatchResult,
  type WatchSelection,
} from "./watch-selection-utils";
import { scrollToWatchesCart } from "@/lib/scroll-to-watches-order";

interface WatchesPageState {
  selectedLines: SelectedWatchLine[];
  selectedCount: number;
  totalModels: number;
  isSelectionComplete: boolean;
  checkoutUnlocked: boolean;
  unitPrice: number;
  total: number;
  isSlideSelected: (slide: WatchSlide) => boolean;
  selectWatch: (watch: WatchSelection) => SelectWatchResult;
  incrementLineQuantity: (slideId: string) => void;
  decrementLineQuantity: (slideId: string) => void;
  removeSelectedWatch: (slideId: string) => void;
  unlockCheckout: () => void;
  scrollToCart: () => void;
}

const WatchesPageContext = createContext<WatchesPageState | null>(null);

export function WatchesPageProvider({ children }: { children: ReactNode }) {
  const [selectedLines, setSelectedLines] = useState<SelectedWatchLine[]>([]);
  const [checkoutUnlocked, setCheckoutUnlocked] = useState(false);

  const selectedCount = countSelectedWatches(selectedLines);
  const totalModels = countSelectedModels(selectedLines);
  const isSelectionComplete = selectedLines.length > 0;
  const total = computeWatchTotalFromLines(selectedLines);

  const commitLines = useCallback(
    (updater: (lines: SelectedWatchLine[]) => SelectedWatchLine[]) => {
      setSelectedLines((lines) => normalizeWatchLines(updater(lines)));
    },
    []
  );

  const scrollToCart = useCallback(() => {
    scrollToWatchesCart();
  }, []);

  const isSlideSelected = useCallback(
    (slide: WatchSlide) => isSlideSelectedInCart(selectedLines, slide),
    [selectedLines]
  );

  const selectWatch = useCallback(
    (watch: WatchSelection): SelectWatchResult => {
      setCheckoutUnlocked(false);

      const outcome: { result: SelectWatchResult } = { result: "unchanged" };
      commitLines((lines) => {
        const next = selectWatchLine(lines, watch);
        outcome.result = next.result;
        return next.lines;
      });

      return outcome.result;
    },
    [commitLines]
  );

  const incrementLineQuantity = useCallback(
    (slideId: string) => {
      setCheckoutUnlocked(false);
      commitLines((lines) => {
        if (countSelectedWatches(lines) >= MAX_WATCH_LINE_QUANTITY) return lines;
        return incrementWatchLineQuantity(lines, slideId);
      });
    },
    [commitLines]
  );

  const decrementLineQuantity = useCallback(
    (slideId: string) => {
      setCheckoutUnlocked(false);
      commitLines((lines) => decrementWatchLineQuantity(lines, slideId));
    },
    [commitLines]
  );

  const removeSelectedWatch = useCallback(
    (slideId: string) => {
      setCheckoutUnlocked(false);
      commitLines((lines) => removeWatchLine(lines, slideId));
    },
    [commitLines]
  );

  const unlockCheckout = useCallback(() => {
    if (selectedLines.length > 0) {
      setCheckoutUnlocked(true);
    }
  }, [selectedLines.length]);

  const value = useMemo<WatchesPageState>(
    () => ({
      selectedLines,
      selectedCount,
      totalModels,
      isSelectionComplete,
      checkoutUnlocked,
      unitPrice: WATCHES_PRODUCT.unitPrice,
      total,
      isSlideSelected,
      selectWatch,
      incrementLineQuantity,
      decrementLineQuantity,
      removeSelectedWatch,
      unlockCheckout,
      scrollToCart,
    }),
    [
      selectedLines,
      selectedCount,
      totalModels,
      isSelectionComplete,
      checkoutUnlocked,
      total,
      isSlideSelected,
      selectWatch,
      incrementLineQuantity,
      decrementLineQuantity,
      removeSelectedWatch,
      unlockCheckout,
      scrollToCart,
    ]
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

export { WATCHES_PRODUCT } from "./config";
