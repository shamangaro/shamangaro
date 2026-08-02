"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandBandClasses } from "@/lib/brand-band";

export type LedTickerItem = {
  label: string;
  icon: LucideIcon;
};

type LedTickerBandProps = {
  items: LedTickerItem[];
  ariaLabel: string;
  intervalMs?: number;
  className?: string;
  compact?: boolean;
  animation?: "horizontal" | "vertical";
  variant?: "dark" | "light" | "brand";
};

export function LedTickerBand({
  items,
  ariaLabel,
  intervalMs = 2800,
  className,
  compact = false,
  animation = "horizontal",
  variant = "dark",
}: LedTickerBandProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion || items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, items.length, reduceMotion]);

  const item = items[active];
  const Icon = item.icon;
  const isVertical = animation === "vertical";
  const isLight = variant === "light";
  const isBrand = variant === "brand";

  const motionProps = isVertical
    ? {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "-100%", opacity: 0 },
        transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] as const },
      }
    : {
        initial: { opacity: 0, x: 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -28 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn(
        "relative overflow-hidden border-y",
        isBrand
          ? brandBandClasses.root
          : isLight
            ? "border-navy/10 bg-white"
            : "border-gold/45 bg-[#060c12]",
        compact ? "py-1.5 sm:py-2" : "py-3 sm:py-3.5",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
          isBrand
            ? "via-gold/55"
            : isLight
              ? "via-gold/45"
              : "via-gold/80"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent",
          isBrand
            ? "via-gold/35"
            : isLight
              ? "via-navy/10"
              : "via-gold/50"
        )}
      />
      {!isLight && !isBrand ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,168,83,0.35) 2px, rgba(212,168,83,0.35) 3px)",
          }}
        />
      ) : null}

      {reduceMotion ? (
        <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 sm:gap-x-8">
          {items.map((highlight) => {
            const HighlightIcon = highlight.icon;
            return (
              <div key={highlight.label} className="flex items-center gap-2.5">
                <HighlightIcon
                  size={compact ? 12 : 13}
                  className="text-gold"
                  strokeWidth={2.25}
                />
                <span
                  className={cn(
                    "font-bold tracking-wide",
                    isLight ? "text-navy" : "text-white",
                    compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
                  )}
                >
                  {highlight.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={cn(
            "relative mx-auto flex max-w-3xl items-center justify-center overflow-hidden px-10",
            compact ? "h-5 sm:h-6" : "h-6 sm:h-7"
          )}
        >
          {!isVertical ? (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute start-4 text-[10px] sm:start-8",
                  isLight ? "text-gold/50" : "text-gold/35"
                )}
              >
                ◆
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute end-4 text-[10px] sm:end-8",
                  isLight ? "text-gold/50" : "text-gold/35"
                )}
              >
                ◆
              </span>
            </>
          ) : null}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.label}
              {...motionProps}
              className={cn(
                "flex items-center justify-center gap-2 sm:gap-2.5",
                isVertical && "absolute inset-x-0 px-3 sm:px-6"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-sm border bg-gold/10",
                  isLight
                    ? "border-gold/40 shadow-none"
                    : isBrand
                      ? "border-gold/30 shadow-none"
                      : "border-gold/35 shadow-[0_0_14px_rgba(212,168,83,0.25)]",
                  compact ? "h-6 w-6" : "h-7 w-7"
                )}
              >
                <Icon
                  size={compact ? 12 : 14}
                  className="text-gold"
                  strokeWidth={2.25}
                />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap font-bold tracking-[0.08em]",
                  isLight
                    ? "text-navy"
                    : "text-white [text-shadow:0_0_12px_rgba(212,168,83,0.35)]",
                  compact
                    ? "text-[11px] sm:text-xs"
                    : "text-sm sm:text-[15px]"
                )}
              >
                {item.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
