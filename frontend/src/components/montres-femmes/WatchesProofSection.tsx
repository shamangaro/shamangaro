"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { WATCH_PROOF_SLOTS } from "./config";

const PROOF_DIR = "/images/montres-femmes";

export function WatchesProofSection({ lang = "ar" }: { lang?: "ar" | "fr" }) {
  const isFr = lang === "fr";

  return (
    <section className="bg-transparent py-6 sm:py-8" id="watches-proof">
      <Container>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-[#0F2A1F] sm:text-2xl">
            {isFr ? "La montre en vrai" : "الساعة فالحقيقة"}
          </h2>
          <p className="mt-1.5 text-sm text-[#4A5C52]">
            {isFr
              ? "Photos réelles — poignet, détails, boîte et taille."
              : "صور حقيقية — على المعصم، التفاصيل، العلبة، والحجم."}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {WATCH_PROOF_SLOTS.map((slot) => (
            <li key={slot.id}>
              <ProofSlot
                file={slot.file}
                label={isFr ? slot.labelFr : slot.labelAr}
                hint={isFr ? slot.hintFr : slot.hintAr}
                optional={!slot.required}
                optionalLabel={isFr ? "Optionnel" : "اختياري"}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ProofSlot({
  file,
  label,
  hint,
  optional,
  optionalLabel,
}: {
  file: string;
  label: string;
  hint: string;
  optional: boolean;
  optionalLabel: string;
}) {
  const [missing, setMissing] = useState(true);
  const src = `${PROOF_DIR}/${file}`;

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setMissing(false);
    image.onerror = () => setMissing(true);
    image.src = src;
  }, [src]);

  if (missing) {
    return (
      <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-dashed border-[#A8C9B4] bg-white p-3 text-center ring-1 ring-[#B8924A]/10">
        <Camera className="h-6 w-6 text-[#B8924A]" aria-hidden />
        <p className="mt-2 text-xs font-bold text-[#0F2A1F]">{label}</p>
        <p className="mt-1 text-[10px] leading-snug text-[#4A5C52]">{hint}</p>
        <p className="mt-2 break-all font-mono text-[10px] text-[#888]">{file}</p>
        {optional ? (
          <p className="mt-1 text-[10px] font-semibold text-[#B8924A]">
            {optionalLabel}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-[#A8C9B4] bg-white shadow-sm ring-1 ring-[#B8924A]/10">
      <div className="relative aspect-[4/5] bg-[#FAF7F2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setMissing(true)}
        />
      </div>
      <figcaption className="px-2 py-1.5 text-center text-[11px] font-semibold text-[#0F2A1F]">
        {label}
      </figcaption>
    </figure>
  );
}
