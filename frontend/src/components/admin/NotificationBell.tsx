"use client";

import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getNotificationSummary,
  markNotificationsSeen,
  type NotificationItem,
} from "@/lib/orders";

type StatusKind = "success" | "error" | "info";

interface StatusMessage {
  kind: StatusKind;
  text: string;
}

function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isStandalonePwa(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

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

const IOS_HOME_SCREEN_MESSAGE =
  "إشعارات iPhone متاحة فقط عند فتح CRM من الشاشة الرئيسية. اضغط «مشاركة» ← «إضافة إلى الشاشة الرئيسية»، ثم افتح التطبيق من هناك.";

const IOS_DENIED_MESSAGE =
  "تم رفض الإشعارات. افتح إعدادات iPhone ← SHAMANGARO ← الإشعارات ← السماح بالإشعارات.";

const UNSUPPORTED_MESSAGE =
  "المتصفح الحالي لا يدعم إشعارات المتصفح.";

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [toast, setToast] = useState<NotificationItem | null>(null);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const lastSeenRef = useRef<string>(new Date().toISOString());
  const knownOrdersRef = useRef<Set<string>>(new Set());
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showStatus = useCallback((kind: StatusKind, text: string) => {
    setStatus({ kind, text });
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatus(null), 8000);
    if (process.env.NODE_ENV === "development") {
      console.debug("[NotificationBell] status:", kind, text);
    }
  }, []);

  const showDeniedMessage = useCallback(() => {
    showStatus(
      "error",
      isIosDevice() ? IOS_DENIED_MESSAGE : "تم رفض الإشعارات. فعّلها من إعدادات المتصفح."
    );
  }, [showStatus]);

  const showGrantedSuccess = useCallback(() => {
    showStatus("success", "تم تفعيل الإشعارات بنجاح.");
    try {
      new Notification("تم تفعيل إشعارات SHAMANGARO", {
        body: "ستصلك تنبيهات عند وصول طلبات جديدة.",
        icon: "/images/logo-icon.png",
      });
      if (process.env.NODE_ENV === "development") {
        console.debug("[NotificationBell] test notification sent");
      }
    } catch (err) {
      console.error("[NotificationBell] test notification failed:", err);
      showStatus(
        "error",
        `تعذر إرسال إشعار تجريبي: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }, [showStatus]);

  const runPermissionFlow = useCallback(async () => {
    const context = {
      isIos: isIosDevice(),
      isStandalone: isStandalonePwa(),
      hasNotificationApi: typeof Notification !== "undefined",
      permission:
        typeof Notification !== "undefined" ? Notification.permission : "unavailable",
    };

    if (process.env.NODE_ENV === "development") {
      console.debug("[NotificationBell] bell tapped", context);
    }

    if (isIosDevice() && !isStandalonePwa()) {
      console.warn("[NotificationBell] iOS requires Home Screen web app for notifications");
      showStatus("error", IOS_HOME_SCREEN_MESSAGE);
      return;
    }

    if (typeof Notification === "undefined") {
      console.warn("[NotificationBell] Notification API unavailable", context);
      showStatus("error", UNSUPPORTED_MESSAGE);
      return;
    }

    const current = Notification.permission;

    if (current === "default") {
      try {
        const result = await Notification.requestPermission();
        if (process.env.NODE_ENV === "development") {
          console.debug("[NotificationBell] requestPermission result:", result);
        }
        if (result === "granted") {
          showGrantedSuccess();
        } else if (result === "denied") {
          showDeniedMessage();
        } else {
          showStatus("info", "لم يتم منح إذن الإشعارات.");
        }
      } catch (err) {
        console.error("[NotificationBell] requestPermission failed:", err);
        showStatus(
          "error",
          `تعذر طلب إذن الإشعارات: ${err instanceof Error ? err.message : String(err)}`
        );
      }
      return;
    }

    if (current === "denied") {
      showDeniedMessage();
      return;
    }

    showGrantedSuccess();
  }, [showDeniedMessage, showGrantedSuccess, showStatus]);

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
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("[NotificationBell] poll failed:", err);
      }
    }
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, 8000);
    return () => {
      clearInterval(id);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, [poll]);

  const handleBellClick = async () => {
    await runPermissionFlow();

    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      try {
        await markNotificationsSeen();
        lastSeenRef.current = new Date().toISOString();
        setCount(0);
      } catch (err) {
        console.error("[NotificationBell] markNotificationsSeen failed:", err);
        showStatus(
          "error",
          `تعذر تحديث الإشعارات: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  };

  const statusClassName =
    status?.kind === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : status?.kind === "error"
        ? "border-red-200 bg-red-50 text-red-800"
        : "border-navy/10 bg-cream text-navy";

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={handleBellClick}
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

        {status && !open && (
          <div
            role="status"
            className={`absolute end-0 top-full z-[60] mt-2 w-72 rounded-xl border px-3 py-2.5 text-xs leading-relaxed shadow-xl ${statusClassName}`}
          >
            {status.text}
          </div>
        )}

        {open && (
          <div className="absolute end-0 top-full z-50 mt-2 w-80 rounded-xl border border-navy/10 bg-white shadow-xl">
            {status && (
              <div
                role="status"
                className={`border-b px-4 py-2.5 text-xs leading-relaxed ${statusClassName}`}
              >
                {status.text}
              </div>
            )}
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
              <p className="text-sm font-bold text-navy">طلبات جديدة</p>
              <button
                type="button"
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
