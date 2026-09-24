"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import { useWatchesPage } from "@/components/montres-femmes/WatchesPageContext";
import {
  scrollToWatchesCheckout,
  scrollToWatchesOrder,
} from "@/lib/scroll-to-watches-order";
import { FR_COPY, formatWatchPriceFr } from "./copy";

export function FrWatchesStickyCTA() {
  const [visible, setVisible] = useState(true);
  const { isSelectionComplete, total } = useWatchesPage();

  useEffect(() => {
    const form = document.getElementById("watches-order-form");
    let observer: IntersectionObserver | null = null;

    const observeCheckout = () => {
      observer?.disconnect();
      const checkout = document.getElementById("watches-checkout");
      if (!checkout) {
        setVisible(true);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
      );
      observer.observe(checkout);
    };

    observeCheckout();
    if (!form) {
      return () => observer?.disconnect();
    }

    const mutations = new MutationObserver(observeCheckout);
    mutations.observe(form, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [isSelectionComplete]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 ease-out lg:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-20 opacity-0"
      )}
      aria-hidden={!visible}
    >
      <button
        type="button"
        tabIndex={visible ? 0 : -1}
        onClick={() =>
          isSelectionComplete
            ? scrollToWatchesCheckout()
            : scrollToWatchesOrder()
        }
        className="mx-auto flex w-full max-w-lg items-center justify-center rounded-xl border border-[#B8924A]/45 bg-[#134A35] px-5 py-3 text-sm font-bold text-white shadow-md ring-1 ring-[#B8924A]/30 transition hover:bg-[#0A2F23]"
      >
        {isSelectionComplete
          ? FR_COPY.stickyConfirmCta(formatWatchPriceFr(total))
          : FR_COPY.stickyCta(formatWatchPriceFr(WATCHES_PRODUCT.unitPrice))}
      </button>
    </div>
  );
}
