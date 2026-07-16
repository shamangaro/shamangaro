import Link from "next/link";
import { CheckCircle2, Home, Package, Phone, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { getServerApiBase } from "@/lib/api-server";
import type { OrderPublic } from "@/lib/orders";

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string }>;
}

async function getOrderPublic(orderNumber: string): Promise<OrderPublic | null> {
  try {
    const base = getServerApiBase();
    const res = await fetch(`${base}/orders/${orderNumber}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderNumber = params.order?.trim();
  const order = orderNumber ? await getOrderPublic(orderNumber) : null;

  return (
    <main className="min-h-screen bg-[#f8f8f8] py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <div className="overflow-hidden rounded-3xl border-2 border-navy/10 bg-white shadow-xl shadow-black/5">
            <div className="bg-navy px-5 py-8 text-center sm:px-8 sm:py-10">
              <div className="flex justify-center">
                <Logo
                  variant="wordmark"
                  size="md"
                  href="/"
                  textClassName="text-white"
                />
              </div>
              <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/20">
                <CheckCircle2 size={44} className="text-gold" />
              </div>
              <h1 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                شكراً على طلبك!
              </h1>
              <p className="mt-3 text-base text-white/80">
                تم تسجيل طلبك بنجاح، وسنتصل بك قريباً لتأكيده.
              </p>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              {order ? (
                <>
                  <div className="rounded-2xl border border-navy/10 bg-cream p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                      رقم الطلب
                    </p>
                    <p className="mt-1 break-all text-2xl font-black text-navy" dir="ltr">
                      {order.order_number}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4">
                      <User size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">الاسم</p>
                        <p className="font-bold text-navy">{order.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4">
                      <Phone size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">الهاتف</p>
                        <p className="font-bold text-navy" dir="ltr">
                          {order.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4 sm:col-span-2">
                      <Package size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">العرض</p>
                        <p className="font-bold text-navy">
                          {order.offer_name} × {order.quantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-2xl bg-navy p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-white/70">المجموع</p>
                      <p className="text-2xl font-black">
                        {order.total_price}{" "}
                        <span className="text-sm font-bold">د.م</span>
                      </p>
                    </div>
                    <div className="sm:text-left">
                      <p className="text-sm text-white/70">طريقة الدفع</p>
                      <p className="font-bold">الدفع عند الاستلام</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-navy/10 bg-cream p-6 text-center">
                  <p className="text-base text-muted-foreground">
                    تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد التفاصيل.
                  </p>
                </div>
              )}

              <Link
                href="/"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-base font-bold text-navy transition-colors hover:bg-gold-light sm:text-lg"
              >
                <Home size={20} />
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
