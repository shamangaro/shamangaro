"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_WATCH_VARIANT,
  WATCH_VARIANTS,
  type WatchVariantId,
} from "./config";
import { useWatchesPage } from "./WatchesPageContext";
import {
  watchSelectionFromVariant,
  WATCH_SELECTION_COPY,
} from "./watch-selection-utils";

const TOAST_DURATION_MS = 2200;

export function WatchesProductSlider() {
  const { selectedLines, selectWatch } = useWatchesPage();
  const [activeId, setActiveId] =
    useState<WatchVariantId>(DEFAULT_WATCH_VARIANT);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const variant =
    WATCH_VARIANTS.find((item) => item.id === activeId) ?? WATCH_VARIANTS[0];
  const watch = watchSelectionFromVariant(variant);
  const selected = selectedLines.some((line) => line.variantId === variant.id);
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const scrollThumbs = (direction: -1 | 1) => {
    const scroller = thumbsRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * 96, behavior: "smooth" });
  };

  const handleSelectWatch = useCallback(() => {
    const result = selectWatch(watch);
    if (result === "added") {
      setToast(WATCH_SELECTION_COPY.addedToast);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
    }
  }, [selectWatch, watch]);

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "relative scroll-mt-24 overflow-hidden rounded-2xl border bg-white shadow-sm ring-1",
          selected
            ? "border-[#134A35] ring-[#134A35]/40"
            : "border-[#A8C9B4] ring-[#B8924A]/25"
        )}
        id="watches-hero-photo"
      >
        {toast ? (
          <p
            role="status"
            aria-live="polite"
            className="absolute inset-x-3 top-3 z-10 rounded-xl bg-[#134A35] px-3 py-2 text-center text-xs font-semibold text-white"
          >
            {toast}
          </p>
        ) : null}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
          <Image
            src={variant.image}
            alt={variant.labelAr}
            fill
            priority
            className="object-contain object-center p-3"
            sizes="(max-width: 640px) 100vw, 576px"
          />
        </div>
      </div>

      <div className="relative">
        <div
          ref={thumbsRef}
          dir="ltr"
          className="flex gap-1.5 overflow-x-auto scroll-smooth px-8 py-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {WATCH_VARIANTS.map((item) => {
            const isActive = item.id === variant.id;
            const isInCart = selectedLines.some(
              (line) => line.variantId === item.id
            );

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-pressed={isActive}
                aria-label={`${item.labelAr} — ${item.label}`}
                className={cn(
                  "h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-white transition",
                  isActive
                    ? "border-[#134A35] ring-2 ring-[#134A35]"
                    : "border-[#D8E8DC] hover:border-[#134A35]/40"
                )}
              >
                <div className="relative h-full w-full overflow-hidden bg-[#E8F5ED]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                  {isInCart ? (
                    <span className="absolute start-0.5 top-0.5 flex h-3.5 w-4 items-center justify-center rounded-full bg-[#134A35] text-white">
                      <Check className="h-2 w-2" strokeWidth={3} />
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbs(-1)}
          aria-label="الساعات السابقة"
          className="absolute end-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#A8C9B4] bg-white text-[#134A35] shadow-sm"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => scrollThumbs(1)}
          aria-label="الساعات التالية"
          className="absolute start-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#A8C9B4] bg-white text-[#134A35] shadow-sm"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleSelectWatch}
        aria-pressed={selected}
        aria-label={`${
          selected
            ? WATCH_SELECTION_COPY.addedWatch
            : WATCH_SELECTION_COPY.selectWatchAria
        } — ${variant.labelAr}`}
        className={cn(
          "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-3 py-3 text-sm font-bold text-white shadow-md transition",
          selected
            ? "border border-black bg-black"
            : "watches-select-cta border border-[#D4BC82]/45 bg-gradient-to-r from-[#8F6E2E] via-[#B8924A] to-[#8F6E2E] hover:brightness-110"
        )}
      >
        {selected ? (
          <>
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            {WATCH_SELECTION_COPY.addedWatch}
          </>
        ) : (
          WATCH_SELECTION_COPY.selectWatch
        )}
      </button>
    </div>
  );
}
