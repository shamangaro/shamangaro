"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { useCart } from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";
import { WatchesLogoMark } from "@/components/montres-femmes/WatchesLogoMark";
import { WatchesLanguageGate } from "@/components/montres-femmes-language/WatchesLanguageGate";
import { WatchesLanguageSwitcher } from "@/components/montres-femmes-language/WatchesLanguageSwitcher";
import { FrWatchesTrustBar } from "./FrWatchesTrustBar";
import { FR_COPY, FR_NAV } from "./copy";

const watchesHomeHref = "#watches-lp-top";

const logoSubtitleClassName =
  "whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-[#B8924A] text-[10px] sm:text-[11px] md:text-xs";

export function FrWatchesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated } = useCart();

  const scrollToWatchesTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="relative flex min-h-12 items-center justify-between gap-2 py-1 sm:min-h-[3.25rem]">
            <Logo
              size="md"
              href={watchesHomeHref}
              onClick={scrollToWatchesTop}
              priority
              icon={<WatchesLogoMark className="h-10 w-auto sm:h-11" />}
              iconClassName=""
              subtitle={FR_COPY.logoSubtitle}
              subtitleClassName={logoSubtitleClassName}
              textClassName="text-[#134A35]"
              className="min-w-0 max-w-[70%] shrink gap-1.5 md:hidden"
            />
            <Logo
              size="md"
              href={watchesHomeHref}
              onClick={scrollToWatchesTop}
              priority
              icon={<WatchesLogoMark className="h-11 w-auto" />}
              iconClassName=""
              subtitle={FR_COPY.logoSubtitle}
              subtitleClassName={logoSubtitleClassName}
              textClassName="text-[#134A35]"
              className="hidden min-w-0 gap-1.5 md:inline-flex"
            />

            <div className="-me-1 flex shrink-0 items-center gap-0.5 sm:-me-2 sm:gap-1">
              <WatchesLanguageSwitcher current="fr" />
              <Link
                href="#watches-hero-photo"
                aria-label={FR_COPY.cartAria}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#134A35] transition-colors hover:bg-[#134A35]/5 focus-visible:outline-2 focus-visible:outline-offset-2"
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
                aria-label={menuOpen ? FR_COPY.closeMenu : FR_COPY.openMenu}
                aria-expanded={menuOpen}
                aria-controls="watches-header-menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#134A35] transition-colors hover:bg-[#134A35]/5 focus-visible:outline-2 focus-visible:outline-offset-2"
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
            aria-label={FR_COPY.closeMenu}
            className="fixed inset-0 z-[100] bg-[#134A35]/15 backdrop-blur-[1px]"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="watches-header-menu"
            aria-label={FR_COPY.mainNav}
            className="fixed end-2 top-12 z-[110] min-w-[12.5rem] overflow-hidden rounded-2xl border border-[#134A35]/10 bg-white py-2 shadow-xl shadow-[#134A35]/15 sm:end-4 sm:top-[3.25rem]"
          >
            {FR_NAV.map((link) => (
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

      <FrWatchesTrustBar />
      <WatchesLanguageGate current="fr" />
    </div>
  );
}
