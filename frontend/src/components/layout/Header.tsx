"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useCart } from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";

const announcements = [
  { icon: "🚚", text: "توصيل مجاني لجميع مدن المغرب" },
  { icon: "💵", text: "الدفع عند الاستلام" },
];

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/#order", label: "الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
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
    <div aria-live="polite" aria-atomic="true">
      <motion.div
        className="relative overflow-hidden border-t border-gold/60 bg-black"
        animate={
          reduceMotion
            ? undefined
            : { backgroundColor: ["#000000", "#141414", "#000000"] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(212,168,83,0.1),transparent)]" />
        <Container className="relative flex h-8 items-center justify-center overflow-hidden sm:h-9">
          {reduceMotion ? (
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-white/95">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-xs"
              >
                {active.icon}
              </span>
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
                className="absolute inset-x-0 flex items-center justify-center gap-1.5 px-4 text-xs font-semibold tracking-wide text-white/95 sm:px-6 lg:px-8"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-xs"
                >
                  {active.icon}
                </span>
                <span>{active.text}</span>
              </motion.p>
            </AnimatePresence>
          )}
        </Container>
      </motion.div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount, hydrated } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!cartOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [cartOpen]);

  return (
    <>
      <div className="sticky top-0 z-50">
        <header
          className={cn(
            "border-0 bg-white/95 backdrop-blur-sm transition-shadow duration-300",
            scrolled && "shadow-sm"
          )}
        >
          <Container>
            <div className="relative flex h-11 items-center sm:h-12">
              <Logo size="xs" href="/" priority className="md:hidden" />
              <Logo
                size="sm"
                href="/"
                priority
                className="hidden md:inline-flex"
              />

              <nav
                aria-label="التنقل الرئيسي"
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 lg:flex"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="whitespace-nowrap text-[13px] font-semibold text-navy/75 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="فتح سلة التسوق"
                className="relative ms-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 sm:h-9 sm:w-9"
              >
                <ShoppingCart size={18} strokeWidth={1.75} />
                {hydrated && itemCount > 0 ? (
                  <span className="absolute -top-0.5 -start-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-0.5 text-[10px] font-bold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                ) : null}
              </button>
            </div>
          </Container>
        </header>

        <AnnouncementBar />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
