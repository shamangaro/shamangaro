"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { formatWatchPrice, WATCHES_PRODUCT, WATCH_SLIDES } from "./config";

const heroSlide = WATCH_SLIDES[1];

const heroTrustPoints = [
  {
    label: "توصيل مجاني",
    className:
      "border-[#FDBA74]/70 bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] text-[#C2410C] ring-1 ring-[#FB923C]/25",
  },
  {
    label: "الدفع عند الإستلام",
    className:
      "border-[#A8C9B4]/80 bg-gradient-to-r from-[#E8F5ED] to-[#D8EDE0] text-[#0F3D2E] ring-1 ring-[#1A5C42]/20",
  },
  {
    label: "تغليف هدايا",
    className:
      "border-[#D4BC82]/55 bg-gradient-to-r from-[#FBF6EE] to-[#F5EDD8] text-[#7A5A24] ring-1 ring-[#B8924A]/30",
  },
] as const;

export function WatchesHero() {

  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F7F3EE] pb-4 pt-4 sm:pb-6 sm:pt-5">
      <Container>
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-3 lg:order-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B8924A]/35 bg-gradient-to-r from-[#0F3D2E] to-[#1A5C42] px-3 py-1 text-[11px] font-bold text-white">
              <Sparkles className="h-3 w-3 text-[#B8924A]" aria-hidden />
              2026 · توصيل مجاني
            </span>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold leading-snug text-[#0F2A1F] sm:text-3xl">
                لمسة أنيقة
                <span className="text-[#1A5C42]"> كتدوم معاك</span>
              </h1>
              <p className="max-w-md space-y-1 text-sm leading-relaxed text-[#4A5C52] sm:text-base">
                <span className="block">الوقت كيدوز… وأناقتك كتبقى ✨</span>
                <span className="block">
                  أناقتك كتبدا من التفاصيل… اختاري الساعة اللي تشبه ليك ✨
                </span>
              </p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {heroTrustPoints.map((point) => (
                <li
                  key={point.label}
                  className={`rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${point.className}`}
                >
                  {point.label}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#888] line-through">399 درهم</span>
              <span className="text-2xl font-bold text-[#1A5C42] sm:text-3xl">
                {formatWatchPrice(WATCHES_PRODUCT.unitPrice)}
              </span>
              <span className="rounded-md bg-[#B8924A]/15 px-2 py-0.5 text-[10px] font-bold text-[#1A5C42]">
                عرض خاص
              </span>
            </div>
          </div>

          <div className="lg:order-2">
            <div className="relative mx-auto aspect-[5/6] max-w-sm overflow-hidden rounded-2xl border border-[#A8C9B4] bg-[#E8F5ED] shadow-lg ring-1 ring-[#B8924A]/25">
              <Image
                src={heroSlide.src}
                alt={heroSlide.alt}
                fill
                className="object-cover object-center"
                priority
                sizes="400px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
