"use client";

import Image from "next/image";
import { Truck, Shield, RefreshCw, Banknote } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useSelectedVariant, useWatchesPage } from "./WatchesPageContext";
import { formatWatchPrice, WATCHES_PRODUCT } from "./config";

export function WatchesHero() {
  const { total, quantity, hasSelection } = useWatchesPage();
  const variant = useSelectedVariant();
  const heroImage = variant?.image ?? "/images/montres-femmes/hero.svg";
  const heroAlt = variant
    ? `${WATCHES_PRODUCT.name} — ${variant.label}`
    : WATCHES_PRODUCT.name;

  return (
    <section className="bg-gradient-to-b from-[#FAF7F2] to-[#F7F3EE] pb-8 pt-6 sm:pb-12 sm:pt-8">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 space-y-5 lg:order-1">
            <span className="inline-block rounded-full bg-[#7B2D42]/10 px-3 py-1 text-xs font-medium text-[#7B2D42]">
              مجموعة جديدة · توصيل مجاني
            </span>
            <h1 className="text-3xl font-bold leading-tight text-[#2A1A1F] sm:text-4xl lg:text-5xl">
              {WATCHES_PRODUCT.name}
            </h1>
            <p className="text-base leading-relaxed text-[#5C4A52] sm:text-lg">
              ساعة أنiقة بخطوط ناعمة وألوان راقية — مثالية للهدية أو للاستعمال
              اليومي. 3 موديلات، تغليف هدايا، والدفع عند الاستلام.
            </p>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-bold text-[#7B2D42] sm:text-4xl">
                {formatWatchPrice(WATCHES_PRODUCT.unitPrice)}
              </span>
              <span className="text-sm text-[#888]">/ ساعة</span>
            </div>
            <a
              href="#watches-selection"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[#7B2D42] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#7B2D42]/20 transition hover:bg-[#5C2233] sm:w-auto"
            >
              {hasSelection && quantity
                ? `اختاري وكملي — ${formatWatchPrice(total)}`
                : "اختاري الساعة دابا"}
            </a>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl bg-[#F0EBE4] shadow-xl ring-1 ring-[#E8DFD4]">
              <Image
                key={heroImage}
                src={heroImage}
                alt={heroAlt}
                fill
                className="object-cover transition-opacity duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {variant && (
              <p className="mt-3 text-center text-sm font-medium text-[#7B2D42]">
                الموديل المعروض: {variant.label}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
