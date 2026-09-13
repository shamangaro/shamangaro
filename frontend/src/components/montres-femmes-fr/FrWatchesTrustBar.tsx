"use client";

import { Banknote, RefreshCw, Shield, Truck } from "lucide-react";
import { LedTickerBand } from "@/components/shared/LedTickerBand";
import { FR_COPY } from "./copy";

const announcements = [
  { icon: Truck, label: FR_COPY.announcements[0] },
  { icon: Banknote, label: FR_COPY.announcements[1] },
  { icon: RefreshCw, label: FR_COPY.announcements[2] },
  { icon: Shield, label: FR_COPY.announcements[3] },
];

export function FrWatchesTrustBar() {
  return (
    <LedTickerBand
      items={announcements}
      ariaLabel={FR_COPY.tickerAria}
      compact
      animation="vertical"
      intervalMs={4000}
      variant="feminine-brand"
    />
  );
}
