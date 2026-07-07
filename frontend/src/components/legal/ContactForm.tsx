"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { contactInfo } from "@/config/legal";
import {
  isValidMoroccanPhone,
  MOROCCAN_PHONE_ERROR,
} from "@/lib/phone";
import { whatsappLink } from "@/lib/whatsapp";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidMoroccanPhone(form.phone)) {
      setPhoneError(MOROCCAN_PHONE_ERROR);
      return;
    }

    setPhoneError("");
    setSubmitting(true);

    const text = `سلام، عندي استفسار بخصوص SHAMANGARO

الاسم: ${form.name}
الهاتف: ${form.phone}${form.email ? `\nالبريد: ${form.email}` : ""}

الرسالة:
${form.message}`;

    window.open(whatsappLink(text), "_blank");

    setTimeout(() => setSubmitting(false), 600);
  };

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-bold text-navy">
          الاسم الكامل *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="مثال: أحمد بنعلي"
          className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10"
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
          className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
        {phoneError && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {phoneError}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-navy">
          البريد الإلكتروني (اختياري)
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="example@email.com"
          dir="ltr"
          className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white px-4 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-navy">
          رسالتك *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="اكتب استفسارك أو طلبك..."
          className="w-full resize-none rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-base text-navy outline-none transition-all placeholder:text-navy/30 focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-navy/30 text-navy focus:ring-navy/20"
        />
        <span>
          أوافق على معالجة معلوماتي للرد على استفساري، وفق{" "}
          <Link
            href="/privacy"
            className="font-semibold text-navy underline-offset-2 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-base font-bold text-white transition-colors hover:bg-navy-light disabled:opacity-60"
      >
        <Send size={18} />
        {submitting ? "جاري الإرسال..." : "إرسال عبر واتساب"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        نرد خلال {contactInfo.responseTime} — {contactInfo.businessHours}
      </p>
    </form>
  );
}
