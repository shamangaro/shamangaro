export const WATCHES_LANG_KEY = "shamangaro.watches.lang";

export type WatchesLang = "darija" | "fr";

export const DARIJA_WATCHES_PATH = "/products/montres-femmes";
export const FRENCH_WATCHES_PATH = "/fr/products/montres-femmes";

export function pathForWatchesLang(lang: WatchesLang): string {
  return lang === "fr" ? FRENCH_WATCHES_PATH : DARIJA_WATCHES_PATH;
}

export function readWatchesLang():
  | { ok: true; value: WatchesLang | null }
  | { ok: false } {
  try {
    const raw = window.localStorage.getItem(WATCHES_LANG_KEY);
    if (raw === "darija" || raw === "fr") {
      return { ok: true, value: raw };
    }
    return { ok: true, value: null };
  } catch {
    return { ok: false };
  }
}

export function writeWatchesLang(lang: WatchesLang): void {
  try {
    window.localStorage.setItem(WATCHES_LANG_KEY, lang);
  } catch {
    // Keep navigation usable even if storage is blocked.
  }
}

export function navigateToWatchesLang(lang: WatchesLang): void {
  writeWatchesLang(lang);
  const nextPath = pathForWatchesLang(lang);
  const { pathname, search, hash } = window.location;
  if (pathname === nextPath) return;
  window.location.assign(`${nextPath}${search}${hash}`);
}
