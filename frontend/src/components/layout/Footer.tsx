"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock,
  Mail,
  MessageCircle,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { FooterSection } from "@/components/layout/FooterSection";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { contactInfo } from "@/config/legal";
import { whatsappLink } from "@/lib/whatsapp";
import {
  brandStatement,
  footerQuickLinks,
  footerTrustBadges,
  socialLinks,
} from "@/config/site";

const trustIcons = {
  check: Check,
  truck: Truck,
  shield: Shield,
  star: Star,
} as const;

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

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.28 6 12 6 12 6s-6.28 0-7.86.061A2.75 2.75 0 0 0 2.2 8.001 28.9 28.9 0 0 0 2.14 12a28.9 28.9 0 0 0 .06 3.999 2.75 2.75 0 0 0 1.94 1.94C5.72 18 12 18 12 18s6.28 0 7.86-.061a2.75 2.75 0 0 0 1.94-1.94A28.9 28.9 0 0 0 21.86 12a28.9 28.9 0 0 0-.06-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

const socialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,83,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        {/* SECTION 1 — Brand */}
        <FooterSection className="flex flex-col items-center text-center">
          <div className="flex justify-center">
            <Logo
              variant="wordmark"
              size="xl"
              href="/"
              textClassName="text-white"
            />
          </div>
          <p className="mt-8 max-w-xl text-base leading-[1.9] text-white/65 sm:text-lg">
            {brandStatement}
          </p>
          <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </FooterSection>

        {/* SECTION 2 — Trust badges */}
        <FooterSection delay={0.05} className="mt-14 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {footerTrustBadges.map((badge, index) => {
              const Icon = trustIcons[badge.icon];
              return (
                <div
                  key={badge.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] sm:rounded-3xl sm:p-5"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-gold transition-colors group-hover:bg-gold/15 sm:h-11 sm:w-11">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-white/90 sm:text-[0.9375rem]">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </FooterSection>

        {/* SECTION 3 — Quick links */}
        <FooterSection delay={0.1} className="mt-14 sm:mt-16 lg:mt-20">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 lg:p-10">
            <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/45 sm:text-start">
              روابط سريعة
            </h3>
            <nav
              aria-label="روابط سريعة"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {footerQuickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:pl-5 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowLeft
                    size={14}
                    className="opacity-0 transition-all duration-300 group-hover:opacity-60 group-hover:-translate-x-1"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </FooterSection>

        {/* SECTION 4 + 5 — Support & Newsletter */}
        <div className="mt-14 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <FooterSection delay={0.12}>
            <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] sm:p-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                خدمة الزبناء
              </h3>
              <p className="mt-3 text-xl font-bold text-white sm:text-2xl">
                نحن هنا لمساعدتك
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition-transform group-hover:scale-105">
                    <MessageCircle size={20} />
                  </div>
                  <div className="min-w-0 text-start">
                    <p className="text-xs text-white/45">واتساب</p>
                    <p className="font-semibold text-white" dir="ltr">
                      {contactInfo.whatsappDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white transition-transform group-hover:scale-105">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 text-start">
                    <p className="text-xs text-white/45">البريد الإلكتروني</p>
                    <p className="truncate font-semibold text-white" dir="ltr">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                <div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-gold">
                    <Clock size={20} />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-white/45">ساعات العمل</p>
                    <p className="text-sm font-semibold text-white">
                      {contactInfo.businessHours}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      الرد خلال {contactInfo.responseTime}
                    </p>
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
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              تابعنا
            </p>
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
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white hover:text-navy hover:shadow-xl hover:shadow-gold/10 sm:h-14 sm:w-14"
                  >
                    <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
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
