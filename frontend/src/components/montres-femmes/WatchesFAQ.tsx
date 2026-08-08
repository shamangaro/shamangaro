"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { WATCH_FAQ } from "./config";

export function WatchesFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F7F3EE] py-6 sm:py-8">
      <Container>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-[#0F2A1F] sm:text-2xl">
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
                className="flex w-full items-center justify-between gap-3 p-3 text-right"
              >
                <span className="font-medium text-[#0F2A1F]">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[#1A5C42] transition",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="border-t border-[#D8E8DC] px-4 pb-4 pt-2">
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
