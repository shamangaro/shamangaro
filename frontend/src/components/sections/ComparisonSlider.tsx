"use client";

import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import { GripVertical } from "lucide-react";

const BEFORE_IMAGE = "/images/neo-transat-comparison-without.png";
const AFTER_IMAGE = "/images/neo-transat-comparison-with.png";

export function ComparisonSlider() {
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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.currentTarget, e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 2));
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#f5f5f5] py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">
            الفرق واضح... والراحة كتستاهل
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            جرّب الفرق بنفسك
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto mt-8 max-w-3xl touch-none select-none overflow-hidden rounded-2xl bg-[#f0f0f0] shadow-xl shadow-black/10"
          style={{ aspectRatio: "4 / 3" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={(e) => endDrag(e.currentTarget, e.pointerId)}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-label="مقارنة الجلوس بلا و مع Neo Transat"
        >
          <img
            src={AFTER_IMAGE}
            alt="مع Neo Transat — راحة على الكرسي"
            width={1024}
            height={768}
            className="pointer-events-none absolute inset-0 h-full w-full"
            draggable={false}
            decoding="async"
          />

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={BEFORE_IMAGE}
              alt="بلا Neo Transat — جلوس على الرمل"
              width={1024}
              height={768}
              className="absolute inset-0 h-full w-full"
              draggable={false}
              decoding="async"
            />
          </div>

          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            بلا Neo Transat
          </span>
          <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            مع Neo Transat
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white/95 shadow-[0_0_8px_rgba(0,0,0,0.15)]"
            style={{
              left: `${position}%`,
              transform: "translateX(-50%)",
              transition: isDragging ? "none" : "left 80ms ease-out",
            }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy shadow-lg">
              <GripVertical size={18} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-navy/70 backdrop-blur-sm">
            ← اسحب للمقارنة →
          </p>
        </div>
      </Container>
    </section>
  );
}
