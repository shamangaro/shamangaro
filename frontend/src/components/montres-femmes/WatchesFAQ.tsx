"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { WATCH_FAQ } from "./config";

export function WatchesFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F7F3EE] py-10 sm:py-14">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
            أسئلة شائعة
          </h2>
        </div>
        <div className="mx-auto max-w-2xl space-y-3">
          {WATCH_FAQ.map((item, i) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-right"
              >
                <span className="font-medium text-[#2A1A1F]">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[#7B2D42] transition",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="border-t border-[#E8DFD4] px-4 pb-4 pt-2">
                  <p className="text-sm leading-relaxed text-[#666]">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
