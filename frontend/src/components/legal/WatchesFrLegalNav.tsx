"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { watchesFrLegalPages } from "@/config/legal-watches-fr";

export function WatchesFrLegalNav() {
  const pathname = usePathname();

  return (
    <nav
      className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      aria-label="Pages légales Montres Femmes"
    >
      {watchesFrLegalPages.map((page) => {
        const active = pathname === page.slug;
        return (
          <Link
            key={page.slug}
            href={page.slug}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all",
              active
                ? "bg-[#134A35] text-white shadow-sm"
                : "border border-[#A8C9B4] bg-white text-[#0F2A1F] hover:border-[#134A35]/40 hover:shadow-sm"
            )}
          >
            {page.title}
          </Link>
        );
      })}
    </nav>
  );
}
