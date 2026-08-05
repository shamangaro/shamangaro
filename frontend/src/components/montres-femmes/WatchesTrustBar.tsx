import { Truck, Banknote, RefreshCw, Shield } from "lucide-react";
import { Container } from "@/components/shared/Container";

const items = [
  { icon: Truck, label: "توصيل مجاني" },
  { icon: Banknote, label: "الدفع عند الاستلام" },
  { icon: RefreshCw, label: "التبديل متوفر" },
  { icon: Shield, label: "تغليف هدايا" },
];

export function WatchesTrustBar() {
  return (
    <div className="border-b border-[#E8DFD4] bg-[#F7F3EE] py-2.5">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-[#5C4A52] sm:text-sm">
          {items.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-[#B8924A]" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
