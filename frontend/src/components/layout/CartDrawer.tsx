"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  cartCatalog,
  getCartItemColor,
  useCart,
} from "@/components/layout/cart-store";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    subtotal,
    savings,
    addItem,
    removeItem,
    updateQuantity,
    getCartItemPricing,
  } = useCart();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="إغلاق السلة"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy/40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="سلة التسوق"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 end-0 z-[70] flex w-full max-w-md flex-col border-s border-border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-navy" strokeWidth={1.75} />
                <h2 className="text-lg font-bold text-navy">سلة التسوق</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="flex h-11 w-11 items-center justify-center rounded-full text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag
                    size={40}
                    className="text-navy/20"
                    strokeWidth={1.5}
                  />
                  <p className="mt-4 text-base font-semibold text-navy">
                    السلة فارغة
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    أضف Neo Transat للسلة وكمّل الطلب بسهولة.
                  </p>
                  <div className="mt-6 w-full space-y-2">
                    {cartCatalog.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addItem(product.id)}
                        className="flex w-full items-center justify-between rounded-xl border border-border bg-[#fafafa] px-4 py-3 text-start transition-colors hover:border-navy/20 hover:bg-white"
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
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const pricing = getCartItemPricing(item);
                    const color = getCartItemColor(item);

                    return (
                      <li
                        key={item.id}
                        className="rounded-2xl border border-border/70 bg-[#fafafa] p-4"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {pricing.subtitle}
                            </p>
                            {color ? (
                              <p className="mt-1 text-xs text-fabric">
                                {color}
                              </p>
                            ) : null}
                            <p className="mt-2 text-sm font-semibold text-navy">
                              {pricing.pricePerChair} د.م / كرسي
                              {pricing.savings > 0 ? (
                                <span className="ms-1.5 text-xs font-medium text-red-500 line-through">
                                  {pricing.originalPricePerChair} د.م
                                </span>
                              ) : null}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`حذف ${item.name}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border bg-white">
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
                            <span className="min-w-8 text-center text-sm font-bold text-navy">
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

                          <div className="text-end">
                            <p className="text-base font-bold text-navy">
                              {pricing.lineTotal} د.م
                            </p>
                            {pricing.savings > 0 ? (
                              <p className="mt-0.5 text-xs font-medium text-red-500 line-through">
                                {pricing.originalTotal} د.م
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-border px-5 py-5">
              {savings > 0 ? (
                <div className="mb-3 flex items-center justify-between text-sm font-semibold text-green-700">
                  <span>التوفير</span>
                  <span>−{savings} د.م</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  المجموع الفرعي
                </span>
                <span className="text-xl font-extrabold text-navy">
                  {subtotal} د.م
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className={cn(
                    "flex h-12 w-full items-center justify-center rounded-full bg-navy text-sm font-bold text-white transition-colors hover:bg-navy-light",
                    items.length === 0 && "pointer-events-none opacity-50"
                  )}
                  aria-disabled={items.length === 0}
                >
                  إتمام الطلب
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-12 w-full items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-navy transition-colors hover:bg-[#fafafa]"
                >
                  متابعة التسوق
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
