"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { EtendoirLang } from "./copy";
import { ETENDOIR_COPY } from "./copy";

const HERO_IMAGES = [
  { id: "closed", src: "/images/etendoir-mural/hero-closed.jpg", fit: "object-contain", position: "object-center" },
  { id: "angle", src: "/images/etendoir-mural/hero-angle.jpg", fit: "object-cover", position: "object-center" },
  { id: "line", src: "/images/etendoir-mural/hero-line.jpg", fit: "object-cover", position: "object-center" },
  { id: "in-use", src: "/images/etendoir-mural/in-use.jpg", fit: "object-cover", position: "object-[center_42%]" },
  { id: "zigzag", src: "/images/etendoir-mural/hero-zigzag.jpg", fit: "object-contain", position: "object-center" },
  { id: "row", src: "/images/etendoir-mural/hero-row.jpg", fit: "object-contain", position: "object-center" },
] as const;

export function ProductGallery({ lang }: { lang: EtendoirLang }) {
  const copy = ETENDOIR_COPY[lang];
  const [active, setActive] = useState(0);
  const current = HERO_IMAGES[active];

  const show = (index: number) => {
    const count = HERO_IMAGES.length;
    setActive((index + count) % count);
  };

  return (
    <div id="etendoir-gallery" dir="ltr">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        {HERO_IMAGES.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={copy.alts[image.id]}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 540px, 100vw"
            aria-hidden={index !== active}
            className={cn(
              "transition-opacity duration-300",
              image.fit,
              image.position,
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <button
          type="button"
          aria-label={copy.galleryPrev}
          onClick={() => show(active - 1)}
          className="absolute inset-y-0 left-0 w-1/2"
        />
        <button
          type="button"
          aria-label={copy.galleryNext}
          onClick={() => show(active + 1)}
          className="absolute inset-y-0 right-0 w-1/2"
        />
      </div>
      <div className="mt-2 flex items-center justify-center gap-2" role="group" aria-label={copy.galleryLabel}>
        {HERO_IMAGES.map((image, index) => {
          const selected = index === active;
          return (
            <button
              key={image.src}
              type="button"
              aria-pressed={selected}
              aria-label={copy.alts[image.id]}
              onClick={() => setActive(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                selected ? "w-6 bg-[#DA0037]" : "w-2 bg-[#121212]/20 hover:bg-[#121212]/40",
              )}
            />
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {copy.alts[current.id]}
      </p>
    </div>
  );
}
