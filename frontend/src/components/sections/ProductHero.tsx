"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { Star, ChevronLeft, ChevronRight, X, ZoomIn, Droplets, Armchair, TreePine, BadgeCheck, Truck, Shield, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;

const images = [
  {
    src: "/images/neo-transat-casablanca-duo.png",
    alt: "Neo Transat — راحة لزوجين في الدار البيضاء",
  },
  {
    src: "/images/neo-transat-lake-relax.png",
    alt: "Neo Transat — إسترخاء على ضفاف البحيرة",
  },
  {
    src: "/images/neo-transat-lifestyle-carry.png",
    alt: "Neo Transat — سهلة الحمل",
  },
  {
    src: "/images/neo-transat-open.png",
    alt: "Neo Transat مفتوحة — التصميم",
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
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    []
  );

  useEffect(() => {
    if (reduceMotion || zoomed || paused) return;

    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [next, paused, reduceMotion, zoomed]);

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
              <div className="rounded-[1.5rem] border-2 border-navy/20 bg-white p-2 shadow-sm sm:rounded-[2.5rem] sm:p-4 md:rounded-[3rem] md:p-5">
                <div
                  ref={galleryRef}
                  className="group relative cursor-zoom-in"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onTouchStart={() => setPaused(true)}
                  onTouchEnd={() => setPaused(false)}
                  onClick={() => setZoomed(true)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#dce8ef]/50 via-[#faf8f5] to-[#f3efe8] sm:rounded-[1.75rem] md:rounded-[2.25rem]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[current].src}
                          alt={images[current].alt}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] sm:p-6 md:p-8"
                          priority={current === 0}
                          sizes="(max-width: 768px) 92vw, 46vw"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-md backdrop-blur-sm opacity-100 sm:bottom-4 sm:left-4 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <ZoomIn size={13} />
                      إضغط للتكبير
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/95 text-navy shadow-[0_4px_20px_-4px_rgba(17,17,17,0.15)] backdrop-blur-sm transition-all hover:border-navy hover:bg-navy hover:text-white hover:shadow-lg sm:left-4"
                      aria-label="التالي"
                    >
                      <ChevronLeft size={18} strokeWidth={2} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white/95 text-navy shadow-[0_4px_20px_-4px_rgba(17,17,17,0.15)] backdrop-blur-sm transition-all hover:border-navy hover:bg-navy hover:text-white hover:shadow-lg sm:right-4"
                      aria-label="السابق"
                    >
                      <ChevronRight size={18} strokeWidth={2} />
                    </button>
                  </div>
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

          {/* Zoom Modal */}
          <AnimatePresence>
            {zoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={() => setZoomed(false)}
              >
                <button
                  onClick={() => setZoomed(false)}
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="إغلاق"
                >
                  <X size={22} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="التالي"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="السابق"
                >
                  <ChevronRight size={24} />
                </button>

                <motion.div
                  key={current}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-[85vh] w-[90vw] max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={images[current].src}
                    alt={images[current].alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </motion.div>

                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrent(i);
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-all"
                    >
                      <span
                        className={cn(
                          "block rounded-full transition-all",
                          i === current
                            ? "h-2.5 w-6 bg-white"
                            : "h-2.5 w-2.5 bg-white/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
