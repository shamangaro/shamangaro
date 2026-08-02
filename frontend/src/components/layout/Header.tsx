"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Truck, Wallet, Shield, BadgeCheck, Menu, X } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { LedTickerBand } from "@/components/shared/LedTickerBand";
import { useCart } from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";

const announcements = [
  { icon: Truck, label: "توصيل مجاني لجميع مدن المغرب" },
  { icon: Wallet, label: "الدفع عند الاستلام" },
  { icon: Shield, label: "ضمان سنة كاملة" },
  { icon: BadgeCheck, label: "جودة SHAMANGARO Premium" },
];

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/cart", label: "الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

const logoSubtitle = "Premium Brand";
const logoSubtitleClassName =
  "font-semibold uppercase tracking-[0.14em] text-navy/45 text-[10px] sm:text-[11px] md:text-xs";

function AnnouncementBar() {
  return (
    <LedTickerBand
      items={announcements}
      ariaLabel="عروض و مميزات SHAMANGARO"
      compact
      animation="vertical"
      intervalMs={4000}
      variant="brand"
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="sticky top-0 z-50" data-sticky-header>
        <header
          className={cn(
            "border-0 bg-white/95 backdrop-blur-sm transition-shadow duration-300",
            scrolled && "shadow-sm"
          )}
        >
          <Container>
            <div className="relative flex min-h-[3.75rem] items-center gap-2.5 sm:min-h-[4.25rem]">
              <Logo
                size="md"
                href="/"
                priority
                subtitle={logoSubtitle}
                subtitleClassName={logoSubtitleClassName}
                className="min-w-0 max-w-[62%] shrink md:hidden"
              />
              <Logo
                size="lg"
                href="/"
                priority
                subtitle={logoSubtitle}
                subtitleClassName={logoSubtitleClassName}
                className="hidden min-w-0 md:inline-flex"
              />

              <div className="ms-auto -me-1 flex items-center gap-0.5 sm:-me-2 sm:gap-1">
                <Link
                  href="/cart"
                  aria-label="سلة التسوق"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-11 sm:w-11"
                >
                  <ShoppingCart size={18} strokeWidth={1.75} />
                  {hydrated && itemCount > 0 ? (
                    <span className="absolute -top-0.5 -start-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-0.5 text-[10px] font-bold text-white">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  ) : null}
                </Link>

                <button
                  type="button"
                  aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                  aria-expanded={menuOpen}
                  aria-controls="header-menu"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-11 sm:w-11"
                >
                  {menuOpen ? (
                    <X size={20} strokeWidth={1.75} />
                  ) : (
                    <Menu size={20} strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>
          </Container>
        </header>

        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="إغلاق القائمة"
              className="fixed inset-0 z-[100] bg-navy/15 backdrop-blur-[1px]"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="header-menu"
              aria-label="التنقل الرئيسي"
              className="fixed end-2 top-[4rem] z-[110] min-w-[12.5rem] overflow-hidden rounded-2xl border border-navy/10 bg-white py-2 shadow-xl shadow-navy/15 sm:end-4 sm:top-[4.5rem]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-navy/75 transition-colors hover:bg-navy/[0.04] hover:text-navy"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </>
        ) : null}

        <AnnouncementBar />
      </div>
  );
}
