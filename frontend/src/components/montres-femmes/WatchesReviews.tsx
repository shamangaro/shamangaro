import { Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";

export function WatchesReviews() {
  return (
    <section className="bg-transparent py-6 sm:py-8">
      <Container>
        <div className="mx-auto max-w-xl rounded-xl border border-[#A8C9B4] bg-white p-4 text-center shadow-sm ring-1 ring-[#B8924A]/10">
          <Phone className="mx-auto h-5 w-5 text-[#B8924A]" aria-hidden />
          <h2 className="mt-2 text-lg font-bold text-[#0F2A1F]">
            كنأكدو الطلب بالتليفون
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#4A5C52]">
            غادي نتاصلو بك قبل الشحن. الدفع عند الاستلام — بلا دفع أونلاين.
          </p>
        </div>
      </Container>
    </section>
  );
}
