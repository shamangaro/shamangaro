"use client";

import { useSelectedVariant, useWatchesPage } from "./WatchesPageContext";
import { formatWatchPrice } from "./config";

export function WatchesStickyCTA() {
  const { total, quantity, hasSelection } = useWatchesPage();
  const variant = useSelectedVariant();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DFD4] bg-[#FAF7F2]/95 p-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          {hasSelection && variant && quantity ? (
            <>
              <p className="truncate text-xs text-[#666]">
                {variant.label} × {quantity}
              </p>
              <p className="text-lg font-bold text-[#7B2D42]">
                {formatWatchPrice(total)}
              </p>
            </>
          ) : (
            <p className="text-sm text-[#666]">اختاري الموديل والعدد</p>
          )}
        </div>
        <a
          href="#watches-selection"
          className="shrink-0 rounded-xl bg-[#7B2D42] px-5 py-3 text-sm font-bold text-white shadow-md"
        >
          طلبي دابا
        </a>
      </div>
    </div>
  );
}
