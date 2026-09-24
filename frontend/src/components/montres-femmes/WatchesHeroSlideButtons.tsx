"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface WatchesHeroSlideButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  current: number;
  total: number;
}

const buttonClassName =
  "group absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#134A35] shadow-[0_8px_28px_rgba(10,47,35,0.18)] backdrop-blur-md transition hover:scale-105 hover:border-[#B8924A]/50 hover:bg-[#134A35] hover:text-white active:scale-95 sm:h-12 sm:w-12";

export function WatchesHeroSlideButtons({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  current,
  total,
}: WatchesHeroSlideButtonsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className={`${buttonClassName} left-2 sm:left-3`}
      >
        <ChevronLeft
          className="h-5 w-5 transition group-hover:-translate-x-px"
          strokeWidth={2.25}
          aria-hidden
        />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={`${buttonClassName} right-2 sm:right-3`}
      >
        <ChevronRight
          className="h-5 w-5 transition group-hover:translate-x-px"
          strokeWidth={2.25}
          aria-hidden
        />
      </button>
      <p className="pointer-events-none absolute inset-x-0 bottom-3 z-20 text-center text-[10px] font-medium tracking-[0.18em] text-[#134A35]/40">
        {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </>
  );
}
