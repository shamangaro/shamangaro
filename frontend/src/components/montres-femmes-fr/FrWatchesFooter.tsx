"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import {
  WatchesGreenPattern,
  watchesGreenSurfaceClassName,
} from "@/lib/watches-green-pattern";
import { WatchesLogoMark } from "@/components/montres-femmes/WatchesLogoMark";
import { FR_COPY } from "./copy";

const logoSubtitleClassName =
  "whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-white text-xs sm:text-sm";
const watchesHomeHref = "#watches-lp-top";

function scrollToWatchesTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function FrWatchesFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        watchesGreenSurfaceClassName,
        "-mt-16 border-0 pb-20 text-white/80 sm:-mt-20 lg:pb-6"
      )}
    >
      <WatchesGreenPattern />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-[#FAF7F2] from-0% via-[#FAF7F2]/80 via-40% to-transparent to-100% sm:h-44"
        aria-hidden
      />

      <Container className="relative z-10 pb-4 pt-16 sm:pb-5 sm:pt-20">
        <div className="flex justify-center">
          <Logo
            size="lg"
            href={watchesHomeHref}
            onClick={scrollToWatchesTop}
            icon={<WatchesLogoMark tone="white" className="h-14 w-auto sm:h-16" />}
            subtitle={FR_COPY.logoSubtitle}
            subtitleClassName={logoSubtitleClassName}
            textClassName="text-white"
            className="min-w-0 gap-2"
          />
        </div>

        <nav
          aria-label={FR_COPY.footerNavAria}
          className="mx-auto mt-10 flex w-full max-w-3xl items-start justify-between gap-5 sm:gap-12"
          dir="ltr"
        >
          {FR_COPY.footerGroups.map((group) => (
            <div
              key={group.title}
              className="flex min-w-0 flex-1 flex-col items-start text-left"
            >
              <p className="mb-2.5 min-h-[1.25rem] w-full text-left text-xs font-bold text-[#B8924A] sm:mb-3 sm:text-sm">
                {group.title}
              </p>
              <ul className="flex w-full flex-col items-start gap-2 text-left">
                {group.links.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      className="block text-left text-[11px] leading-snug text-white/75 transition hover:text-white sm:text-sm sm:leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:justify-between sm:text-start">
          <p className="text-xs text-white/50">{FR_COPY.copyright(year)}</p>
          <Link
            href={watchesHomeHref}
            onClick={scrollToWatchesTop}
            className="text-xs text-[#B8924A] hover:underline"
          >
            {FR_COPY.backHome}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
