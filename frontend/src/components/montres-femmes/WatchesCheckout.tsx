"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { createWatchesOrder } from "@/lib/watches-orders";
import { ApiError } from "@/lib/api";
import { useWatchesPage } from "./WatchesPageContext";
import { MOROCCAN_CITIES } from "./config";
import {
  buildWatchesAddress,
  normalizeWatchesPhone,
  validateWatchesCheckout,
  type WatchesFormErrors,
  type WatchesFormValues,
} from "./watches-validation";

const reassurance = [
  "التوصيل مجاني",
  "كتخلصي ملي توصلك الطلبية",
  "غادي نتاصلو بك باش نأكدو الطلب",
  "التبديل متوفر",
];

export function WatchesCheckout() {
  const router = useRouter();
  const { variantId, quantity, total, hasSelection } = useWatchesPage();
  const [form, setForm] = useState<WatchesFormValues>({
    name: "",
    phone: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState<WatchesFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key: keyof WatchesFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
      model: undefined,
      quantity: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateWatchesCheckout(variantId, quantity, form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const scrollTarget =
        nextErrors.model || nextErrors.quantity
          ? "watches-selection"
          : nextErrors.name
            ? "watches-name"
            : nextErrors.phone
              ? "watches-phone"
              : nextErrors.city
                ? "watches-city"
                : "watches-address";
      document.getElementById(scrollTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!variantId || !quantity) return;

    setSubmitError("");
    setSubmitting(true);

    try {
      const result = await createWatchesOrder({
        customer_name: form.name.trim(),
        phone: normalizeWatchesPhone(form.phone),
        address: buildWatchesAddress(form.city, form.address),
        product_slug: "montres-femmes",
        product_name: "Montres Femmes Élégantes",
        selected_variant: variantId,
        quantity,
        unit_price: 245,
        total_amount: total,
        source_page: "/products/montres-femmes",
      });
      router.push(`/thank-you?order=${result.order_number}`);
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : "ما قدرناش نسجلو الطلب. عاودي المحاولة."
      );
    }
  };

  const inputClass = (field: keyof WatchesFormErrors) =>
    cn(
      "w-full rounded-xl border bg-white px-4 py-3.5 text-[#2A1A1F] outline-none transition",
      "focus:border-[#7B2D42] focus:ring-2 focus:ring-[#7B2D42]/15",
      errors[field] ? "border-red-400" : "border-[#E8DFD4]"
    );

  return (
    <section
      id="watches-order"
      className="scroll-mt-24 bg-[#FAF7F2] py-10 pb-24 sm:py-14 sm:pb-12"
    >
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-[#2A1A1F] sm:text-3xl">
              عمري معلوماتك
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              من بعد ما تختاري الموديل والعدد
            </p>
          </div>

          {(errors.model || errors.quantity) && (
            <div className="mb-5 rounded-xl border border-[#7B2D42]/20 bg-[#7B2D42]/5 p-4 text-sm text-[#7B2D42]">
              {errors.model && <p>{errors.model}</p>}
              {errors.quantity && <p>{errors.quantity}</p>}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="watches-name"
                className="mb-1.5 block text-sm font-semibold text-[#2A1A1F]"
              >
                الاسم الكامل
              </label>
              <input
                id="watches-name"
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputClass("name")}
                placeholder="الاسم والنسب"
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="watches-phone"
                className="mb-1.5 block text-sm font-semibold text-[#2A1A1F]"
              >
                رقم الهاتف
              </label>
              <input
                id="watches-phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass("phone")}
                placeholder="مثال: 06XXXXXXXX"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="watches-city"
                className="mb-1.5 block text-sm font-semibold text-[#2A1A1F]"
              >
                المدينة
              </label>
              <select
                id="watches-city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className={cn(inputClass("city"), !form.city && "text-[#888]")}
              >
                <option value="">اختاري المدينة</option>
                {MOROCCAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="mt-1.5 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="watches-address"
                className="mb-1.5 block text-sm font-semibold text-[#2A1A1F]"
              >
                العنوان بالتفصيل
              </label>
              <textarea
                id="watches-address"
                rows={3}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={cn(inputClass("address"), "resize-none")}
                placeholder="الحي، الزنقة، رقم الدار..."
              />
              {errors.address && (
                <p className="mt-1.5 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {submitError && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !hasSelection}
              className="w-full rounded-2xl bg-[#7B2D42] py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(123,45,66,0.25)] transition hover:bg-[#5C2233] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
            >
              {submitting
                ? "كندوزو الطلب..."
                : hasSelection
                  ? `أكدي الطلب — ${total} درهم`
                  : "اختاري الموديل والعدد أولاً"}
            </button>
          </form>

          <ul className="mt-6 space-y-2 text-center text-sm text-[#5C4A52]">
            {reassurance.map((line) => (
              <li key={line} className="flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8924A]" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
