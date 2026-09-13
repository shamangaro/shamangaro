import Link from "next/link";
import { CheckCircle2, Home, Package, Phone, User } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import type { OrderPublic } from "@/lib/orders";
import { WatchesLogoMark } from "@/components/montres-femmes/WatchesLogoMark";
import type { ThankYouCopy } from "./copy";

interface ThankYouViewProps {
  order: OrderPublic | null;
  homeHref: string;
  isWatchesOrder: boolean;
  copy: ThankYouCopy;
}

export function ThankYouView({
  order,
  homeHref,
  isWatchesOrder,
  copy,
}: ThankYouViewProps) {
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
                  href={homeHref}
                  icon={
                    isWatchesOrder ? (
                      <WatchesLogoMark tone="white" className="h-16 w-auto" />
                    ) : undefined
                  }
                  subtitle={isWatchesOrder ? "Montres Femmes" : undefined}
                  textClassName="text-white"
                  subtitleClassName={
                    isWatchesOrder
                      ? "font-semibold uppercase tracking-[0.14em] text-gold/80 text-[10px] sm:text-[11px]"
                      : undefined
                  }
                />
              </div>
              <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/20">
                <CheckCircle2 size={44} className="text-gold" />
              </div>
              <h1 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                {copy.title}
              </h1>
              <p className="mt-3 text-base text-white/80">{copy.subtitle}</p>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              {order ? (
                <>
                  <div className="rounded-2xl border border-navy/10 bg-cream p-5">
                    <p className="text-sm font-medium text-muted-foreground">
                      {copy.orderNumber}
                    </p>
                    <p
                      className="mt-1 break-all text-2xl font-black text-navy"
                      dir="ltr"
                    >
                      {order.order_number}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4">
                      <User size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {copy.name}
                        </p>
                        <p className="font-bold text-navy">
                          {order.customer_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4">
                      <Phone size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {copy.phone}
                        </p>
                        <p className="font-bold text-navy" dir="ltr">
                          {order.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-navy/10 p-4 sm:col-span-2">
                      <Package size={20} className="mt-0.5 shrink-0 text-gold" />
                      <div className="w-full">
                        <p className="text-xs text-muted-foreground">
                          {copy.offer}
                        </p>
                        <p className="font-bold text-navy">{order.offer_name}</p>
                        {order.line_items && order.line_items.length > 0 ? (
                          <ul className="mt-3 space-y-2 text-sm">
                            {order.line_items.map((item) => (
                              <li
                                key={`${item.watch_id}-${item.quantity}`}
                                className="flex justify-between gap-3 border-t border-navy/10 pt-2 first:border-0 first:pt-0"
                              >
                                <span className="text-navy">
                                  {item.watch_name} × {item.quantity}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">
                            × {order.quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 rounded-2xl bg-navy p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-white/70">{copy.total}</p>
                      <p className="text-2xl font-black">
                        {order.total_price}{" "}
                        <span className="text-sm font-bold">{copy.currency}</span>
                      </p>
                    </div>
                    <div className="sm:text-left">
                      <p className="text-sm text-white/70">{copy.paymentMethod}</p>
                      <p className="font-bold">{copy.cashOnDelivery}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-navy/10 bg-cream p-6 text-center">
                  <p className="text-base text-muted-foreground">{copy.fallback}</p>
                </div>
              )}

              <Link
                href={homeHref}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-base font-bold text-navy transition-colors hover:bg-gold-light sm:text-lg"
              >
                <Home size={20} />
                {copy.backHome}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
