import { Sparkles, Feather, Gift } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { FR_COPY } from "./copy";

const icons = [Sparkles, Feather, Gift];

export function FrWatchesBenefits() {
  return (
    <section className="bg-[#E8F5ED]/55 py-6 sm:py-8">
      <Container>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-[#0F2A1F] sm:text-2xl">
            {FR_COPY.benefitsTitle}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {FR_COPY.benefits.map((benefit, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <div
                key={benefit.title}
                className="flex min-w-0 gap-3 rounded-xl border border-[#A8C9B4] bg-white p-3.5 shadow-sm ring-1 ring-[#B8924A]/15"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A8C9B4] bg-[#E8F5ED] ring-1 ring-[#B8924A]/25">
                  <Icon className="h-6 w-6 text-[#B8924A]" />
                </div>
                <div className="min-w-0 text-start">
                  <h3 className="font-semibold text-[#0F2A1F]">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#666]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
