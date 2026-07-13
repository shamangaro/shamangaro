"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 280;

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [stickyCtaVisible, setStickyCtaVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("order-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyCtaVisible(!entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
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
          aria-label="الرجوع للأعلى"
          className={cn(
            "fixed start-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/40 bg-navy text-white shadow-xl shadow-navy/25 transition-all hover:scale-105 hover:bg-navy-light sm:start-6 sm:h-[3.25rem] sm:w-[3.25rem]",
            stickyCtaVisible ? "bottom-28 sm:bottom-32" : "bottom-6 sm:bottom-8"
          )}
        >
          <ArrowUp size={20} strokeWidth={2} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
