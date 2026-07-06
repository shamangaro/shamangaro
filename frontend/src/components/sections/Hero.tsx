"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Truck, Shield, Gem, BadgeCheck } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/212679653509?text=%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8%20Neo%20Transat%20%F0%9F%8C%B4";

const badges = [
  { icon: Truck, label: "الدفع عند الإستلام" },
  { icon: BadgeCheck, label: "التوصيل لجميع المدن" },
  { icon: Gem, label: "جودة عالية" },
  { icon: Shield, label: "ضمان سنة" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-cream">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-gold/10 blur-[150px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <Container className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-start"
          >
            <span className="rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              Premium Outdoor Lifestyle
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
              Neo Transat
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground lg:text-xl">
              الراحة فأي بلاصة — خفيفة، أنيقة، و جاهزة في 30 ثانية.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-navy px-8 py-4 text-base font-bold text-white shadow-xl shadow-navy/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-navy/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                أطلب دابا — 299 MAD
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-navy transition-colors hover:bg-navy/5"
              >
                شوف الأثمنة ←
              </a>
            </div>

            <div className="mt-11 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-5">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <badge.icon size={15} className="text-gold" />
                  </div>
                  <span className="text-xs font-medium text-navy/70">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 m-auto h-[85%] w-[85%] rounded-full bg-gold/5 blur-3xl" />
            <Image
              src="/images/neo-transat-open.png"
              alt="Neo Transat — كرسي الإسترخاء Premium"
              width={620}
              height={520}
              className="relative w-full max-w-[540px] drop-shadow-xl"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
