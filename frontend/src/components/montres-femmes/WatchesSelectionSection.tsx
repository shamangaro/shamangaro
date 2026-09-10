"use client";



import Image from "next/image";

import { Minus, Plus } from "lucide-react";

import { formatWatchPrice } from "./config";

import { useWatchesPage } from "./WatchesPageContext";

import { WatchesProductSlider } from "./WatchesProductSlider";

import { WATCH_SELECTION_COPY } from "./watch-selection-utils";



export function WatchesSelectionSection({

  onContinue,

}: {

  onContinue: () => void;

}) {

  const {

    selectedLines,

    selectedCount,

    totalModels,

    isSelectionComplete,

    total,

    unitPrice,

    incrementLineQuantity,

    decrementLineQuantity,

    removeSelectedWatch,

    unlockCheckout,

  } = useWatchesPage();



  const handleContinue = () => {

    if (!isSelectionComplete) return;

    unlockCheckout();

    onContinue();

  };



  return (

    <div className="space-y-3">

      <WatchesProductSlider />



      {selectedLines.length === 0 ? (

        <p className="rounded-xl border border-dashed border-[#A8C9B4] bg-[#FAF7F2]/80 px-3 py-2.5 text-center text-xs text-[#666]">

          {WATCH_SELECTION_COPY.browseHint}

        </p>

      ) : (

        <div

          id="watches-cart"

          className="scroll-mt-20 space-y-2.5 rounded-xl border border-[#D8E8DC] bg-white p-3"

        >

          <h3 className="text-sm font-bold text-[#0F2A1F]">

            {WATCH_SELECTION_COPY.cartTitle}

          </h3>



          <ul className="space-y-2">

            {selectedLines.map((line) => (

              <li

                key={line.slideId}
                id={`watch-card-${line.slideId}`}

                className="rounded-xl border border-[#D8E8DC] bg-[#FAF7F2] p-2.5"

              >

                <div className="flex items-center gap-2.5">

                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-[#B8924A]/20">

                    <Image

                      src={line.image}

                      alt={line.watchName}

                      fill

                      className="object-cover"

                      sizes="80px"

                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-bold text-[#0F2A1F]">
                      {line.watchName}
                    </p>

                    <p className="text-[11px] text-[#666]">

                      {WATCH_SELECTION_COPY.unitPriceLabel}:{" "}

                      {formatWatchPrice(line.unitPrice)}

                    </p>

                    <p className="text-[11px] font-semibold text-[#134A35]">

                      {formatWatchPrice(line.subtotal)}

                    </p>

                  </div>

                </div>



                <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#D8E8DC] pt-2">

                  <div className="flex items-center gap-2">

                    <button

                      type="button"

                      aria-label="نقصي الكمية"

                      onClick={() => decrementLineQuantity(line.slideId)}

                      disabled={line.quantity <= 1}

                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A8C9B4] bg-white text-[#134A35] disabled:opacity-40"

                    >

                      <Minus className="h-4 w-4" />

                    </button>

                    <span className="min-w-[24px] text-center text-base font-bold text-[#0F2A1F]">

                      {line.quantity}

                    </span>

                    <button

                      type="button"

                      aria-label="زيدي الكمية"

                      onClick={() => incrementLineQuantity(line.slideId)}

                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#134A35] text-white"

                    >

                      <Plus className="h-4 w-4" />

                    </button>

                  </div>

                  <button

                    type="button"

                    onClick={() => removeSelectedWatch(line.slideId)}

                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"

                  >

                    {WATCH_SELECTION_COPY.remove}

                  </button>

                </div>

              </li>

            ))}

          </ul>



          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg bg-[#E8F5ED] px-3 py-2 text-xs">

            <span className="font-semibold text-[#0F2A1F]">

              {WATCH_SELECTION_COPY.modelsSelected(totalModels)} ·{" "}

              {WATCH_SELECTION_COPY.totalQuantity(selectedCount)}

            </span>

            <span className="font-bold text-[#134A35]">

              {WATCH_SELECTION_COPY.totalPriceLabel}: {formatWatchPrice(total)}

            </span>

          </div>



          <p className="text-center text-[11px] text-[#666]">

            {formatWatchPrice(unitPrice)} / ساعة · توصيل مجاني

          </p>

        </div>

      )}



      {isSelectionComplete ? (
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-xl bg-[#134A35] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0A2F23]"
        >
          {WATCH_SELECTION_COPY.continueOrder}
        </button>
      ) : null}

    </div>

  );

}