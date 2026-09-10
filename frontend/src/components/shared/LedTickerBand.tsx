"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandBandClasses, feminineBandClasses } from "@/lib/brand-band";
import { WatchesGreenPattern } from "@/lib/watches-green-pattern";

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
  variant?: "dark" | "light" | "brand" | "feminine-brand" | "feminine-red";
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
  const isFeminineBrand = variant === "feminine-brand";
  const isFeminineRed = variant === "feminine-red";
  const isBrandLike = isBrand || isFeminineBrand;

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

  const iconClass = isFeminineRed
    ? "text-[#9B3A4A]"
    : isFeminineBrand
      ? "text-[#D4BC82]"
      : "text-gold";

  const labelClass = isFeminineRed
    ? "text-[#8B2942] [text-shadow:0_1px_0_rgba(255,255,255,0.9)]"
    : isLight
      ? "text-navy"
      : isFeminineBrand
        ? "text-white [text-shadow:0_0_10px_rgba(184,146,74,0.22)]"
        : "text-white [text-shadow:0_0_12px_rgba(212,168,83,0.35)]";

  const iconBoxClass = isFeminineRed
    ? "border-[#D4909A]/55 bg-white/70 shadow-[0_0_10px_rgba(183,60,80,0.12)]"
    : isLight
      ? "border-gold/40 shadow-none"
      : isFeminineBrand
        ? "border-[#B8924A]/35 bg-white/10 shadow-[0_0_12px_rgba(184,146,74,0.18)]"
        : isBrand
          ? "border-gold/30 shadow-none"
          : "border-gold/35 shadow-[0_0_14px_rgba(212,168,83,0.25)]";

  const diamondClass = isFeminineRed
    ? "text-[#C96B7A]/55"
    : isFeminineBrand
      ? "text-[#B8924A]/45"
      : isLight
        ? "text-gold/50"
        : "text-gold/35";

  return (
    <div
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn(
        "relative overflow-hidden border-y",
        isBrand
          ? brandBandClasses.root
          : isFeminineBrand
            ? feminineBandClasses.root
            : isFeminineRed
              ? "border-[#E5A8B2]/60 bg-gradient-to-r from-[#FFF8F9] via-[#FDEEF1] to-[#FFF8F9] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
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
            : isFeminineBrand
              ? "via-[#B8924A]/45"
              : isFeminineRed
                ? "via-[#C96B7A]/50"
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
            : isFeminineBrand
              ? "via-[#B8924A]/28"
              : isFeminineRed
                ? "via-[#C96B7A]/28"
                : isLight
                  ? "via-navy/10"
                  : "via-gold/50"
        )}
      />
      {!isLight && !isBrandLike ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            isFeminineRed ? "opacity-[0.035]" : "opacity-[0.07]"
          )}
          style={{
            backgroundImage: isFeminineRed
              ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(201,107,122,0.55) 2px, rgba(201,107,122,0.55) 3px)"
              : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,168,83,0.35) 2px, rgba(212,168,83,0.35) 3px)",
          }}
        />
      ) : null}
      {isFeminineBrand ? <WatchesGreenPattern /> : null}
      {isFeminineRed ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,transparent_72%)]"
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
                  className={iconClass}
                  strokeWidth={2.25}
                />
                <span
                  className={cn(
                    "font-bold tracking-wide",
                    isFeminineRed ? "text-[#8B2942]" : isLight ? "text-navy" : "text-white",
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
            "relative mx-auto flex max-w-3xl items-center justify-center overflow-hidden px-10 h-7 sm:h-8"
          )}
        >
          {!isVertical || isFeminineBrand ? (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute text-[8px] sm:text-[10px]",
                  isVertical ? "start-3 sm:start-6" : "start-4 sm:start-8",
                  diamondClass
                )}
              >
                ◆
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute text-[8px] sm:text-[10px]",
                  isVertical ? "end-3 sm:end-6" : "end-4 sm:end-8",
                  diamondClass
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
                isVertical && "absolute inset-0 px-3 sm:px-6"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-sm border bg-gold/10",
                  iconBoxClass,
                  compact ? "h-5 w-5 sm:h-6 sm:w-6" : "h-7 w-7"
                )}
              >
                <Icon size={compact ? 12 : 14} className={iconClass} strokeWidth={2.25} />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap font-bold tracking-[0.1em]",
                  labelClass,
                  compact ? "text-[11px] sm:text-xs" : "text-sm sm:text-[15px]"
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
