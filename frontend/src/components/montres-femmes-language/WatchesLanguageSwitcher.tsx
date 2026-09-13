"use client";

import { cn } from "@/lib/utils";
import { navigateToWatchesLang, type WatchesLang } from "./watches-lang";

export function WatchesLanguageSwitcher({
  current,
}: {
  current: WatchesLang;
}) {
  return (
    <div
      className="flex h-9 shrink-0 items-center gap-0.5 px-0.5 text-[10px] font-semibold leading-none sm:text-[11px]"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        dir="rtl"
        aria-current={current === "darija" ? "page" : undefined}
        onClick={() => navigateToWatchesLang("darija")}
        className={cn(
          "rounded-md px-1 py-1 transition-colors",
          current === "darija"
            ? "text-[#134A35]"
            : "text-[#134A35]/45 hover:text-[#134A35]"
        )}
      >
        الدارجة
      </button>
      <span className="select-none text-[#B8924A]/70" aria-hidden>
        |
      </span>
      <button
        type="button"
        dir="ltr"
        aria-current={current === "fr" ? "page" : undefined}
        onClick={() => navigateToWatchesLang("fr")}
        className={cn(
          "rounded-md px-1 py-1 tracking-wide transition-colors",
          current === "fr"
            ? "text-[#134A35]"
            : "text-[#134A35]/45 hover:text-[#134A35]"
        )}
      >
        FR
      </button>
    </div>
  );
}
