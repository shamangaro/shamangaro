"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WatchesLanguagePopup } from "./WatchesLanguagePopup";
import {
  navigateToWatchesLang,
  readWatchesLang,
  writeWatchesLang,
  type WatchesLang,
} from "./watches-lang";

export function WatchesLanguageGate({ current }: { current: WatchesLang }) {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const stored = readWatchesLang();
    if (!stored.ok) return;

    if (!stored.value) {
      setPopupOpen(true);
      return;
    }

    if (stored.value !== current) {
      writeWatchesLang(current);
    }
  }, [current]);

  useEffect(() => {
    if (!popupOpen) return;

    return () => {
      document.querySelector("[data-watches-lang-popup]")?.remove();
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };
  }, [popupOpen]);

  if (!popupOpen || typeof document === "undefined") return null;

  return createPortal(
    <WatchesLanguagePopup
      onChoose={(lang) => {
        setPopupOpen(false);
        navigateToWatchesLang(lang);
      }}
    />,
    document.body
  );
}
