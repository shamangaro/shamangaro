"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Truck, Shield, Package, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isValidMoroccanPhone,
  MOROCCAN_PHONE_ERROR,
} from "@/lib/phone";
import { createOrder } from "@/lib/orders";
import { ApiError } from "@/lib/api";
import {
  BASE_PRICE_PER_CHAIR,
  getOfferSavings,
  getOriginalTotal,
  productOffers,
} from "@/lib/offers";

export function OrderSection() {
  const router = useRouter();
  const [selected, setSelected] = useState("duo");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const activePack = productOffers.find((p) => p.id === selected)!;
  const activeOriginalTotal = getOriginalTotal(activePack.chairs);
  const activeSavings = getOfferSavings(activePack.chairs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidMoroccanPhone(form.phone)) {
      setPhoneError(MOROCCAN_PHONE_ERROR);
      return;
    }

    setPhoneError("");
    setSubmitError("");
    setSubmitting(true);

    try {
      const result = await createOrder({
        customer_name: form.name.trim(),
        phone: form.phone,
        address: form.address.trim(),
        offer_id: selected as "solo" | "duo" | "family",
      });
      router.push(`/thank-you?order=${result.order_number}`);
    } catch (err) {
      setSubmitting(false);
      if (process.env.NODE_ENV === "development") {
        console.error("[checkout] order submit failed:", err);
      }
      if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        setSubmitError("تعذر إرسال الطلب. حاول مرة أخرى.");
      }
    }
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <section id="order" className="bg-[#f8f8f8] py-10 pb-32 lg:py-14 lg:pb-14">
      <Container>
        <div className="mx-auto max-w-lg">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border-2 border-green-500/40 bg-green-500/10 px-3 py-2.5 text-center text-sm font-extrabold leading-snug text-green-700 shadow-sm sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3.5 md:text-xl">
                🔥 كلما زدتي كلما وفّرتي
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold text-navy md:text-[1.75rem]">
              إختار العرض:
            </h2>
          </div>

          {/* Pack Cards */}
          <div className="space-y-4 pt-2">
            {productOffers.map((pack, i) => {
              const isActive = selected === pack.id;
              const originalTotal = getOriginalTotal(pack.chairs);
              const savings = getOfferSavings(pack.chairs);
              return (
                <motion.button
                  key={pack.id}
                  type="button"
                  onClick={() => setSelected(pack.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "relative w-full rounded-2xl border-2 border-dashed bg-white px-5 py-5 text-start transition-all duration-200",
                    isActive
                      ? "border-navy shadow-lg shadow-black/10"
                      : "border-navy/25 hover:border-navy/50 hover:shadow-sm"
                  )}
                >
                  {pack.badge && (
                    pack.id === "family" ? (
                      <motion.span
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-3.5 py-1 text-xs font-extrabold tracking-wide text-white shadow-lg shadow-red-500/50 ring-2 ring-red-300/60"
                      >
                        {pack.badge}
                      </motion.span>
                    ) : (
                      <span
                        className={cn(
                          "absolute -top-3 right-5 rounded-full px-3 py-1 text-xs font-bold",
                          pack.id === "duo"
                            ? "bg-green-600 text-white shadow-sm"
                            : "bg-navy text-white"
                        )}
                      >
                        {pack.badge}
                      </span>
                    )
                  )}

                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Radio */}
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        isActive
                          ? "border-navy bg-navy"
                          : "border-navy/30"
                      )}
                    >
                      {isActive && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold text-navy">
                        {pack.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        <span className="font-medium text-fabric">Neo Transat</span>
                        {pack.subtitle.replace("Neo Transat", "")}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="ms-auto shrink-0 text-left">
                      <p className="text-2xl font-black leading-none text-navy md:text-3xl">
                        {pack.pricePerChair}
                        <span className="mr-1 text-sm font-bold text-navy/60">
                          د.م
                        </span>
                      </p>
                      {pack.chairs > 1 ? (
                        <p className="mt-0.5 text-xs font-semibold text-navy/60">
                          للكرسي
                        </p>
                      ) : null}
                      {savings > 0 && pack.chairs > 1 ? (
                        <p className="text-xs font-medium text-red-500 line-through">
                          {BASE_PRICE_PER_CHAIR} د.م
                        </p>
                      ) : null}
                      {pack.chairs > 1 ? (
                        <p className="mt-1 text-sm font-bold text-navy">
                          {pack.total} د.م{" "}
                          <span className="text-xs font-medium text-navy/60">
                            المجموع
                          </span>
                        </p>
                      ) : null}
                      {savings > 0 ? (
                        <p className="mt-0.5 text-sm font-medium text-red-500 line-through">
                          {pack.chairs > 1
                            ? `${originalTotal} د.م`
                            : `${BASE_PRICE_PER_CHAIR} د.م`}
                        </p>
                      ) : null}
                      {savings > 0 ? (
                        <p className="text-sm font-extrabold text-green-700">
                          وفّر {savings} درهم
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Order Form */}
          <div id="order-form" className="mt-8">
            <h3 className="mb-6 text-center text-xl font-bold text-navy">
              📦 معلومات التوصيل
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-navy">
                  الإسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="مثال: أحمد بنعلي"
                  className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10 focus:shadow-md focus:shadow-black/5"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-navy">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => {
                    set("phone", e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                  placeholder="06XXXXXXXX"
                  dir="ltr"
                  pattern="0[67][0-9]{8}"
                  title={MOROCCAN_PHONE_ERROR}
                  className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10 focus:shadow-md focus:shadow-black/5"
                />
                {phoneError && (
                  <p className="mt-1.5 text-sm text-red-600" role="alert">
                    {phoneError}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-bold text-navy">
                  العنوان الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="المدينة، الحي، الشارع، رقم المنزل..."
                  className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10 focus:shadow-md focus:shadow-black/5"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 8px 30px rgba(17, 17, 17, 0.2)",
                      "0 12px 40px rgba(17, 17, 17, 0.35)",
                      "0 8px 30px rgba(17, 17, 17, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="min-h-12 w-full rounded-full bg-navy py-4 text-center text-base font-bold text-white transition-all duration-300 hover:bg-navy-light disabled:opacity-60 sm:text-lg"
                >
                  <span>
                    {submitting
                      ? "جاري الإرسال..."
                      : `أكّد طلبي · ${activePack.total} درهم`}
                  </span>
                </motion.button>
                {activeSavings > 0 ? (
                  <p className="mt-2 text-center text-sm font-medium text-red-500 line-through">
                    {activeOriginalTotal} درهم
                  </p>
                ) : null}
                <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
                  💵 الدفع عند الإستلام · بدون دفع مسبق
                </p>
              </div>
            </form>
          </div>

          {/* Trust Badges - Dark Section */}
          <div className="mt-8 rounded-2xl bg-[#1b3a4b] p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <BadgeCheck size={20} className="text-[#d4a853]" />
                </div>
                <p className="min-w-0 flex-1 text-right">
                  <span className="block text-[14px] font-bold text-white">
                    الدفع عند الإستلام
                  </span>
                  <span className="block text-[11px] text-white/60">
                    بدون دفع مسبق
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Truck size={20} className="text-[#d4a853]" />
                </div>
                <p className="min-w-0 flex-1 text-right">
                  <span className="block text-[14px] font-bold text-white">
                    توصيل 2-5 أيام
                  </span>
                  <span className="block text-[11px] text-white/60">
                    لجميع المدن
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Shield size={20} className="text-[#d4a853]" />
                </div>
                <p className="min-w-0 flex-1 text-right">
                  <span className="block text-[14px] font-bold text-white">
                    ضمان سنة
                  </span>
                  <span className="block text-[11px] text-white/60">
                    إسترجاع كامل
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Package size={20} className="text-[#d4a853]" />
                </div>
                <p className="min-w-0 flex-1 text-right">
                  <span className="block text-[14px] font-bold text-white">
                    جودة عالية
                  </span>
                  <span className="block text-[11px] text-white/60">
                    خشب + قماش مقاوم
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
