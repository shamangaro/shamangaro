"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { useCart } from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";
import { WatchesTrustBar } from "./WatchesTrustBar";
import { WATCHES_PRODUCT } from "./config";

const watchesHomeHref = "#watches-lp-top";

const navLinks = [
  { href: watchesHomeHref, label: "الرئيسية" },
  { href: "#watches-hero-photo", label: "الطلب" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

const logoSubtitle = "Montres Femmes";
const logoSubtitleClassName =
  "whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-[#B8924A] text-[10px] sm:text-[11px] md:text-xs";

export function WatchesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated } = useCart();

  const scrollToWatchesTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document
      .getElementById("watches-lp-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    <div className="sticky top-0 z-50" data-sticky-header id="watches-lp-top">
      <header
        className={cn(
          "border-0 bg-white/95 backdrop-blur-sm transition-shadow duration-300",
          scrolled && "shadow-sm"
        )}
      >
        <Container>
          <div className="relative flex min-h-[4.25rem] items-center justify-between gap-2 sm:min-h-[4.75rem]">
            <Logo
              size="md"
              href={watchesHomeHref}
              onClick={scrollToWatchesTop}
              priority
              iconSrc={WATCHES_PRODUCT.logoIcon}
              iconClassName="h-14 w-auto [mask-image:radial-gradient(circle_closest-side,#000_99.2%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle_closest-side,#000_99.2%,transparent_100%)] sm:h-16"
              subtitle={logoSubtitle}
              subtitleClassName={logoSubtitleClassName}
              textClassName="text-[#134A35]"
              className="min-w-0 max-w-[70%] shrink gap-1.5 md:hidden"
            />
            <Logo
              size="lg"
              href={watchesHomeHref}
              onClick={scrollToWatchesTop}
              priority
              iconSrc={WATCHES_PRODUCT.logoIcon}
              iconClassName="h-16 w-auto [mask-image:radial-gradient(circle_closest-side,#000_99.2%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle_closest-side,#000_99.2%,transparent_100%)] md:h-[4.5rem]"
              subtitle={logoSubtitle}
              subtitleClassName={logoSubtitleClassName}
              textClassName="text-[#134A35]"
              className="hidden min-w-0 gap-1.5 md:inline-flex"
            />

            <div className="-me-1 flex shrink-0 items-center gap-0.5 sm:-me-2 sm:gap-1">
              <Link
                href="#watches-hero-photo"
                aria-label="سلة التسوق"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#134A35] transition-colors hover:bg-[#134A35]/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-11 sm:w-11"
              >
                <ShoppingCart size={18} strokeWidth={1.75} />
                {hydrated && itemCount > 0 ? (
                  <span className="absolute -top-0.5 -start-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#134A35] px-0.5 text-[10px] font-bold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                ) : null}
              </Link>

              <button
                type="button"
                aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={menuOpen}
                aria-controls="watches-header-menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#134A35] transition-colors hover:bg-[#134A35]/5 focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-11 sm:w-11"
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
            className="fixed inset-0 z-[100] bg-[#134A35]/15 backdrop-blur-[1px]"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="watches-header-menu"
            aria-label="التنقل الرئيسي"
            className="fixed end-2 top-[4rem] z-[110] min-w-[12.5rem] overflow-hidden rounded-2xl border border-[#134A35]/10 bg-white py-2 shadow-xl shadow-[#134A35]/15 sm:end-4 sm:top-[4.5rem]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  setMenuOpen(false);
                  if (link.href === watchesHomeHref) {
                    scrollToWatchesTop(event);
                  }
                }}
                className="block px-4 py-3 text-sm font-semibold text-[#134A35]/75 transition-colors hover:bg-[#134A35]/[0.04] hover:text-[#134A35]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      ) : null}

      <WatchesTrustBar />
    </div>
  );
}
