"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { useWatchesPage } from "./WatchesPageContext";
import { formatWatchPrice, WATCH_QUANTITY_OPTIONS } from "./config";
import type { WatchQuantity } from "./WatchesPageContext";

function RadioIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
        selected
          ? "border-[#B8924A] bg-[#B8924A]"
          : "border-[#D4C4B8] bg-white"
      )}
      aria-hidden
    >
      {selected && <span className="h-2 w-2 rounded-full bg-white" />}
    </span>
  );
}

export function WatchesQuantitySelector() {
  const { quantity, setQuantity } = useWatchesPage();

  return (
    <section className="bg-white py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
              اختاري العدد
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              نفس الموديل اللي اختارتيه · بدون خصومات
            </p>
          </div>

          <div
            className="grid gap-3 sm:grid-cols-3"
            role="radiogroup"
            aria-label="اختاري العدد"
          >
            {WATCH_QUANTITY_OPTIONS.map((option) => {
              const selected = quantity === option.quantity;
              return (
                <button
                  key={option.quantity}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setQuantity(option.quantity as WatchQuantity)}
                  className={cn(
                    "relative flex min-h-[120px] flex-col items-center justify-center rounded-2xl border-2 px-4 py-5 text-center transition-all sm:min-h-[132px]",
                    selected
                      ? "border-[#7B2D42] bg-[#FAF7F2] shadow-[0_8px_28px_rgba(123,45,66,0.12)]"
                      : "border-[#E8DFD4] bg-white hover:border-[#C4A882]"
                  )}
                >
                  <div className="absolute start-4 top-4">
                    <RadioIndicator selected={selected} />
                  </div>
                  <p className="text-base font-bold text-[#2A1A1F] sm:text-lg">
                    {option.label}
                  </p>
                  <p className="mt-2 text-xl font-bold text-[#7B2D42] sm:text-2xl">
                    {formatWatchPrice(option.total)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
