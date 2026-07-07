"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Check, Truck, Shield, Package, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isValidMoroccanPhone,
  MOROCCAN_PHONE_ERROR,
} from "@/lib/phone";
import { whatsappLink } from "@/lib/whatsapp";

interface Pack {
  id: string;
  label: string;
  subtitle: string;
  pricePerChair: number;
  total: number;
  badge?: string;
  savings?: number;
}

const packs: Pack[] = [
  {
    id: "solo",
    label: "كرسي واحد",
    subtitle: "Neo Transat × 1",
    pricePerChair: 249,
    total: 249,
  },
  {
    id: "duo",
    label: "كرسيين",
    subtitle: "Neo Transat × 2",
    pricePerChair: 229,
    total: 458,
    badge: "الأكثر مبيعاً",
    savings: 40,
  },
  {
    id: "family",
    label: "3 كراسي",
    subtitle: "Neo Transat × 3",
    pricePerChair: 219,
    total: 657,
    badge: "أفضل عرض",
    savings: 90,
  },
];

export function OrderSection() {
  const [selected, setSelected] = useState("duo");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const activePack = packs.find((p) => p.id === selected)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidMoroccanPhone(form.phone)) {
      setPhoneError(MOROCCAN_PHONE_ERROR);
      return;
    }

    setPhoneError("");
    setSubmitting(true);

    const msg = `سلام عليكم، بغيت نطلب Neo Transat 🌴

📦 ${activePack.label} — ${activePack.total} درهم
👤 ${form.name}
📱 ${form.phone}
📍 ${form.address}`;

    window.open(whatsappLink(msg), "_blank");

    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 800);
  };

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (done) {
    return (
      <section id="order" className="bg-[#f8f8f8] py-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-lg rounded-3xl border-2 border-navy bg-white p-10 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
              <Check size={30} className="text-navy" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-navy">
              تم إرسال طلبك بنجاح! 🎉
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              غادي نتواصلو معاك عبر واتساب خلال ساعات لتأكيد الطلب و التوصيل.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="order" className="bg-[#f8f8f8] py-10 md:py-14">
      <Container>
        <div className="mx-auto max-w-lg">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-gold/40 bg-gold/15 px-6 py-3 text-lg font-extrabold text-navy shadow-sm md:px-8 md:py-3.5 md:text-xl">
                🔥 كلما زدتي كلما وفّرتي
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold text-navy md:text-[1.75rem]">
              إختار العرض:
            </h2>
          </div>

          {/* Pack Cards */}
          <div className="space-y-4">
            {packs.map((pack, i) => {
              const isActive = selected === pack.id;
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
                    <span
                      className={cn(
                        "absolute -top-3 right-5 rounded-full px-3 py-1 text-xs font-bold",
                        pack.id === "duo"
                          ? "bg-gold text-white"
                          : "bg-navy text-white"
                      )}
                    >
                      {pack.badge}
                    </span>
                  )}

                  <div className="flex items-center gap-4">
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
                    <div className="flex-1">
                      <p className="text-base font-bold text-navy">
                        {pack.label}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {pack.subtitle}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <p className="text-2xl font-black text-navy md:text-3xl">
                        {pack.pricePerChair}
                        <span className="mr-1 text-sm font-bold text-navy/60">
                          د.م
                        </span>
                      </p>
                      {pack.savings && (
                        <p className="text-xs font-bold text-gold">
                          وفّر {pack.savings} درهم
                        </p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Trust Badges - Dark Section */}
          <div className="mt-8 rounded-2xl bg-navy p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <BadgeCheck size={20} className="text-gold" />
                </div>
                <p>
                  <span className="block text-sm font-bold text-white">الدفع عند الإستلام</span>
                  <span className="block text-xs text-white/60">بدون دفع مسبق</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Truck size={20} className="text-gold" />
                </div>
                <p>
                  <span className="block text-sm font-bold text-white">توصيل 2-5 أيام</span>
                  <span className="block text-xs text-white/60">لجميع المدن</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Shield size={20} className="text-gold" />
                </div>
                <p>
                  <span className="block text-sm font-bold text-white">ضمان سنة</span>
                  <span className="block text-xs text-white/60">إسترجاع كامل</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Package size={20} className="text-gold" />
                </div>
                <p>
                  <span className="block text-sm font-bold text-white">جودة عالية</span>
                  <span className="block text-xs text-white/60">خشب + قماش مقاوم</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div id="order-form" className="mt-10">
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
                  className="w-full rounded-full bg-navy py-4 text-center text-lg font-bold text-white transition-all duration-300 hover:bg-navy-light disabled:opacity-60"
                >
                  <span>
                    {submitting
                      ? "جاري الإرسال..."
                      : `أكّد طلبي · ${activePack.total} درهم`}
                  </span>
                </motion.button>
                <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
                  💵 الدفع عند الإستلام · بدون دفع مسبق
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
