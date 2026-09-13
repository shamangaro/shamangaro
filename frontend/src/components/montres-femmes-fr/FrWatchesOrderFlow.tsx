"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import {
  buildWatchesPurchaseEvent,
  trackMetaPurchase,
} from "@/lib/meta-pixel-purchase";
import { buildWatchesOrderPayload, createWatchesOrder } from "@/lib/watches-orders";
import { scrollToWatchesCheckout } from "@/lib/scroll-to-watches-order";
import { ApiError } from "@/lib/api";
import { useWatchesPage } from "@/components/montres-femmes/WatchesPageContext";
import { WATCHES_PRODUCT } from "@/components/montres-femmes/config";
import { Sparkles, Truck } from "lucide-react";
import {
  normalizeWatchesPhone,
  type WatchesFormErrors,
  type WatchesFormValues,
} from "@/components/montres-femmes/watches-validation";
import { FrWatchesSelectionSection } from "./FrWatchesSelectionSection";
import { FrWatchesCityCombobox } from "./FrWatchesCityCombobox";
import { validateFrenchWatchesCheckout } from "./validate-checkout";
import { FR_COPY, FR_CROSSED_PRICE, formatWatchPriceFr } from "./copy";

export function FrWatchesOrderFlow() {
  const router = useRouter();
  const checkoutRef = useRef<HTMLDivElement>(null);
  const {
    selectedLines,
    checkoutUnlocked,
    total,
    isSelectionComplete,
  } = useWatchesPage();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<WatchesFormValues>({
    name: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState<WatchesFormErrors>({});

  const set = (key: keyof WatchesFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const inputClass = (field: keyof WatchesFormErrors) =>
    cn(
      "w-full rounded-xl border bg-white px-3 py-2.5 text-[#0F2A1F] outline-none transition sm:px-4 sm:py-3",
      "focus:border-[#134A35] focus:ring-2 focus:ring-[#134A35]/15",
      errors[field] ? "border-red-400" : "border-[#D8E8DC]"
    );

  const scrollToCheckout = () => {
    scrollToWatchesCheckout();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateFrenchWatchesCheckout(
      selectedLines,
      checkoutUnlocked,
      form
    );
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.selection) {
        scrollToCheckout();
      }
      return;
    }

    setSubmitError("");
    setSubmitting(true);

    try {
      const payload = buildWatchesOrderPayload(selectedLines, {
        name: form.name,
        phone: normalizeWatchesPhone(form.phone),
        city: form.city,
      });
      const result = await createWatchesOrder(payload);
      trackMetaPurchase(
        buildWatchesPurchaseEvent(
          result.order_number,
          payload.line_items,
          result.total_price
        )
      );
      router.push(`/fr/thank-you?order=${result.order_number}`);
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof ApiError ? err.message : FR_COPY.submitError
      );
    }
  };

  return (
    <section
      id="watches-order-flow"
      className="scroll-mt-16 border-t border-[#D8E8DC]/70 bg-transparent py-8 sm:py-10"
    >
      <Container>
        <div className="mx-auto max-w-xl">
          <div className="mb-6 text-center sm:mb-7">
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#B8924A]/35 bg-gradient-to-r from-[#0A2F23] to-[#134A35] px-3 py-1 text-[11px] font-bold text-white">
              <Sparkles className="h-3 w-3 text-[#D4BC82]" aria-hidden />
              {FR_COPY.eyebrow}
            </p>
            <h1 className="text-3xl font-bold leading-snug text-[#0F2A1F] sm:text-4xl">
              {FR_COPY.h1Lead}
              <span className="text-[#134A35]">{FR_COPY.h1Rest}</span>
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5C52] sm:text-base">
              {FR_COPY.heroSub}
            </p>
            <p className="mt-3 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
              <span className="text-2xl font-bold leading-none text-[#134A35] sm:text-3xl">
                {formatWatchPriceFr(WATCHES_PRODUCT.unitPrice)}
              </span>
              <span className="text-xs text-[#888] line-through">
                {FR_CROSSED_PRICE}
              </span>
              <span className="rounded-md bg-[#B8924A]/15 px-2 py-0.5 text-[10px] font-bold text-[#134A35]">
                {FR_COPY.specialOffer}
              </span>
            </p>
            <p
              className="watches-delivery-marquee mt-3 flex flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-[#134A35] sm:gap-2 sm:text-sm"
              role="note"
              aria-label={FR_COPY.deliveryFull}
            >
              <Truck
                className="h-3.5 w-3.5 shrink-0 text-[#B8924A]"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="shrink-0">{FR_COPY.deliveryHeadline}</span>
              <span className="shrink-0 text-[8px] text-[#B8924A]/70" aria-hidden>
                ◆
              </span>
              <span className="shrink-0 text-[#4A5C52]">
                {FR_COPY.deliverySubline}
              </span>
            </p>
            <div
              className="mx-auto mb-1 mt-6 flex w-44 items-center gap-3"
              aria-hidden
            >
              <span className="h-px flex-1 bg-gradient-to-l from-[#B8924A] to-transparent" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#B8924A] shadow-[0_0_8px_rgba(184,146,74,0.55)]" />
              <span className="h-px flex-1 bg-gradient-to-r from-[#B8924A] to-transparent" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-[#0F2A1F] sm:text-xl">
              {FR_COPY.orderTitle}
            </h2>
            <p className="mt-1.5 text-sm text-[#4A5C52]">{FR_COPY.orderSub}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#A8C9B4] bg-[#FDFBF7] shadow-sm ring-1 ring-[#B8924A]/15">
            <form
              id="watches-order-form"
              noValidate
              onSubmit={handleSubmit}
              className="divide-y divide-[#D8E8DC]"
            >
              <div className="p-3 sm:p-4">
                <FrWatchesSelectionSection onContinue={scrollToCheckout} />
              </div>

              {checkoutUnlocked && (
                <div ref={checkoutRef} id="watches-checkout">
                <div className="p-3 sm:p-4">
                  <h3 className="mb-3 text-center text-base font-bold text-[#0F2A1F]">
                    {FR_COPY.stepCheckout}
                  </h3>
                  <div className="space-y-3.5">
                    <div>
                      <label
                        htmlFor="watches-name"
                        className="mb-1.5 block text-sm font-semibold text-[#0F2A1F]"
                      >
                        {FR_COPY.nameLabel}
                      </label>
                      <input
                        id="watches-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputClass("name")}
                        placeholder={FR_COPY.namePlaceholder}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="watches-phone"
                        className="mb-1.5 block text-sm font-semibold text-[#0F2A1F]"
                      >
                        {FR_COPY.phoneLabel}
                      </label>
                      <input
                        id="watches-phone"
                        type="tel"
                        dir="ltr"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={inputClass("phone")}
                        placeholder="06XXXXXXXX"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="watches-city"
                        className="mb-1.5 block text-sm font-semibold text-[#0F2A1F]"
                      >
                        {FR_COPY.cityLabel}
                      </label>
                      <FrWatchesCityCombobox
                        value={form.city}
                        onChange={(city) => set("city", city)}
                        error={errors.city}
                        inputClassName={inputClass("city")}
                      />
                      <p className="mt-2 text-xs leading-relaxed text-[#888]">
                        {FR_COPY.cityHint}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="mb-2 text-sm font-bold text-[#0F2A1F]">
                    {FR_COPY.summaryTitle}
                  </h3>

                  {isSelectionComplete && selectedLines.length > 0 ? (
                    <div className="mb-5 space-y-2 rounded-2xl bg-white/80 px-4 py-3.5 text-sm">
                      {selectedLines.map((line) => (
                        <div
                          key={line.slideId}
                          className="flex items-center gap-3 border-b border-[#D8E8DC] pb-2 last:border-0 last:pb-0"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={line.image}
                              alt={line.watchName}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-[#0F2A1F]">
                              {line.watchName} × {line.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-[#134A35]">
                            {formatWatchPriceFr(line.subtotal)}
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-between gap-3 border-t border-[#D8E8DC] pt-2">
                        <span className="font-bold text-[#0F2A1F]">
                          {FR_COPY.total}
                        </span>
                        <span className="text-lg font-bold text-[#134A35]">
                          {formatWatchPriceFr(total)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="mb-5 rounded-2xl border border-dashed border-[#A8C9B4] bg-white/60 px-4 py-3 text-center text-sm text-[#666]">
                      {FR_COPY.summaryEmpty}
                    </p>
                  )}

                  {errors.selection && (
                    <p className="mb-4 text-sm text-red-600">{errors.selection}</p>
                  )}
                  {submitError && (
                    <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#134A35] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#0A2F23] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting
                      ? FR_COPY.submitting
                      : FR_COPY.confirmOrder(formatWatchPriceFr(total))}
                  </button>

                  <ul className="mt-4 space-y-1.5 text-center text-xs text-[#4A5C52]">
                    {FR_COPY.reassurance.map((line) => (
                      <li
                        key={line}
                        className="flex items-center justify-center gap-2"
                      >
                        <span
                          className="h-1 w-1 rounded-full bg-[#1A684A]"
                          aria-hidden
                        />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-center text-[11px] leading-relaxed text-[#888]">
                    {FR_COPY.termsPrefix}
                    <Link
                      href="/terms"
                      className="font-medium text-[#134A35] underline-offset-2 hover:underline"
                    >
                      {FR_COPY.terms}
                    </Link>
                    {FR_COPY.termsAnd}
                    <Link
                      href="/privacy"
                      className="font-medium text-[#134A35] underline-offset-2 hover:underline"
                    >
                      {FR_COPY.privacy}
                    </Link>
                    {FR_COPY.termsSuffix}
                  </p>
                </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
