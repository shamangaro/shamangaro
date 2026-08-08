import { Banknote, RefreshCw, Shield, Truck } from "lucide-react";
import { LedTickerBand } from "@/components/shared/LedTickerBand";

const announcements = [
  { icon: Truck, label: "توصيل مجاني لجميع مدن المغرب" },
  { icon: Banknote, label: "الدفع عند الإستلام" },
  { icon: RefreshCw, label: "كاين التبديل" },
  { icon: Shield, label: "تغليف هدايا" },
];

export function WatchesTrustBar() {
  return (
    <LedTickerBand
      items={announcements}
      ariaLabel="عروض و مميزات Montres Femmes"
      compact
      animation="vertical"
      intervalMs={4000}
      variant="feminine-brand"
    />
  );
}
