"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

const announcements = [
  { icon: "🚚", text: "توصيل مجاني لجميع مدن المغرب" },
  { icon: "💵", text: "الدفع عند الاستلام" },
];

function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, 4000);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = announcements[index];

  return (
    <div
      className="border-b border-white/10 bg-navy"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative mx-auto h-9 overflow-hidden px-4">
        {reduceMotion ? (
          <p className="flex h-9 items-center justify-center gap-1.5 text-[13px] font-medium tracking-wide text-white/90 sm:text-sm">
            <span aria-hidden="true">{active.icon}</span>
            <span>{active.text}</span>
          </p>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-x-4 flex h-9 items-center justify-center gap-1.5 text-[13px] font-medium tracking-wide text-white/90 sm:text-sm"
            >
              <span aria-hidden="true">{active.icon}</span>
              <span>{active.text}</span>
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />

      {/* Sticky header */}
      <header
        className={cn(
          "border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300",
          scrolled ? "border-border shadow-sm" : "border-transparent"
        )}
      >
        <Container>
          <div className="flex h-14 items-center justify-between">
            <a href="/" className="inline-flex shrink-0 items-center">
              <img
                src="/images/logo-shamangaro.svg"
                alt="SHAMANGARO"
                width={380}
                height={88}
                className="block h-9 w-auto md:h-10"
                fetchPriority="high"
                decoding="async"
              />
            </a>

            <a
              href="#order"
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md"
            >
              أطلب الآن
            </a>
          </div>
        </Container>
      </header>
    </div>
  );
}
