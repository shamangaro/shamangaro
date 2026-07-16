"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { useCart } from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";

const announcements = [
  { icon: "🚚", text: "توصيل مجاني لجميع مدن المغرب" },
  { icon: "💵", text: "الدفع عند الاستلام" },
];

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/cart", label: "الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

const logoSubtitle = "Premium Brand";
const logoSubtitleClassName =
  "font-semibold uppercase tracking-[0.14em] text-navy/45 text-[9px] sm:text-[10px] md:text-[11px]";

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
        <Container className="relative flex h-9 items-center justify-center overflow-hidden sm:h-10">
          {reduceMotion ? (
            <p className="flex max-w-full items-center gap-1.5 px-1 text-xs font-bold tracking-wide text-white sm:gap-2 sm:text-sm">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-xs"
              >
                {active.icon}
              </span>
              <span className="truncate">{active.text}</span>
            </p>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-x-0 flex items-center justify-center gap-1.5 px-3 text-xs font-bold tracking-wide text-white sm:gap-2 sm:px-6 sm:text-sm lg:px-8"
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-xs"
                >
                  {active.icon}
                </span>
                <span className="truncate">{active.text}</span>
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
  const { itemCount, hydrated } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
        <header
          className={cn(
            "border-0 bg-white/95 backdrop-blur-sm transition-shadow duration-300",
            scrolled && "shadow-sm"
          )}
        >
          <Container>
            <div className="relative flex min-h-[3.25rem] items-center gap-2.5 sm:min-h-[3.75rem]">
              <Logo
                size="sm"
                href="/"
                priority
                subtitle={logoSubtitle}
                subtitleClassName={logoSubtitleClassName}
                className="min-w-0 max-w-[58%] shrink md:hidden"
              />
              <Logo
                size="md"
                href="/"
                priority
                subtitle={logoSubtitle}
                subtitleClassName={logoSubtitleClassName}
                className="hidden min-w-0 md:inline-flex"
              />

              <nav
                aria-label="التنقل الرئيسي"
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 lg:flex"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="whitespace-nowrap text-sm font-semibold text-navy/75 transition-colors hover:text-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/cart"
                aria-label="سلة التسوق"
                className="relative ms-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <ShoppingCart size={18} strokeWidth={1.75} />
                {hydrated && itemCount > 0 ? (
                  <span className="absolute -top-0.5 -start-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-0.5 text-[10px] font-bold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                ) : null}
              </Link>
            </div>

            <nav
              aria-label="التنقل السريع"
              className="flex items-center gap-0 overflow-x-auto border-t border-navy/[0.04] py-0 scrollbar-hide lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-8 shrink-0 items-center rounded px-2 text-[11px] font-semibold leading-tight text-navy/65 transition-colors hover:bg-navy/5 hover:text-navy sm:min-h-9 sm:px-2.5 sm:text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        </header>

        <AnnouncementBar />
      </div>
  );
}
