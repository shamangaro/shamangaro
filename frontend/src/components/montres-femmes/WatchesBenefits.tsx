import { Sparkles, Feather, Palette, Gift } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { WATCH_BENEFITS } from "./config";

const icons = [Sparkles, Feather, Palette, Gift];

export function WatchesBenefits() {
  return (
    <section className="bg-[#F7F3EE] py-10 sm:py-14">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
            ليش تختاري هاد الساعة؟
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {WATCH_BENEFITS.map((benefit, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <div
                key={benefit.title}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7B2D42]/10">
                  <Icon className="h-6 w-6 text-[#7B2D42]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2A1A1F]">{benefit.title}</h3>
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
