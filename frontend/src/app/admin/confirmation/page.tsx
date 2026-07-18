"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  PhoneCall,
  RefreshCw,
} from "lucide-react";
import {
  addOrderNote,
  getOrderAdmin,
  listOrders,
  logOrderCall,
  normalizeOrderStatus,
  updateOrderStatus,
  type CallOutcome,
  type OrderAdmin,
  type OrderAdminDetail,
  type OrderStatus,
} from "@/lib/orders";
import { phoneToTelLink, phoneToWhatsAppLink } from "@/lib/phone";
import {
  buildOrderConfirmedWhatsApp,
  buildOrderReceivedWhatsApp,
} from "@/lib/whatsapp";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrderTimeline } from "@/components/admin/OrderTimeline";
import { cn } from "@/lib/utils";

const STATUS_ACTIONS: { value: OrderStatus; label: string }[] = [
  { value: "WAITING_CONFIRMATION", label: "في انتظار التأكيد" },
  { value: "CONFIRMED", label: "مؤكد" },
  { value: "NO_ANSWER", label: "لا رد" },
  { value: "CALLBACK", label: "اتصل لاحقاً" },
  { value: "CANCELLED", label: "ملغى" },
];

const CALL_OUTCOMES: { value: CallOutcome; label: string }[] = [
  { value: "answered", label: "ردّ العميل" },
  { value: "no_answer", label: "لا رد" },
  { value: "callback", label: "اتصل لاحقاً" },
  { value: "confirmed", label: "تم التأكيد" },
];

export default function ConfirmationPage() {
  const [queue, setQueue] = useState<OrderAdmin[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<OrderAdminDetail | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noteDraft, setNoteDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const noteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedNoteRef = useRef("");

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listOrders({
        page,
        page_size: 15,
        confirmation_queue: true,
        sort_by: "created_at",
        sort_dir: "asc",
      });
      setQueue(data.items);
      setTotalPages(data.total_pages);
      if (data.items.length && !selectedId) {
        setSelectedId(data.items[0].id);
      }
    } finally {
      setLoading(false);
    }
  }, [page, selectedId]);

  const loadDetail = useCallback(async (id: number) => {
    const data = await getOrderAdmin(id);
    setDetail(data);
    setNoteDraft("");
    lastSavedNoteRef.current = "";
  }, []);

  useEffect(() => {
    loadQueue();
    const id = setInterval(loadQueue, 15000);
    return () => clearInterval(id);
  }, [loadQueue]);

  useEffect(() => {
    if (selectedId) loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  const handleStatusChange = async (status: OrderStatus) => {
    if (!detail) return;
    setSaving(true);
    setDetail({ ...detail, status });
    try {
      await updateOrderStatus(detail.id, status);
      await Promise.all([loadDetail(detail.id), loadQueue()]);
    } finally {
      setSaving(false);
    }
  };

  const handleCall = async (outcome: CallOutcome) => {
    if (!detail) return;
    setSaving(true);
    try {
      await logOrderCall(detail.id, outcome);
      await Promise.all([loadDetail(detail.id), loadQueue()]);
    } finally {
      setSaving(false);
    }
  };

  const saveNote = useCallback(
    async (body: string) => {
      if (!detail || !body.trim() || body.trim() === lastSavedNoteRef.current) {
        return;
      }
      await addOrderNote(detail.id, body.trim());
      lastSavedNoteRef.current = body.trim();
      await loadDetail(detail.id);
      setNoteDraft("");
    },
    [detail, loadDetail]
  );

  useEffect(() => {
    if (!noteDraft.trim()) return;
    if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
    noteTimerRef.current = setTimeout(() => {
      saveNote(noteDraft);
    }, 1500);
    return () => {
      if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
    };
  }, [noteDraft, saveNote]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "short",
      timeStyle: "short",
    });

  const current = detail;
  const receivedWa = current
    ? buildOrderReceivedWhatsApp(
        current.customer_name,
        current.quantity,
        current.total_price
      )
    : "";
  const confirmedWa = current
    ? buildOrderConfirmedWhatsApp(current.customer_name)
    : "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-navy">مركز التأكيد</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            اتصل بالعملاء وأكّد الطلبات
          </p>
        </div>
        <button
          onClick={loadQueue}
          className="flex min-h-11 items-center gap-2 rounded-lg border border-navy/15 px-4 text-sm font-bold text-navy hover:bg-navy/5"
        >
          <RefreshCw size={16} />
          تحديث
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-navy/10 bg-white lg:col-span-2">
          <div className="border-b border-navy/10 px-4 py-3">
            <p className="text-sm font-bold text-navy">
              قائمة الانتظار ({queue.length})
            </p>
          </div>
          {loading && queue.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              جاري التحميل...
            </p>
          ) : queue.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              لا توجد طلبات للتأكيد 🎉
            </p>
          ) : (
            <ul className="max-h-[70vh] divide-y divide-navy/5 overflow-y-auto">
              {queue.map((order) => (
                <li key={order.id}>
                  <button
                    onClick={() => setSelectedId(order.id)}
                    className={cn(
                      "w-full px-4 py-3 text-right transition-colors hover:bg-cream/50",
                      selectedId === order.id && "bg-navy/5"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className="font-mono text-xs font-bold text-navy"
                          dir="ltr"
                        >
                          {order.order_number}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-bold">
                          {order.customer_name}
                        </p>
                        <p className="text-xs text-muted-foreground" dir="ltr">
                          {order.phone}
                        </p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-navy/10 px-4 py-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded p-2 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
              <span className="text-xs text-muted-foreground">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded p-2 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 lg:col-span-3">
          {!current ? (
            <div className="rounded-2xl border border-navy/10 bg-white p-8 text-center text-muted-foreground">
              اختر طلباً من القائمة
            </div>
          ) : (
            <>
              <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p
                      className="font-mono text-lg font-black text-navy"
                      dir="ltr"
                    >
                      {current.order_number}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(current.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={current.status} />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">العميل</p>
                    <p className="font-bold text-navy">{current.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">الهاتف</p>
                    <p className="font-bold text-navy" dir="ltr">
                      {current.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">المدينة</p>
                    <p className="font-bold text-navy">
                      {current.city || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">المجموع</p>
                    <p className="font-bold text-navy">
                      {current.total_price} د.م
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm">
                  <span className="text-muted-foreground">العنوان: </span>
                  {current.address}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={phoneToTelLink(current.phone)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy text-sm font-bold text-white"
                  >
                    <PhoneCall size={16} />
                    اتصال
                  </a>
                  <a
                    href={phoneToWhatsAppLink(current.phone, receivedWa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white"
                  >
                    <MessageCircle size={16} />
                    واتساب استلام
                  </a>
                  <a
                    href={phoneToWhatsAppLink(current.phone, confirmedWa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-green-300 bg-green-50 text-sm font-bold text-green-800"
                  >
                    <MessageCircle size={16} />
                    واتساب تأكيد
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                <p className="mb-3 text-sm font-bold text-navy">نتيجة المكالمة</p>
                <div className="flex flex-wrap gap-2">
                  {CALL_OUTCOMES.map((opt) => (
                    <button
                      key={opt.value}
                      disabled={saving}
                      onClick={() => handleCall(opt.value)}
                      className="min-h-10 rounded-full border border-navy/15 px-4 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-50"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                <p className="mb-3 text-sm font-bold text-navy">تغيير الحالة</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_ACTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      disabled={
                        saving ||
                        normalizeOrderStatus(current.status) === opt.value
                      }
                      onClick={() => handleStatusChange(opt.value)}
                      className="min-h-10 rounded-full border border-navy/15 px-4 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-40"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                <p className="mb-2 text-sm font-bold text-navy">
                  ملاحظة (حفظ تلقائي)
                </p>
                <textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  rows={3}
                  placeholder="اكتب ملاحظة..."
                  className="w-full rounded-xl border border-navy/15 px-4 py-3 text-sm outline-none focus:border-navy"
                />
                {current.notes.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-navy/10 pt-4">
                    {current.notes.map((note) => (
                      <li
                        key={note.id}
                        className="rounded-lg bg-cream/50 px-3 py-2 text-sm"
                      >
                        <p>{note.body}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(note.created_at)}
                          {note.admin_username && ` — ${note.admin_username}`}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {current.calls.length > 0 && (
                <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                  <p className="mb-3 text-sm font-bold text-navy">
                    سجل المكالمات
                  </p>
                  <ul className="space-y-2">
                    {current.calls.map((call) => (
                      <li
                        key={call.id}
                        className="rounded-lg border border-navy/5 px-3 py-2 text-sm"
                      >
                        <span className="font-bold">{call.outcome}</span>
                        {call.notes && (
                          <span className="text-muted-foreground">
                            {" "}
                            — {call.notes}
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDate(call.created_at)}
                          {call.admin_username && ` — ${call.admin_username}`}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
                <p className="mb-3 text-sm font-bold text-navy">الجدول الزمني</p>
                <OrderTimeline events={current.timeline} />
              </div>

              <Link
                href={`/admin/orders/${current.id}`}
                className="block text-center text-sm font-bold text-navy underline"
              >
                عرض التفاصيل الكاملة
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
