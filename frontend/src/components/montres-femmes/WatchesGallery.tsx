"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { WATCH_GALLERY } from "./config";
import { cn } from "@/lib/utils";

const labels = ["تفاصيل ديال الجودة", "3 ألوان زوينين", "تغليف هدايا"];

export function WatchesGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#0F2A1F] sm:text-3xl">شوفي الصور</h2>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-[#FAF7F2]">
            <Image
              src={WATCH_GALLERY[active]}
              alt={labels[active]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {WATCH_GALLERY.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative h-16 w-20 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-24",
                  active === i ? "border-[#134A35]" : "border-transparent opacity-70"
                )}
              >
                <Image src={src} alt={labels[i]} fill className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
