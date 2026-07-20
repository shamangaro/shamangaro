"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
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
    caption: "الجودة",
    subtitle: "قماش مقاوم و علامة SHAMANGARO",
  },
  {
    src: "/images/neo-transat-beach-relax.png",
    alt: "Neo Transat — راحة على الشاطئ",
    caption: "الشاطئ",
    subtitle: "راحة تطل على البحر",
  },
  {
    src: "/images/neo-transat-river-relax.png",
    alt: "Neo Transat — إسترخاء عند النهر",
    caption: "الطبيعة",
    subtitle: "لحظة هدوء عند النهر",
  },
  {
    src: "/images/neo-transat-casablanca-sunset.png",
    alt: "Neo Transat — راحة في الدار البيضاء",
    caption: "الدار البيضاء",
    subtitle: "راحة تطل على البحر و المسجد",
  },
];

const heroHighlights = [
  { icon: Droplets, label: "مقاوم للماء" },
  { icon: Armchair, label: "راحة أفضل" },
  { icon: TreePine, label: "خشب ممتاز" },
];

export function ProductHero() {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const slide = images[current];
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f5] via-white to-[#fafafa]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full bg-black/[0.03] blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Container className="relative z-10 py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Product Gallery — premium frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <h2 className="mb-6 text-center text-2xl font-extrabold leading-snug tracking-tight text-navy sm:text-3xl md:text-4xl lg:text-start lg:text-5xl">
              مع كرسي الراحة <span className="text-fabric">Neo Transat</span>
              <br />
              غاتلقى راحتك فين ما مشيتي
            </h2>

            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.35rem] border border-navy/10 bg-[#0c1218] p-px shadow-[0_25px_60px_-20px_rgba(12,18,24,0.55)] sm:rounded-[1.75rem] md:rounded-[2rem]">
                <div className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                <div
                  className="group relative cursor-zoom-in overflow-hidden rounded-[1.32rem] sm:rounded-[1.72rem] md:rounded-[1.97rem]"
                  onClick={() => setZoomed(true)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#0c1218] sm:aspect-square">
                    <Image
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover object-center"
                      priority={current === 0}
                      sizes="(max-width: 768px) 92vw, 46vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold sm:text-[11px]">
                        {slide.caption}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white sm:text-base">
                        {slide.subtitle}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex flex-1 gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrent(i);
                              }}
                              aria-label={`صورة ${i + 1}`}
                              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/25"
                            >
                              <span
                                className={cn(
                                  "absolute inset-y-0 start-0 rounded-full bg-gold",
                                  i === current ? "w-full" : "w-0"
                                )}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-white/70">
                          <ZoomIn size={12} />
                          تكبير
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-navy sm:left-3"
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
                      className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-navy sm:right-3"
                      aria-label="السابق"
                    >
                      <ChevronRight size={18} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 sm:mt-5 sm:gap-2.5">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={image.alt}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-colors",
                      i === current
                        ? "border-gold shadow-[0_8px_20px_-8px_rgba(212,168,83,0.55)]"
                        : "border-navy/10 opacity-70 hover:border-navy/25 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-4 sm:mt-5">
                <Logo
                  variant="wordmark"
                  size="sm"
                  href={null}
                  subtitle="Premium Brand"
                  subtitleClassName="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/45 sm:text-[11px]"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2 min-[400px]:grid min-[400px]:grid-cols-3 sm:mt-5 sm:gap-3">
                {heroHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="group flex min-h-[3.25rem] items-center gap-2.5 rounded-xl border-2 border-navy bg-gradient-to-b from-white via-white to-navy/[0.04] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_3px_0_#111111,0_10px_22px_-8px_rgba(17,17,17,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_5px_0_#111111,0_14px_28px_-8px_rgba(17,17,17,0.4)] sm:min-h-[3.75rem] sm:gap-2.5 sm:rounded-2xl sm:px-3 sm:py-2.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-navy/15 bg-navy text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors group-hover:bg-navy-light sm:h-10 sm:w-10">
                        <Icon size={18} strokeWidth={2.25} />
                      </div>
                      <span className="min-w-0 flex-1 text-xs font-extrabold leading-snug text-navy sm:text-sm">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-start"
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

            <a
              href="#order"
              className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-full bg-navy px-10 py-4 text-base font-bold text-white shadow-xl shadow-navy/15 transition-all duration-300 hover:scale-[1.02] hover:bg-navy-light hover:shadow-2xl hover:shadow-navy/20 sm:w-auto"
            >
              اطلب دابا
            </a>

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

          {zoomed && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setZoomed(false)}
            >
              <button
                type="button"
                onClick={() => setZoomed(false)}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="إغلاق"
              >
                <X size={22} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                aria-label="التالي"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                aria-label="السابق"
              >
                <ChevronRight size={24} />
              </button>

              <div
                className="relative h-[85vh] w-[90vw] max-w-5xl overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={`zoom-${slide.src}`}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  sizes="90vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                    {slide.caption}
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    {slide.subtitle}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(i);
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    aria-label={`صورة ${i + 1}`}
                  >
                    <span
                      className={cn(
                        "block rounded-full",
                        i === current
                          ? "h-2.5 w-6 bg-white"
                          : "h-2.5 w-2.5 bg-white/30"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
