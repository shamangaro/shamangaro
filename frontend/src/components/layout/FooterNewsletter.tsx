"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "حدث خطأ. حاول مرة أخرى.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("تعذر الاتصال. تحقق من الإنترنت وحاول مرة أخرى.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Newsletter
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          كن أول واحد يعرف العروض الجديدة
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          عروض حصرية، منتجات جديدة، و نصائح للحياة الخارجية — مباشرة
          لبريدك.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm font-medium text-gold">
            شكراً! تم تسجيلك بنجاح. غادي نتواصلو معاك قريباً.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="example@email.com"
                dir="ltr"
                disabled={status === "loading"}
                className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-white/25 focus:bg-white/[0.08] focus:ring-2 focus:ring-white/10 disabled:opacity-60 sm:px-5 sm:text-base"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-2xl bg-white px-5 text-sm font-bold text-navy transition-all hover:bg-gold hover:text-navy active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:px-6"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    اشترك
                    <ArrowLeft
                      size={15}
                      className="transition-transform group-hover:-translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>

            {status === "error" && errorMessage && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}

            <p className="mt-3 text-xs text-white/40">
              بالاشتراك، توافق على{" "}
              <Link
                href="/privacy"
                className="text-white/60 underline-offset-2 hover:text-white hover:underline"
              >
                سياسة الخصوصية
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
