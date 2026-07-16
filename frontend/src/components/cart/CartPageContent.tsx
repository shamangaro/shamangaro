"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  cartCatalog,
  getCartItemColor,
  useCart,
} from "@/components/layout/cart-store";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

export function CartPageContent() {
  const {
    items,
    hydrated,
    subtotal,
    savings,
    addItem,
    removeItem,
    updateQuantity,
    getCartItemPricing,
  } = useCart();

  const isEmpty = hydrated && items.length === 0;

  return (
    <main className="min-h-[60vh] overflow-x-clip bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f5] py-6 sm:py-8 md:py-12">
      <Container>
        <Link
          href="/"
          className="mb-6 inline-flex min-h-11 items-center gap-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
        >
          <ChevronLeft size={16} />
          متابعة التسوق
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/15">
            <ShoppingBag size={22} strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-navy md:text-3xl">
              سلة التسوق
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              راجع منتجاتك قبل إتمام الطلب
            </p>
          </div>
        </div>

        {!hydrated ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">
            جاري تحميل السلة...
          </div>
        ) : isEmpty ? (
          <div className="rounded-2xl border-2 border-navy/10 bg-white p-8 text-center shadow-sm md:p-12">
            <ShoppingBag
              size={48}
              className="mx-auto text-navy/20"
              strokeWidth={1.5}
            />
            <p className="mt-4 text-lg font-bold text-navy">السلة فارغة</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              أضف Neo Transat للسلة وكمّل الطلب بسهولة.
            </p>
            <div className="mx-auto mt-8 max-w-md space-y-2">
              {cartCatalog.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addItem(product.id)}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-[#fafafa] px-4 py-3 text-start transition-colors hover:border-navy/25 hover:bg-white"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-navy">
                    {product.name} — {product.subtitle}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-navy">
                    {product.total} د.م
                  </span>
                </button>
              ))}
            </div>
            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-navy/15 px-6 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <ul className="space-y-4">
              {items.map((item) => {
                const color = getCartItemColor(item);
                const pricing = getCartItemPricing(item);

                return (
                  <li
                    key={item.id}
                    className="rounded-2xl border-2 border-navy/10 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-navy/10 bg-[#fafafa] sm:mx-0 sm:h-28 sm:w-28">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                          sizes="112px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-base font-extrabold text-navy sm:text-lg">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                              {pricing.subtitle}
                            </p>
                            {pricing.savings > 0 ? (
                              <p className="mt-1.5 text-xs font-bold text-green-700">
                                وفّرت {pricing.savings} د.م
                              </p>
                            ) : null}
                            {color ? (
                              <p className="mt-2 text-xs font-medium text-navy/70 sm:text-sm">
                                <span className="text-muted-foreground">
                                  اللون:{" "}
                                </span>
                                <span className="font-semibold text-fabric">
                                  {color}
                                </span>
                              </p>
                            ) : null}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`حذف ${item.name}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                          <div className="inline-flex w-fit items-center rounded-full border-2 border-navy/10 bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="نقص الكمية"
                              className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:bg-navy/5"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="min-w-10 text-center text-sm font-bold text-navy">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="زِد الكمية"
                              className="flex h-11 w-11 items-center justify-center text-navy transition-colors hover:bg-navy/5"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="text-start sm:text-end">
                            <p className="text-xs text-muted-foreground">
                              {pricing.pricePerChair} د.م / كرسي
                              {pricing.savings > 0 ? (
                                <span className="ms-1.5 text-red-500 line-through">
                                  {pricing.originalPricePerChair} د.م
                                </span>
                              ) : null}
                            </p>
                            <p className="text-base font-extrabold text-navy sm:text-lg">
                              {pricing.lineTotal} د.م
                            </p>
                            {pricing.savings > 0 ? (
                              <p className="mt-0.5 text-sm font-medium text-red-500 line-through">
                                {pricing.originalTotal} د.م
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="rounded-2xl border-2 border-navy bg-white p-5 shadow-[0_8px_30px_-12px_rgba(17,17,17,0.25)] lg:sticky lg:top-24">
              <h2 className="text-lg font-extrabold text-navy">ملخص الطلب</h2>

              <dl className="mt-5 space-y-3 border-b border-border pb-5">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">
                    المجموع الفرعي
                  </dt>
                  <dd className="text-base font-bold text-navy">
                    {subtotal} د.م
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-muted-foreground">التوصيل</dt>
                  <dd className="text-sm font-semibold text-green-700">
                    مجاني
                  </dd>
                </div>
                {savings > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-semibold text-green-700">
                      التوفير
                    </dt>
                    <dd className="text-sm font-bold text-green-700">
                      −{savings} د.م
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-navy">
                  المجموع الكلي
                </span>
                <span className="text-2xl font-extrabold text-navy">
                  {subtotal} د.م
                </span>
              </div>

              <Link
                href="/#order"
                className={cn(
                  "mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-lg shadow-navy/15 transition-all hover:bg-navy-light hover:shadow-xl hover:shadow-navy/20"
                )}
              >
                متابعة إلى الدفع
              </Link>

              <p className="mt-3 text-center text-xs font-medium text-muted-foreground">
                الدفع عند الإستلام · بدون دفع مسبق
              </p>
            </aside>
          </div>
        )}
      </Container>
    </main>
  );
}
