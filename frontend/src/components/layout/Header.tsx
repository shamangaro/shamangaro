"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Truck, Wallet, Shield, BadgeCheck } from "lucide-react";
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
    />
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
