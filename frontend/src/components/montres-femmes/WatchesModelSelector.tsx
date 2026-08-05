"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { useWatchesPage, WATCH_VARIANTS } from "./WatchesPageContext";
import { formatWatchPrice, WATCHES_PRODUCT } from "./config";
import type { WatchVariantId } from "./config";

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

export function WatchesModelSelector() {
  const { variantId, setVariantId } = useWatchesPage();

  return (
    <section
      id="watches-selection"
      className="scroll-mt-24 bg-[#FAF7F2] py-8 sm:py-12"
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
              اختاري الساعة اللي عجباتك
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              {formatWatchPrice(WATCHES_PRODUCT.unitPrice)} للساعة · توصيل مجاني
            </p>
          </div>

          <div
            className="grid gap-3 sm:grid-cols-3 sm:gap-4"
            role="radiogroup"
            aria-label="اختاري موديل الساعة"
          >
            {WATCH_VARIANTS.map((variant) => {
              const selected = variantId === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setVariantId(variant.id as WatchVariantId)}
                  className={cn(
                    "relative flex min-h-[220px] flex-col items-center rounded-2xl border-2 p-4 pt-5 text-center transition-all sm:min-h-[260px] sm:p-5",
                    selected
                      ? "border-[#7B2D42] bg-white shadow-[0_10px_32px_rgba(123,45,66,0.14)]"
                      : "border-[#E8DFD4] bg-[#F7F3EE]/80 hover:border-[#C4A882]"
                  )}
                >
                  <div className="absolute start-4 top-4">
                    <RadioIndicator selected={selected} />
                  </div>
                  <div className="relative mx-auto mb-3 h-28 w-28 overflow-hidden rounded-2xl bg-[#F0EBE4] sm:h-32 sm:w-32">
                    <Image
                      src={variant.image}
                      alt={variant.label}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <p className="text-base font-bold text-[#2A1A1F] sm:text-lg">
                    {variant.label}
                  </p>
                  <p className="mt-0.5 text-sm text-[#666]">{variant.labelAr}</p>
                  <p className="mt-3 text-lg font-bold text-[#7B2D42]">
                    {formatWatchPrice(WATCHES_PRODUCT.unitPrice)}
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
