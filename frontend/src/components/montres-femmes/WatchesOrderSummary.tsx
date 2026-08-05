"use client";

import { Container } from "@/components/shared/Container";
import { useSelectedVariant, useWatchesPage } from "./WatchesPageContext";
import { formatWatchPrice, WATCHES_PRODUCT } from "./config";

export function WatchesOrderSummary() {
  const { quantity, total, unitPrice, hasSelection } = useWatchesPage();
  const variant = useSelectedVariant();

  if (!hasSelection || !variant || !quantity) {
    return (
      <section className="bg-[#F7F3EE] py-6 sm:py-8">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-[#D4C4B8] bg-[#FAF7F2]/60 p-6 text-center">
            <p className="text-sm text-[#666]">
              اختاري الموديل والعدد باش يبان ملخص الطلب
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F3EE] py-6 sm:py-8">
      <Container>
        <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#E8DFD4] bg-white shadow-[0_8px_30px_rgba(42,26,31,0.06)]">
          <div className="border-b border-[#E8DFD4] bg-gradient-to-l from-[#FAF7F2] to-white px-5 py-4">
            <h2 className="text-xl font-bold text-[#2A1A1F] sm:text-2xl">
              ملخص الطلب
            </h2>
          </div>
          <dl className="space-y-3 px-5 py-4 text-sm sm:text-base">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#666]">الساعة المختارة</dt>
              <dd className="font-semibold text-[#2A1A1F]">
                {variant.label} ({variant.labelAr})
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#666]">العدد</dt>
              <dd className="font-semibold text-[#2A1A1F]">{quantity}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#666]">ثمن الساعة</dt>
              <dd className="font-semibold text-[#2A1A1F]">
                {formatWatchPrice(unitPrice)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-[#666]">التوصيل</dt>
              <dd className="font-semibold text-[#2A8A5F]">مجاني</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-[#E8DFD4] pt-3">
              <dt className="text-base font-bold text-[#2A1A1F] sm:text-lg">
                المجموع النهائي
              </dt>
              <dd className="text-xl font-bold text-[#7B2D42] sm:text-2xl">
                {formatWatchPrice(total)}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
