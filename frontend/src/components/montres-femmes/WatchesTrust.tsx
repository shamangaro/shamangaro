import { Shield, RefreshCw, Truck, Banknote } from "lucide-react";
import { Container } from "@/components/shared/Container";

const items = [
  {
    icon: Banknote,
    title: "الدفع عند الإستلام",
    subline: "بدون دفع أونلاين",
  },
  {
    icon: Truck,
    title: "توصيل مجاني",
    subline: "1–3 أيام · كل المدن",
    sublineClassName: "font-semibold text-emerald-300",
  },
  {
    icon: RefreshCw,
    title: "كاين التبديل",
    subline: "تبدّلي اللون بسهولة",
  },
  {
    icon: Shield,
    title: "خدمة مضمونة",
    subline: "تأكيد قبل الشحن",
  },
];

export function WatchesTrust() {
  return (
    <section className="bg-[#E8F5ED]/45 py-6 sm:py-8">
      <Container>
        <div className="mx-auto w-full max-w-md rounded-2xl bg-gradient-to-br from-[#0A2F23] to-[#134A35] p-4 shadow-sm ring-1 ring-[#B8924A]/25 sm:p-5">
          <div className="grid grid-cols-2 gap-3">
            {items.map(({ icon: Icon, title, subline, sublineClassName }) => (
              <div key={title} className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-10 sm:w-10">
                  <Icon size={20} className="text-[#B8924A]" />
                </div>
                <p className="min-w-0 flex-1 text-start">
                  <span className="block text-[13px] font-bold leading-snug text-white sm:text-[14px]">
                    {title}
                  </span>
                  <span
                    className={`block text-[10px] leading-snug text-white/60 sm:text-[11px] ${sublineClassName ?? ""}`}
                  >
                    {subline}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
