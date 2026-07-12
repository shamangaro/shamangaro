"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/orders";
import { ApiError } from "@/lib/api";
import { Logo } from "@/components/shared/Logo";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(username, password);
      router.push("/admin/orders");
      router.refresh();
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof ApiError ? err.message : "تعذر تسجيل الدخول"
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f0f0] p-4">
      <div className="w-full max-w-md rounded-2xl border border-navy/10 bg-white p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo
            variant="wordmark"
            size="lg"
            href={null}
            subtitle="لوحة إدارة الطلبات"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-navy">
              اسم المستخدم
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white pr-10 pl-4 text-navy outline-none focus:border-navy"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-navy">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-navy/15 bg-white pr-10 pl-4 text-navy outline-none focus:border-navy"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-navy py-3.5 font-bold text-white transition-colors hover:bg-navy-light disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </main>
  );
}
