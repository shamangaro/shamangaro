"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Star, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
  { src: "/images/neo-transat-lifestyle-duo.png", alt: "Neo Transat — راحة لزوجين" },
  { src: "/images/neo-transat-lifestyle-beach.png", alt: "Neo Transat على الشاطئ" },
  { src: "/images/neo-transat-studio.png", alt: "Neo Transat — Bleu Marine" },
  { src: "/images/neo-transat-open.png", alt: "Neo Transat مفتوحة — التصميم" },
  { src: "/images/neo-transat-folded.png", alt: "Neo Transat مطوية — خفيفة" },
];

export function ProductHero() {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f5] via-white to-[#fafafa]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-20 h-[400px] w-[400px] rounded-full bg-black/[0.03] blur-[100px]" />
        <div className="absolute -left-32 bottom-20 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Container className="relative z-10 py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Left: Copy */}
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
              Neo Transat خفيف، قوي، كيتحل فـ30 ثانية، ومصمم للبحر، التراس،
              الكامبينغ، الحديقة وأي لحظة باغي فيها ترتاح.
            </p>

            <div className="mt-4 rounded-xl border border-navy/10 bg-navy/[0.03] px-4 py-3">
              <p className="text-sm font-medium text-navy/80">
                🎨 اللون المتوفر حالياً:{" "}
                <span className="font-bold text-navy">أزرق بحري غامق (Bleu Marine)</span>
              </p>
              <p className="mt-1 text-xs text-navy/50">
                ألوان أخرى قريباً — أو على الطلب
              </p>
            </div>

            {/* Rating */}
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

            {/* CTA */}
            <a
              href="#order"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-10 py-4 text-base font-bold text-white shadow-xl shadow-navy/15 transition-all duration-300 hover:scale-[1.02] hover:bg-navy-light hover:shadow-2xl hover:shadow-navy/20"
            >
              اطلب دابا
            </a>

            {/* Trust */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 lg:justify-start">
              {[
                "الدفع عند الإستلام",
                "توصيل مجاني",
                "ضمان الجودة",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <span className="text-navy">✓</span>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <h2 className="mb-5 text-center text-2xl font-extrabold leading-snug text-navy sm:text-3xl md:text-4xl lg:text-start">
              مع كرسي الراحة <span className="text-navy/60">Neo Transat</span>
              <br />
              غاتلقى راحتك فين ما مشيتي
            </h2>

            {/* Main Image */}
            <div
              className="group relative cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-square">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-6"
                  >
                    <Image
                      src={images[current].src}
                      alt={images[current].alt}
                      width={650}
                      height={650}
                      className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={current === 0}
                      sizes="(max-width: 768px) 92vw, 46vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom hint */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn size={13} />
                  إضغط للتكبير
                </div>

                {/* Counter */}
                <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur-sm">
                  {current + 1} / {images.length}
                </div>
              </div>

              {/* Nav arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:shadow-lg"
                aria-label="السابق"
              >
                <ChevronRight size={18} className="text-navy" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:shadow-lg"
                aria-label="التالي"
              >
                <ChevronLeft size={18} className="text-navy" />
              </button>
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
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="إغلاق"
                >
                  <X size={22} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="السابق"
                >
                  <ChevronRight size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="التالي"
                >
                  <ChevronLeft size={24} />
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

                {/* Bottom dots */}
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === current
                          ? "w-6 bg-white"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      )}
                    />
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
