import { Container } from "@/components/shared/Container";

const steps = [
  {
    num: "1",
    title: "اختاري الطراز والكمية",
    description: "Taupe، Burgundy، أو Navy Blue — وحددي الكمية.",
  },
  {
    num: "2",
    title: "عمرّي معلوماتك",
    description: "الاسم، الهاتف، والعنوان — بدون دفع أونلاين.",
  },
  {
    num: "3",
    title: "نتصلو للتأكيد",
    description: "فريقنا كيتواصل معاك خلال ساعات.",
  },
  {
    num: "4",
    title: "استلمي وادفعي",
    description: "التوصيل 1–3 أيام — الدفع عند الباب.",
  },
];

export function WatchesOrderingSteps() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
            كيفاش تطلبي؟
          </h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7B2D42] text-sm font-bold text-white">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-[#2A1A1F]">{step.title}</h3>
                <p className="mt-1 text-sm text-[#666]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
