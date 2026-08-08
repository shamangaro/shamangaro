import { Star } from "lucide-react";
import { Container } from "@/components/shared/Container";

const WATCH_REVIEWS = [
  {
    name: "سارة م.",
    city: "الدار البيضاء",
    text: "الساعة أنيقة بزاف و العلبة ولات جاهزة للهدية. التوصيل وصلني ف يومين.",
  },
  {
    name: "أمينة ل.",
    city: "الرباط",
    text: "خفيفة على اليد و كتبان مع كل حاجة لبست. خلصت ملي وصلت و ما كانتش مشكلة.",
  },
  {
    name: "فاطمة ب.",
    city: "مراكش",
    text: "هدية لختي و عجباتها بزاف. الجودة مزيانة و الثمن معقول.",
  },
] as const;

export function WatchesReviews() {
  return (
    <section className="bg-[#FAF7F2] py-6 sm:py-8">
      <Container>
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-[#B8924A] text-[#B8924A]"
                aria-hidden
              />
            ))}
          </div>
          <h2 className="mt-2 text-xl font-bold text-[#0F2A1F] sm:text-2xl">
            آراء الزبناء
          </h2>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {WATCH_REVIEWS.map((review) => (
            <li
              key={review.name}
              className="rounded-xl border border-[#A8C9B4] bg-white p-4 shadow-sm ring-1 ring-[#B8924A]/10"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[#B8924A] text-[#B8924A]"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[#4A5C52]">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-3 border-t border-[#D8E8DC] pt-2.5 text-xs font-semibold text-[#0F2A1F]">
                {review.name}
                <span className="mx-1 font-normal text-[#888]">·</span>
                <span className="font-normal text-[#666]">{review.city}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
