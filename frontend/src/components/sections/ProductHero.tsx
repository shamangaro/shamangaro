"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { LedTickerBand } from "@/components/shared/LedTickerBand";
import { OrderCtaButton } from "@/components/shared/OrderCtaButton";
import { scrollToOrderForm } from "@/lib/scroll-to-order-form";
import {
  Star,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Armchair,
  TreePine,
  BadgeCheck,
  Truck,
  Shield,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
  {
    src: "/images/neo-transat-fabric-beach.png",
    alt: "Neo Transat — جودة القماش و علامة SHAMANGARO",
    caption: "Neo Transat",
    subtitle: "جودة كتبان ف كل تفصيل.",
  },
  {
    src: "/images/neo-transat-beach-relax.png",
    alt: "Neo Transat — راحة على الشاطئ",
    caption: "الشاطئ",
    subtitle: "راحتك... على البحر.",
  },
  {
    src: "/images/neo-transat-river-relax.png",
    alt: "Neo Transat — إسترخاء عند النهر",
    caption: "الطبيعة",
    subtitle: "هدوء كيبدا من هنا.",
  },
  {
    src: "/images/neo-transat-casablanca-sunset.png",
    alt: "Neo Transat — راحة في الدار البيضاء",
    caption: "الدار البيضاء",
    subtitle: "المغرب... من زاوية أخرى.",
  },
];

const adHeadlineOutline =
  "[text-shadow:-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,-1px_0_0_#000,1px_0_0_#000,0_-1px_0_#000,0_1px_0_#000,0_0_10px_rgba(0,0,0,0.95),0_4px_18px_rgba(0,0,0,0.75)]";

const adGoldOutline =
  "[text-shadow:-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,-1px_0_0_#000,1px_0_0_#000,0_-1px_0_#000,0_1px_0_#000,0_0_8px_#000,0_3px_14px_rgba(0,0,0,0.85)]";

function HeroAdCopy({
  caption,
  subtitle,
  className,
}: {
  caption: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none max-w-[min(100%,24rem)] text-start sm:max-w-lg", className)}>
      <p
        className={cn(
          "text-[11px] font-black uppercase tracking-[0.28em] text-[#f4d47a] sm:text-xs",
          adGoldOutline
        )}
      >
        {caption}
      </p>
      <p
        className={cn(
          "mt-2.5 text-[1.45rem] font-black leading-[1.1] text-white sm:text-[1.85rem] md:text-[2.05rem]",
          adHeadlineOutline
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}

const heroHighlights = [
  { icon: Droplets, label: "مقاوم للماء" },
  { icon: Armchair, label: "راحة أفضل" },
  { icon: TreePine, label: "خشب ممتاز" },
  { icon: BadgeCheck, label: "جودة SHAMANGARO" },
  { icon: Truck, label: "توصيل لجميع المدن" },
  { icon: Shield, label: "ضمان سنة كاملة" },
];

export function ProductHero() {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const slide = images[current];
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const closeZoom = () => setZoomed(false);

  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeZoom();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomed]);

  const zoomModal =
    zoomed &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="عرض الصورة بالحجم الكامل"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-6"
        onClick={closeZoom}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            closeZoom();
          }}
          className="absolute end-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20 sm:end-6 sm:top-6"
          aria-label="إغلاق"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          className="absolute start-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:start-6"
          aria-label="التالي"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            prev();
          }}
          className="absolute end-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:end-6"
          aria-label="السابق"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>

        <div
          className="relative h-[min(88vh,860px)] w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            key={`zoom-${slide.src}`}
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 90vw"
          />

          <HeroAdCopy
            caption={slide.caption}
            subtitle={slide.subtitle}
            className="absolute bottom-8 start-6 sm:bottom-10 sm:start-8"
          />
        </div>
      </div>,
      document.body
    );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f5] via-white to-[#fafafa]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full bg-black/[0.03] blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Container className="relative z-10 pt-10 md:pt-16 lg:pt-20">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center text-2xl font-extrabold leading-snug tracking-tight text-navy sm:text-3xl md:mb-8 md:text-4xl lg:text-start lg:text-5xl"
        >
          مع كرسي الراحة <span className="text-fabric">Neo Transat</span>
          <br />
          غاتلقى راحتك فين ما مشيتي
        </motion.h2>
      </Container>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative z-10 w-full"
      >
        <div
          className="group relative cursor-zoom-in overflow-hidden"
          onClick={() => setZoomed(true)}
        >
          <div className="relative aspect-[16/10] max-h-[min(62vw,520px)] overflow-hidden sm:aspect-[5/3] md:max-h-[480px] lg:aspect-[21/9] lg:max-h-[440px]">
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={current === 0}
                sizes="100vw"
              />

              <HeroAdCopy
                caption={slide.caption}
                subtitle={slide.subtitle}
                className="absolute bottom-5 start-5 z-10 sm:bottom-7 sm:start-7 md:bottom-8 md:start-8"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(true);
                }}
                className={cn(
                  "absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-white sm:end-5 sm:top-5",
                  adHeadlineOutline
                )}
                aria-label="تكبير الصورة"
              >
                <ZoomIn size={18} strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-navy sm:left-4"
                aria-label="التالي"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-navy sm:right-4"
                aria-label="السابق"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
        </div>
      </motion.div>

      <LedTickerBand
        items={heroHighlights}
        ariaLabel="مميزات Neo Transat"
        className="relative z-10"
        variant="light"
      />

      <Container className="relative z-10 pb-10 md:pb-16 lg:pb-20">
        <div className="mx-auto max-w-2xl">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-start"
          >
            <h1 className="max-w-lg text-2xl font-extrabold leading-[1.35] text-navy sm:text-3xl md:text-4xl">
              ماشي غير كرسي...
              <br />
              <span className="text-navy/70">
                هادي راحة كترافقك فين ما مشيتي.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              <span className="font-semibold text-fabric">Neo Transat</span> خفيف،
              قوي، كيتحل فـ30 ثانية، ومصمم للبحر، التراس، الكامبينغ، الحديقة وأي
              لحظة باغي فيها ترتاح.
            </p>

            <div className="mt-4 w-full max-w-md rounded-xl border border-navy/10 bg-navy/[0.03] px-4 py-3">
              <p className="text-sm font-medium text-navy/80">
                🎨 اللون المتوفر حالياً:{" "}
                <span className="font-bold text-fabric">
                  أزرق بحري غامق (Bleu Marine)
                </span>
              </p>
              <p className="mt-1 text-xs text-navy/50">
                ألوان أخرى قريباً — أو على الطلب
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-base font-semibold text-navy">4.9</span>
              <span className="text-sm text-muted-foreground">(+500 تقييم)</span>
            </div>

            <OrderCtaButton
              onClick={() => scrollToOrderForm()}
              className="mt-8 max-w-md sm:w-auto"
            >
              اطلب دابا
            </OrderCtaButton>

            <div className="mt-5 w-full max-w-md rounded-2xl bg-[#1b3a4b] p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                    <BadgeCheck size={20} className="text-[#d4a853]" />
                  </div>
                  <p className="min-w-0 flex-1 text-right">
                    <span className="block text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                      الدفع عند الإستلام
                    </span>
                    <span className="block text-[10px] text-white/60 sm:text-[11px]">
                      بدون دفع مسبق
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                    <Truck size={20} className="text-[#d4a853]" />
                  </div>
                  <p className="min-w-0 flex-1 text-right">
                    <span className="block text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                      توصيل 2-5 أيام
                    </span>
                    <span className="block text-[10px] text-white/60 sm:text-[11px]">
                      لجميع المدن
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                    <Shield size={20} className="text-[#d4a853]" />
                  </div>
                  <p className="min-w-0 flex-1 text-right">
                    <span className="block text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                      ضمان سنة
                    </span>
                    <span className="block text-[10px] text-white/60 sm:text-[11px]">
                      إسترجاع كامل
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                    <Package size={20} className="text-[#d4a853]" />
                  </div>
                  <p className="min-w-0 flex-1 text-right">
                    <span className="block text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                      جودة عالية
                    </span>
                    <span className="block text-[10px] text-white/60 sm:text-[11px]">
                      خشب + قماش مقاوم
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {zoomModal}
    </section>
  );
}
