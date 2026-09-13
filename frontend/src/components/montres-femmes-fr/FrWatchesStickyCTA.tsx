"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import { scrollToWatchesOrder } from "@/lib/scroll-to-watches-order";
import { FR_COPY, formatWatchPriceFr } from "./copy";

export function FrWatchesStickyCTA() {
  const [visible, setVisible] = useState(true);

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
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <button
            type="button"
            onClick={() => scrollToWatchesOrder()}
            className="mx-auto flex w-full max-w-lg items-center justify-center rounded-xl border border-[#B8924A]/45 bg-[#134A35] px-5 py-3 text-sm font-bold text-white shadow-md ring-1 ring-[#B8924A]/30 transition hover:bg-[#0A2F23]"
          >
            {FR_COPY.stickyCta(formatWatchPriceFr(WATCHES_PRODUCT.unitPrice))}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
