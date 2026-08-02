import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { freeDelivery } from "@/config/site";

type FreeDeliveryBannerProps = {
  className?: string;
  size?: "default" | "compact";
};

/** Prominent card — hero, order form */
export function FreeDeliveryBanner({
  className,
  size = "default",
}: FreeDeliveryBannerProps) {
  const compact = size === "compact";

  return (
    <div
      className={cn(
        "delivery-glow relative overflow-hidden rounded-xl",
        "border border-emerald-200/80",
        "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70",
        compact ? "px-4 py-3.5" : "px-5 py-4 sm:px-6 sm:py-5",
        className
      )}
      role="note"
      aria-label={freeDelivery.full}
    >
      <div
        className="pointer-events-none absolute -start-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-3.5 sm:items-center sm:gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl",
            "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
            "shadow-[0_4px_14px_rgba(16,185,129,0.35)]",
            compact ? "h-10 w-10" : "h-11 w-11 sm:h-12 sm:w-12"
          )}
        >
          <Truck size={compact ? 20 : 22} strokeWidth={2} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 text-start">
          <p
            className={cn(
              "font-bold leading-snug text-emerald-900",
              compact ? "text-[15px]" : "text-base sm:text-[17px]"
            )}
          >
            {freeDelivery.headline}
          </p>

          <p
            className={cn(
              "mt-0.5 font-semibold text-emerald-700",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {freeDelivery.subline}
          </p>

          <p
            className={cn(
              "mt-1 text-emerald-800/55",
              compact ? "text-[11px]" : "text-xs sm:text-[13px]"
            )}
          >
            {freeDelivery.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

type FreeDeliveryStripProps = {
  className?: string;
};

/** Full-width green bar between LP sections */
export function FreeDeliveryStrip({ className }: FreeDeliveryStripProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-emerald-500/20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600",
        className
      )}
      role="note"
      aria-label={freeDelivery.full}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-3 text-center sm:gap-x-6 sm:py-3.5">
        <span className="flex items-center gap-2 text-sm font-bold text-white sm:text-base">
          <Truck size={18} strokeWidth={2.25} aria-hidden="true" />
          {freeDelivery.full}
        </span>
        <span className="hidden h-4 w-px bg-white/35 sm:block" aria-hidden="true" />
        <span className="text-xs font-semibold text-white/90 sm:text-sm">
          {freeDelivery.detail}
        </span>
      </div>
    </div>
  );
}

/** Inline pill for tight spaces (sticky CTA, form footer) */
export function FreeDeliveryPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800",
        className
      )}
    >
      <Truck size={13} strokeWidth={2.25} aria-hidden="true" />
      {freeDelivery.full}
    </span>
  );
}
