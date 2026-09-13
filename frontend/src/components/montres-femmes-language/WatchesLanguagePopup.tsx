"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { WatchesLogoMark } from "@/components/montres-femmes/WatchesLogoMark";
import { type WatchesLang } from "./watches-lang";

export function WatchesLanguagePopup({
  onChoose,
}: {
  onChoose: (lang: WatchesLang) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0A2F23]/45 p-4"
      data-watches-lang-popup=""
      role="dialog"
      aria-modal="true"
      aria-labelledby="watches-lang-title"
      aria-describedby="watches-lang-subtitle"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="w-full max-w-[22rem] rounded-2xl border border-[#B8924A]/35 bg-[#FAF7F2] px-6 py-7 text-center shadow-[0_24px_60px_rgba(10,47,35,0.28)]"
      >
        <div className="flex justify-center">
          <Logo
            size="md"
            href={null}
            icon={<WatchesLogoMark className="h-10 w-auto" />}
            iconClassName=""
            subtitle="Montres Femmes"
            subtitleClassName="whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-[#B8924A] text-[10px]"
            textClassName="text-[#134A35]"
            className="gap-1.5"
          />
        </div>

        <h2
          id="watches-lang-title"
          className="mt-5 text-xl font-bold text-[#134A35]"
          dir="rtl"
        >
          اختار اللغة
        </h2>
        <p
          id="watches-lang-subtitle"
          className="mt-1.5 text-sm text-[#134A35]/70"
          dir="ltr"
        >
          Choisissez votre langue
        </p>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            dir="rtl"
            onClick={() => onChoose("darija")}
            className="w-full rounded-xl bg-[#134A35] px-4 py-3 text-sm font-bold text-white shadow-sm ring-1 ring-[#B8924A]/30 transition hover:bg-[#0A2F23]"
          >
            الدارجة
          </button>
          <button
            type="button"
            dir="ltr"
            onClick={() => onChoose("fr")}
            className="w-full rounded-xl border border-[#134A35]/20 bg-white px-4 py-3 text-sm font-semibold text-[#134A35] transition hover:border-[#B8924A]/50 hover:bg-[#134A35]/[0.03]"
          >
            Français
          </button>
        </div>
      </motion.div>
    </div>
  );
}
