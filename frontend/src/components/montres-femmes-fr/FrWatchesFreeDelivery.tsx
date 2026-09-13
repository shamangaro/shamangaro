import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FR_COPY } from "./copy";

export function FrWatchesFreeDeliveryStrip({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[#D4BC82]/45",
        "bg-gradient-to-r from-[#8F6E2E] via-[#B8924A] to-[#8F6E2E]",
        className
      )}
      role="note"
      aria-label={FR_COPY.deliveryFull}
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
          {FR_COPY.deliveryFull}
        </span>
        <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />
        <span className="text-xs font-semibold text-white/95 sm:text-sm">
          {FR_COPY.deliveryDetail}
        </span>
      </div>
    </div>
  );
}
