"use client";

import Link from "next/link";
import {
  Clock,
  Headphones,
  Mail,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { FooterSection } from "@/components/layout/FooterSection";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { contactInfo } from "@/config/legal";
import {
  brandStatement,
  footerQuickLinkGroups,
  socialLinks,
} from "@/config/site";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.83a8.23 8.23 0 0 0 4.76 1.52V6.9a4.85 4.85 0 0 1-1-.21z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 9.5V7.75c0-.69.56-1.25 1.25-1.25H16V4h-2.01c-2.07 0-3.74 1.68-3.74 3.75V9.5H8v2.75h2.25V20h3.25v-7.75H16l.5-2.75h-3z" />
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,83,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <Container className="relative pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        {/* SECTION 1 — Brand */}
        <FooterSection className="flex flex-col items-center text-center">
          <div className="flex justify-center">
            <Logo
              variant="wordmark"
              size="lg"
              href="/"
              textClassName="text-white"
            />
          </div>
          <p className="mt-4 max-w-xl text-base leading-[1.8] text-white/65 sm:text-lg">
            {brandStatement}
          </p>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </FooterSection>

        {/* SECTION 2 — Quick links */}
        <FooterSection delay={0.1} className="mt-6 sm:mt-8">
          <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] px-4 py-5 sm:rounded-[2rem] sm:px-6 sm:py-6 lg:rounded-[2.25rem] lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 lg:gap-10">
              <h3 className="shrink-0 text-center text-base font-bold uppercase tracking-[0.15em] text-white sm:pt-1 sm:text-start sm:text-lg">
                روابط سريعة
              </h3>
              <nav
                aria-label="روابط سريعة"
                className="grid w-full flex-1 grid-cols-3 gap-3 sm:gap-5 lg:gap-8"
              >
                {footerQuickLinkGroups.map((group) => (
                  <div key={group.title} className="min-w-0">
                    <p className="mb-2.5 text-xs font-bold text-gold sm:mb-3 sm:text-sm">
                      {group.title}
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block text-sm font-semibold leading-snug text-white/80 transition-colors hover:text-white sm:text-[15px]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </FooterSection>

        {/* SECTION 4 + 5 — Support & Newsletter */}
        <div className="mt-14 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <FooterSection delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-7">
              <div className="pointer-events-none absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <Headphones size={15} className="text-gold" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    خدمة الزبناء
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white sm:text-[1.35rem]">
                  نحن هنا لمساعدتك
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  راسلنا بالبريد و غادي نجاوبوك بأسرع وقت.
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] p-3.5 transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.08] sm:p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-105">
                      <Mail size={19} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 text-start">
                      <p className="text-xs font-medium text-white/50">
                        البريد الإلكتروني
                      </p>
                      <p
                        className="mt-0.5 truncate text-[15px] font-bold text-white sm:text-base"
                        dir="ltr"
                      >
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>

                  <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 sm:p-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-gold">
                        <Clock size={19} strokeWidth={1.75} />
                      </div>
                      <div className="text-start">
                        <p className="text-xs font-medium text-white/50">
                          ساعات العمل
                        </p>
                        <p className="mt-0.5 text-[15px] font-bold text-white sm:text-base">
                          {contactInfo.businessHours}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3.5 flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/10 px-3 py-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                      </span>
                      <p className="text-sm font-semibold text-gold">
                        الرد خلال {contactInfo.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FooterSection>

          <FooterSection delay={0.15}>
            <FooterNewsletter />
          </FooterSection>
        </div>

        {/* SECTION 6 — Social */}
        <FooterSection delay={0.18} className="mt-14 sm:mt-16 lg:mt-20">
          <div className="flex flex-col items-center gap-5 sm:gap-6">
            <h3 className="text-base font-bold text-white sm:text-lg">
              تابعنا
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-xl bg-white text-navy shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg sm:h-12 sm:w-12"
                  >
                    <Icon className="h-5 w-5 text-navy transition-transform duration-300 group-hover:scale-110 sm:h-[1.35rem] sm:w-[1.35rem]" />
                  </a>
                );
              })}
            </div>
          </div>
        </FooterSection>

        {/* SECTION 7 — Bottom bar */}
        <FooterSection delay={0.2} className="mt-14 sm:mt-16 lg:mt-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="flex flex-col items-center gap-3 pt-8 text-center sm:flex-row sm:justify-between sm:text-start">
            <p className="text-sm text-white/45">
              © {year} SHAMANGARO. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-white/45">
              Made with <span className="text-gold">❤</span> in Morocco
            </p>
          </div>
        </FooterSection>
      </Container>
    </footer>
  );
}
