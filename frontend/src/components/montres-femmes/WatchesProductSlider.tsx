"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WATCH_SLIDES } from "./config";
import { useWatchesPage } from "./WatchesPageContext";
import {
  watchSelectionFromSlide,
  WATCH_SELECTION_COPY,
} from "./watch-selection-utils";

const SWIPE_THRESHOLD = 48;
const TAP_MOVE_THRESHOLD = 10;
const TOAST_DURATION_MS = 2200;

export function WatchesProductSlider() {
  const { isSlideSelected, selectWatch } = useWatchesPage();
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectingRef = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const slide = WATCH_SLIDES[index];
  const watch = watchSelectionFromSlide(slide);
  const selected = isSlideSelected(slide);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((next + WATCH_SLIDES.length) % WATCH_SLIDES.length);
  }, []);

  const handleSelectWatch = useCallback(() => {
    if (selectingRef.current) return;

    selectingRef.current = true;
    const result = selectWatch(watch);
    selectingRef.current = false;

    if (result === "added") {
      showToast(WATCH_SELECTION_COPY.addedToast);
    }
  }, [selectWatch, showToast, watch]);

  const onSlidePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSlidePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;
    const dx = Math.abs(e.clientX - dragRef.current.startX);
    const dy = Math.abs(e.clientY - dragRef.current.startY);
    if (dx > TAP_MOVE_THRESHOLD || dy > TAP_MOVE_THRESHOLD) {
      dragRef.current.moved = true;
    }
  };

  const onSlidePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragRef.current.startX;
    const wasMove = dragRef.current.moved;
    dragRef.current.pointerId = -1;

    if (wasMove && Math.abs(dx) >= SWIPE_THRESHOLD) {
      goTo(dx > 0 ? index + 1 : index - 1);
    }
  };

  return (
    <div className="space-y-2">
      {toast && (
        <p
          role="status"
          aria-live="polite"
          className="rounded-xl bg-[#1A5C42] px-3 py-2 text-center text-xs font-semibold text-white"
        >
          {toast}
        </p>
      )}

      <div className="group relative">
        <div
          className={cn(
            "relative touch-pan-y overflow-hidden rounded-xl bg-[#0F2A1F]/5 transition-shadow",
            selected
              ? "ring-[3px] ring-[#1A5C42] ring-offset-2"
              : "ring-1 ring-[#B8924A]/20"
          )}
        >
          <div
            className={cn(
              "relative mx-auto aspect-square w-full max-h-[320px] touch-pan-y sm:max-h-[360px]",
              selected && "outline outline-[3px] outline-[#1A5C42] outline-offset-[-3px]"
            )}
            onPointerDown={onSlidePointerDown}
            onPointerMove={onSlidePointerMove}
            onPointerUp={onSlidePointerUp}
            onPointerCancel={() => {
              dragRef.current.pointerId = -1;
            }}
            aria-label={
              selected
                ? `${slide.caption} — ${WATCH_SELECTION_COPY.addedWatch}`
                : slide.caption
            }
          >
            {WATCH_SLIDES.map((item, i) => (
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                fill
                priority={i === 0}
                draggable={false}
                className={cn(
                  "pointer-events-none object-contain object-center transition-opacity duration-500",
                  i === index ? "opacity-100" : "opacity-0",
                  selected && i === index && "brightness-[0.95] saturate-[0.9]"
                )}
                sizes="(max-width: 640px) 90vw, 576px"
              />
            ))}

            {selected && (
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-[#1A5C42]/15"
                aria-hidden
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-[#0F2A1F]/80 via-[#0F2A1F]/25 to-transparent px-3 pb-3 pt-10">
              <p className="text-xs font-bold text-white">{slide.caption}</p>
              <p className="mt-0.5 text-[10px] text-white/90">
                {watch.watchName} · {watch.modelNumber}
              </p>
            </div>

            <span className="pointer-events-none absolute start-2 top-2 z-[2] rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-semibold text-white">
              {index + 1}/{WATCH_SLIDES.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSelectWatch}
            onPointerDown={(e) => e.stopPropagation()}
            aria-pressed={selected}
            aria-label={`${
              selected
                ? WATCH_SELECTION_COPY.addedWatch
                : WATCH_SELECTION_COPY.selectWatchAria
            } — ${slide.caption}`}
            className={cn(
              "relative z-20 flex w-full items-center justify-center gap-2 border-t px-3 py-2.5 text-sm font-bold transition",
              selected
                ? "border-[#1A5C42] bg-[#1A5C42] text-white"
                : "border-[#D8E8DC] bg-white text-[#0F2A1F] hover:bg-[#FAF7F2]"
            )}
          >
            {selected && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
            {selected
              ? WATCH_SELECTION_COPY.addedWatch
              : WATCH_SELECTION_COPY.selectWatch}
          </button>

          <button
            type="button"
            aria-label="الصورة السابقة"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => goTo(index - 1)}
            className="absolute start-1.5 top-[calc(50%-28px)] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="الصورة التالية"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => goTo(index + 1)}
            className="absolute end-1.5 top-[calc(50%-28px)] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
