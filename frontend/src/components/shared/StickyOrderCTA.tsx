"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function StickyOrderCTA() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const form = document.getElementById("order-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/10 bg-white/95 px-4 py-2 shadow-[0_-4px_20px_rgba(17,17,17,0.1)] backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="mx-auto max-w-lg">
            <motion.button
              type="button"
              onClick={scrollToOrder}
              animate={{
                scale: [1, 1.015, 1],
                boxShadow: [
                  "0 6px 20px rgba(17, 17, 17, 0.15)",
                  "0 8px 28px rgba(17, 17, 17, 0.3)",
                  "0 6px 20px rgba(17, 17, 17, 0.15)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full min-h-12 rounded-full bg-navy py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-navy-light"
            >
              أطلب الآن
            </motion.button>
            <p className="mt-1 text-center text-xs font-medium text-muted-foreground">
              الدفع عند الإستلام · بدون دفع مسبق
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
