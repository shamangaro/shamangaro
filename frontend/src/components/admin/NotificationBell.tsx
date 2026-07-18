"use client";

import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getNotificationSummary,
  markNotificationsSeen,
  type NotificationItem,
} from "@/lib/orders";

function playNotificationSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    /* ignore */
  }
}

function showBrowserNotification(item: NotificationItem) {
  if (typeof Notification === "undefined") return;
  if (Notification.permission === "granted") {
    new Notification("طلب جديد — SHAMANGARO", {
      body: `${item.customer_name} — ${item.order_number} — ${item.total_price} د.م`,
      icon: "/images/logo-icon.png",
      tag: item.order_number,
    });
  }
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [toast, setToast] = useState<NotificationItem | null>(null);
  const lastSeenRef = useRef<string>(new Date().toISOString());
  const knownOrdersRef = useRef<Set<string>>(new Set());

  const poll = useCallback(async () => {
    try {
      const data = await getNotificationSummary(lastSeenRef.current);
      setCount(data.pending_count);
      setItems(data.items.slice(-10).reverse());

      for (const item of data.items) {
        if (!knownOrdersRef.current.has(item.order_number)) {
          knownOrdersRef.current.add(item.order_number);
          if (knownOrdersRef.current.size > 1) {
            playNotificationSound();
            showBrowserNotification(item);
            setToast(item);
            setTimeout(() => setToast(null), 6000);
          }
        }
      }
    } catch {
      /* ignore polling errors */
    }
  }, []);

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    poll();
    const id = setInterval(poll, 8000);
    return () => clearInterval(id);
  }, [poll]);

  const handleOpen = async () => {
    setOpen((v) => !v);
    if (!open) {
      await markNotificationsSeen();
      lastSeenRef.current = new Date().toISOString();
      setCount(0);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleOpen}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg hover:bg-navy/5"
          aria-label="الإشعارات"
        >
          <Bell size={20} className="text-navy" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-navy/10 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
              <p className="text-sm font-bold text-navy">طلبات جديدة</p>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 hover:bg-navy/5"
              >
                <X size={16} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                  لا توجد إشعارات
                </p>
              ) : (
                items.map((item) => (
                  <Link
                    key={item.order_number}
                    href={`/admin/orders/${item.order_id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-navy/5 px-4 py-3 hover:bg-cream/50"
                  >
                    <p className="font-mono text-xs font-bold text-navy" dir="ltr">
                      {item.order_number}
                    </p>
                    <p className="mt-0.5 text-sm">{item.customer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.total_price} د.م
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-xl border border-red-200 bg-white p-4 shadow-2xl">
          <p className="text-xs font-bold text-red-600">🔔 طلب جديد</p>
          <p className="mt-1 font-mono text-sm font-bold text-navy" dir="ltr">
            {toast.order_number}
          </p>
          <p className="text-sm text-muted-foreground">{toast.customer_name}</p>
        </div>
      )}
    </>
  );
}
