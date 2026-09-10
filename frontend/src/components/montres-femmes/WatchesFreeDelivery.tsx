import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { WATCHES_DELIVERY } from "./config";

type WatchesFreeDeliveryBannerProps = {
  className?: string;
  size?: "default" | "compact";
};

/** Carte livraison — palette LP khdar + or */
export function WatchesFreeDeliveryBanner({
  className,
  size = "default",
}: WatchesFreeDeliveryBannerProps) {
  const compact = size === "compact";

  return (
    <div
      className={cn(
        "watches-delivery-glow relative overflow-hidden rounded-2xl",
        "border border-[#B8924A]/50 bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8F5ED]",
        "ring-1 ring-[#B8924A]/25",
        compact ? "px-4 py-3.5" : "px-5 py-4 sm:px-6 sm:py-5",
        className
      )}
      role="note"
      aria-label={WATCHES_DELIVERY.full}
    >
      <div
        className="pointer-events-none absolute -start-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#B8924A]/20 blur-2xl"
        aria-hidden
      />

      <div className="relative flex items-start gap-3.5 sm:items-center sm:gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl",
            "bg-gradient-to-br from-[#B8924A] to-[#8F6E2E] text-white",
            "shadow-[0_4px_14px_rgba(184,146,74,0.35)] ring-1 ring-[#D4BC82]/50",
            compact ? "h-10 w-10" : "h-11 w-11 sm:h-12 sm:w-12"
          )}
        >
          <Truck size={compact ? 20 : 22} strokeWidth={2} aria-hidden />
        </div>

        <div className="min-w-0 flex-1 text-start">
          <p
            className={cn(
              "font-bold leading-snug text-[#0A2F23]",
              compact ? "text-[15px]" : "text-base sm:text-[17px]"
            )}
          >
            {WATCHES_DELIVERY.headline}
          </p>
          <p
            className={cn(
              "mt-0.5 font-semibold text-[#B8924A]",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {WATCHES_DELIVERY.subline}
          </p>
          <p
            className={cn(
              "mt-1 text-[#4A5C52]",
              compact ? "text-[11px]" : "text-xs sm:text-[13px]"
            )}
          >
            {WATCHES_DELIVERY.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

type WatchesFreeDeliveryStripProps = {
  className?: string;
};

/** Barre pleine largeur — or LP, offre visible */
export function WatchesFreeDeliveryStrip({
  className,
}: WatchesFreeDeliveryStripProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[#D4BC82]/45",
        "bg-gradient-to-r from-[#8F6E2E] via-[#B8924A] to-[#8F6E2E]",
        className
      )}
      role="note"
      aria-label={WATCHES_DELIVERY.full}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0A2F23]/25 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 py-2.5 text-center sm:gap-x-5 sm:py-3">
        <span className="flex items-center gap-2 text-sm font-bold text-white sm:text-base">
          <Truck
            size={18}
            strokeWidth={2.25}
            className="text-white drop-shadow-sm"
            aria-hidden
          />
          {WATCHES_DELIVERY.full}
        </span>
        <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />
        <span className="text-xs font-semibold text-white/95 sm:text-sm">
          {WATCHES_DELIVERY.detail}
        </span>
      </div>
    </div>
  );
}
