import { Container } from "@/components/shared/Container";
import { FR_COPY } from "./copy";

export function FrWatchesOrderingSteps() {
  return (
    <section className="bg-white/50 py-6 sm:py-8">
      <Container>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-[#0F2A1F] sm:text-2xl">
            {FR_COPY.stepsTitle}
          </h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {FR_COPY.steps.map((step, i) => (
            <div key={step.num} className="flex min-w-0 gap-4 text-start">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                  i % 2 === 0 ? "bg-[#134A35]" : "bg-[#1A684A]"
                }`}
              >
                {step.num}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[#0F2A1F]">{step.title}</h3>
                <p className="mt-1 text-sm text-[#666]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
