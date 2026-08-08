"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { contactInfo } from "@/config/legal";
import { footerQuickLinkGroups } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  WatchesGreenPattern,
  watchesGreenSurfaceClassName,
  watchesGreenTopLineClassName,
} from "@/lib/watches-green-pattern";

const logoSubtitle = "Montres Femmes";
const logoSubtitleClassName =
  "font-semibold uppercase tracking-[0.14em] text-[#B8924A] text-[10px] sm:text-xs";
const watchesHomeHref = "#watches-lp-top";

function scrollToWatchesTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document
    .getElementById("watches-lp-top")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function WatchesFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={cn(watchesGreenSurfaceClassName, "border-t text-white/80")}>
      <WatchesGreenPattern />
      <div className={watchesGreenTopLineClassName} />

      <Container className="relative z-10 py-10 sm:py-14">
        <div className="flex justify-center">
          <Logo
            size="xl"
            href={watchesHomeHref}
            onClick={scrollToWatchesTop}
            subtitle={logoSubtitle}
            textClassName="text-white"
            subtitleClassName={logoSubtitleClassName}
          />
        </div>

        <nav
          aria-label="روابط قانونية وسياسات"
          className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-10"
          dir="rtl"
        >
          {footerQuickLinkGroups.map((group) => (
            <div
              key={group.title}
              className="flex min-w-0 flex-col items-center text-center sm:items-start sm:text-start"
            >
              <p className="mb-2.5 min-h-[1.25rem] text-xs font-bold text-[#B8924A] sm:mb-3 sm:text-sm">
                {group.title}
              </p>
              <ul className="flex w-full flex-col items-center gap-2 sm:items-start">
                {group.links.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      className="block text-[11px] leading-snug text-white/75 transition hover:text-white sm:text-sm sm:leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center sm:px-6">
          <p className="text-xs text-white/50">تواصل معانا</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-1 inline-block text-sm font-semibold text-[#B8924A] hover:underline"
            dir="ltr"
          >
            {contactInfo.email}
          </a>
          <p className="mt-2 text-xs text-white/50">
            {contactInfo.businessHours} · الرد خلال {contactInfo.responseTime}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-start">
          <p className="text-xs text-white/50">
            © {year} SHAMANGARO. جميع الحقوق محفوظة.
          </p>
          <Link
            href={watchesHomeHref}
            onClick={scrollToWatchesTop}
            className="text-xs text-[#B8924A] hover:underline"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </Container>
    </footer>
  );
}
