import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";

export function MontresFemmesPromoBanner() {
  return (
    <section className="bg-[#f8f8f8] py-8 sm:py-10">
      <Container>
        <Link
          href="/products/montres-femmes"
          className="group relative block overflow-hidden rounded-2xl border border-[#B8924A]/35 bg-gradient-to-br from-[#0F2A1F] via-[#0A2F23] to-[#134A35] shadow-[0_12px_40px_rgba(15,42,31,0.22)] ring-1 ring-[#B8924A]/25 transition hover:brightness-105"
        >
          <div
            className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-[#B8924A]/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-8 -start-8 h-32 w-32 rounded-full bg-white/5 blur-2xl"
            aria-hidden
          />

          <div className="relative grid items-center gap-5 p-4 sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-6">
            <div className="space-y-3 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B8924A]/45 bg-white/10 px-3 py-1 text-[11px] font-bold">
                <Sparkles className="h-3 w-3 text-[#D4BC82]" aria-hidden />
                جديد · Montres Femmes
              </span>
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                بغiti ساعة أنيقة؟
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                ساعات نسائية بخطوط ذهبية و علبة هدايا — 250 درهم · توصيل مجاني ·
                الدفع عند الإستلام
              </p>
              <span className="inline-flex items-center gap-2 rounded-xl border border-[#B8924A]/40 bg-white px-4 py-2.5 text-sm font-bold text-[#134A35] shadow-md transition group-hover:bg-[#FAF7F2]">
                اكتشفي الساعات
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" aria-hidden />
              </span>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-[148px] shrink-0 overflow-hidden rounded-xl border border-[#B8924A]/40 bg-[#E8F5ED] shadow-lg ring-2 ring-white/15 sm:max-w-[168px]">
              <Image
                src="/images/montres-femmes/slide-02-navy.png"
                alt="Montres Femmes — ساعة نسائية أنيقة"
                fill
                className="object-cover object-center"
                sizes="168px"
              />
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
