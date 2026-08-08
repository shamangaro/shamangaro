"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 280;

export function WatchesScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("watches-order-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyCtaVisible(!entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="الرجوع لأعلى الصفحة"
          className={cn(
            "fixed start-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#1A5C42]/20 bg-white/90 text-[#1A5C42] shadow-md backdrop-blur-sm transition hover:bg-[#1A5C42] hover:text-white sm:start-6 sm:h-[3.25rem] sm:w-[3.25rem] lg:hidden",
            stickyCtaVisible ? "bottom-22 sm:bottom-24" : "bottom-4 sm:bottom-5"
          )}
        >
          <ArrowUp size={20} strokeWidth={2.25} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
