"use client";

import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandBandClasses } from "@/lib/brand-band";

type OrderCtaButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "default" | "compact";
};

export function OrderCtaButton({
  children,
  className,
  href,
  onClick,
  size = "default",
}: OrderCtaButtonProps) {
  const content = (
    <>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
      <span
        className={cn(
          "flex items-center justify-center gap-2.5 sm:gap-3",
          size === "compact" ? "gap-2" : "gap-2.5 sm:gap-3"
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10",
            size === "compact" ? "h-7 w-7" : "h-8 w-8"
          )}
        >
          <ShoppingBag
            size={size === "compact" ? 14 : 16}
            className="text-gold"
            strokeWidth={2.25}
          />
        </span>
        <span
          className={cn(
            "font-extrabold tracking-[0.02em] text-white",
            size === "compact"
              ? "text-[15px] leading-none"
              : "text-base sm:text-[17px]"
          )}
        >
          {children}
        </span>
        <ChevronLeft
          size={size === "compact" ? 15 : 16}
          className="shrink-0 text-gold/75 transition-transform duration-300 group-hover:-translate-x-0.5"
          strokeWidth={2.5}
        />
      </span>
    </>
  );

  const buttonClassName = cn(
    "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl ring-1 ring-gold/20 shadow-[0_10px_28px_rgba(17,17,17,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(17,17,17,0.3)] active:translate-y-0 active:scale-[0.99]",
    brandBandClasses.gradient,
    size === "compact" ? "px-4 py-3" : "px-6 py-4",
    className
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      {content}
    </button>
  );
}
