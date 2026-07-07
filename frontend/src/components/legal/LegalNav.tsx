"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { legalPages } from "@/config/legal";

export function LegalNav() {
  const pathname = usePathname();

  return (
    <nav
      className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      aria-label="صفحات قانونية"
    >
      {legalPages.map((page) => {
        const active = pathname === page.slug;
        return (
          <Link
            key={page.slug}
            href={page.slug}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all",
              active
                ? "bg-navy text-white shadow-sm"
                : "border border-border bg-white text-navy hover:border-navy/30 hover:shadow-sm"
            )}
          >
            {page.title}
          </Link>
        );
      })}
    </nav>
  );
}
