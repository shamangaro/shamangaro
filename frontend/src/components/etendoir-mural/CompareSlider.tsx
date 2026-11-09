"use client";

import { useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import type { EtendoirLang } from "./copy";
import { ETENDOIR_COPY } from "./copy";

const ROPE_IMAGE = "/images/etendoir-mural/compare-balcony-rope.jpg";
const PRODUCT_IMAGE = "/images/etendoir-mural/compare-balcony-product.jpg";

export function CompareSlider({ lang }: { lang: EtendoirLang }) {
  const copy = ETENDOIR_COPY[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.max(4, Math.min(96, next)));
  }, []);

  const endDrag = useCallback((target: HTMLElement, pointerId: number) => {
    setIsDragging(false);
    if (target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(event.clientX);
  };

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="relative mx-auto aspect-[16/9] w-full touch-none select-none overflow-hidden rounded-2xl border border-[#D4D4D4] bg-[#E5E5E5] shadow-sm"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => endDrag(event.currentTarget, event.pointerId)}
      onPointerCancel={(event) => endDrag(event.currentTarget, event.pointerId)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setPosition((value) => Math.max(4, value - 2));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setPosition((value) => Math.min(96, value + 2));
        }
      }}
      tabIndex={0}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label={copy.compareLabel}
    >
      <img
        src={PRODUCT_IMAGE}
        alt={copy.compareAfter}
        width={1600}
        height={900}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={ROPE_IMAGE}
          alt={copy.compareBefore}
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          decoding="async"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-[#121212]/85 px-2.5 py-1 text-[11px] font-semibold text-white">
        {copy.compareBefore}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-[#121212]/85 px-2.5 py-1 text-[11px] font-semibold text-white">
        {copy.compareAfter}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          transition: isDragging ? "none" : "left 80ms ease-out",
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#DA0037] shadow-md">
          <GripVertical size={18} className="text-white" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
