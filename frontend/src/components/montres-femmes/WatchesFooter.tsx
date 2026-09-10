"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { contactInfo } from "@/config/legal";
import { footerQuickLinkGroups } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  WatchesGreenPattern,
  watchesGreenSurfaceClassName,
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
    <footer
      className={cn(
        watchesGreenSurfaceClassName,
        "-mt-px border-0 pb-20 text-white/80 lg:pb-6"
      )}
    >
      <WatchesGreenPattern />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-[#F7F3EE] via-[#F7F3EE]/25 to-transparent sm:h-20"
        aria-hidden
      />

      <Container className="relative z-10 pb-4 pt-10 sm:pb-5 sm:pt-12">
        <div className="flex justify-center">
          <Link
            href={watchesHomeHref}
            onClick={scrollToWatchesTop}
            className="inline-flex flex-col items-center text-center"
            aria-label="SHAMANGARO Montres Femmes"
          >
            <span className="text-2xl font-extrabold tracking-wide text-white">
              SHAMANGARO
            </span>
            <span className={logoSubtitleClassName}>{logoSubtitle}</span>
          </Link>
        </div>

        <nav
          aria-label="روابط قانونية وسياسات"
          className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-10"
          dir="rtl"
        >
          {footerQuickLinkGroups.map((group) => (
            <div
              key={group.title}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <p className="mb-2.5 min-h-[1.25rem] text-xs font-bold text-[#B8924A] sm:mb-3 sm:text-sm">
                {group.title}
              </p>
              <ul className="flex w-full flex-col items-center gap-2">
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

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-[#B8924A]/25 bg-white/[0.06] px-5 py-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-white/10 sm:px-8 sm:py-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B8924A]">
            تواصل معانا
          </p>
          <div
            className="mx-auto mb-4 mt-3 flex w-16 items-center gap-2"
            aria-hidden
          >
            <span className="h-px flex-1 bg-gradient-to-l from-[#B8924A] to-transparent" />
            <span className="h-1 w-1 rotate-45 bg-[#B8924A]" />
            <span className="h-px flex-1 bg-gradient-to-r from-[#B8924A] to-transparent" />
          </div>
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-wide text-white transition hover:text-[#D4BC82] sm:text-base"
            dir="ltr"
          >
            <Mail className="h-4 w-4 text-[#B8924A]" strokeWidth={1.75} aria-hidden />
            {contactInfo.email}
          </a>
          <div className="mt-4 flex flex-col items-center gap-1.5 text-[12px] font-medium text-white/65 sm:flex-row sm:justify-center sm:gap-3">
            <span>{contactInfo.businessHours}</span>
            <span className="hidden h-3 w-px bg-[#B8924A]/40 sm:block" aria-hidden />
            <span>الرد خلال {contactInfo.responseTime}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:justify-between sm:text-start">
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
