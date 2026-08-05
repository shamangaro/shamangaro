import { Shield, RefreshCw, Truck, Banknote } from "lucide-react";
import { Container } from "@/components/shared/Container";

const items = [
  {
    icon: Banknote,
    title: "الدفع عند الاستلام",
    description: "كاش أو بطاقة عند التوصيل — بدون دفع أونلاين.",
  },
  {
    icon: Truck,
    title: "توصيل مجاني",
    description: "1–3 أيام عمل لجميع المدن المغربية.",
  },
  {
    icon: RefreshCw,
    title: "التبديل متاح",
    description: "بغيتي تبدلي اللون؟ تواصلي معنا بعد الاستلام.",
  },
  {
    icon: Shield,
    title: "خدمة موثوقة",
    description: "فريق SHAMANGARO كيتواصل معاك للتأكيد قبل الشحن.",
  },
];

export function WatchesTrust() {
  return (
    <section className="bg-[#7B2D42] py-10 text-white sm:py-14">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">ثقة وضمان</h2>
          <p className="mt-2 text-sm text-white/80">
            طلب آمن · توصيل مجاني · التبديل متاح
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
            >
              <Icon className="mb-3 h-7 w-7 text-[#B8924A]" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/75">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
