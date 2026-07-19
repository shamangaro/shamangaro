"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Copy,
  History,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  PhoneCall,
  ShieldAlert,
  StickyNote,
  Trash2,
  User,
} from "lucide-react";
import {
  addOrderNote,
  addToBlacklist,
  archiveOrder,
  getOrderAdmin,
  logOrderCall,
  normalizeOrderStatus,
  updateOrderStatus,
  type CallOutcome,
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
import { RiskFlag, TrustBadge } from "@/components/admin/TrustBadge";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "NEW", label: "جديد" },
  { value: "WAITING_CONFIRMATION", label: "في انتظار التأكيد" },
  { value: "CONFIRMED", label: "مؤكد" },
  { value: "PACKED", label: "تم التغليف" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "DELIVERED", label: "تم التوصيل" },
  { value: "CANCELLED", label: "ملغى" },
  { value: "NO_ANSWER", label: "لا رد" },
  { value: "CALLBACK", label: "اتصل لاحقاً" },
];

const CALL_OUTCOMES: { value: CallOutcome; label: string }[] = [
  { value: "answered", label: "ردّ العميل" },
  { value: "no_answer", label: "لا رد" },
  { value: "callback", label: "اتصل لاحقاً" },
  { value: "confirmed", label: "تم التأكيد" },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderAdminDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blacklisting, setBlacklisting] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");
  const [blacklistReason, setBlacklistReason] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showBlacklist, setShowBlacklist] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);
  const noteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedNoteRef = useRef("");

  const loadOrder = useCallback(async () => {
    const data = await getOrderAdmin(orderId);
    setOrder(data);
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    loadOrder()
      .catch(() => router.push("/admin/orders"))
      .finally(() => setLoading(false));
  }, [orderId, router, loadOrder]);

  const handleStatusChange = async (status: OrderStatus) => {
    if (!order) return;
    setSaving(true);
    setOrder({ ...order, status });
    try {
      await updateOrderStatus(order.id, status);
      await loadOrder();
    } finally {
      setSaving(false);
    }
  };

  const handleCall = async (outcome: CallOutcome) => {
    if (!order) return;
    setSaving(true);
    try {
      await logOrderCall(order.id, outcome);
      await loadOrder();
    } finally {
      setSaving(false);
    }
  };

  const saveNote = useCallback(
    async (body: string) => {
      if (!order || !body.trim() || body.trim() === lastSavedNoteRef.current) {
        return;
      }
      await addOrderNote(order.id, body.trim());
      lastSavedNoteRef.current = body.trim();
      await loadOrder();
      setNoteDraft("");
    },
    [order, loadOrder]
  );

  useEffect(() => {
    if (!noteDraft.trim()) return;
    if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
    noteTimerRef.current = setTimeout(() => saveNote(noteDraft), 1500);
    return () => {
      if (noteTimerRef.current) clearTimeout(noteTimerRef.current);
    };
  }, [noteDraft, saveNote]);

  const handleBlacklist = async () => {
    if (!order || !blacklistReason.trim()) return;
    setBlacklisting(true);
    try {
      await addToBlacklist({
        phone: order.phone,
        name: order.customer_name,
        address: order.address,
        city: order.city ?? undefined,
        reason: blacklistReason.trim(),
      });
      setShowBlacklist(false);
      setBlacklistReason("");
      await loadOrder();
    } finally {
      setBlacklisting(false);
    }
  };

  const handleArchive = async () => {
    if (!order) return;
    setArchiving(true);
    setActionMessage(null);
    try {
      await archiveOrder(order.id);
      setShowDelete(false);
      router.push("/admin/orders?archived=1");
    } catch {
      setActionMessage({
        kind: "error",
        text: "تعذر أرشفة الطلب. حاول مرة أخرى.",
      });
    } finally {
      setArchiving(false);
    }
  };

  const copyPhone = () => {
    if (order) navigator.clipboard.writeText(order.phone);
  };

  if (loading) {
    return (
      <p className="py-20 text-center text-muted-foreground">جاري التحميل...</p>
    );
  }

  if (!order) return null;

  const risk = order.risk;
  const currentStatus = normalizeOrderStatus(order.status);
  const receivedWa = buildOrderReceivedWhatsApp(
    order.customer_name,
    order.quantity,
    order.total_price
  );
  const confirmedWa = buildOrderConfirmedWhatsApp(order.customer_name);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "full",
      timeStyle: "short",
    });

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/admin/orders"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-navy/5"
        >
          <ArrowRight size={20} />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="break-all text-lg font-extrabold text-navy" dir="ltr">
            {order.order_number}
          </h1>
          <p className="text-xs text-muted-foreground">
            {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RiskFlag isRisk={order.is_risk} />
          <StatusBadge status={order.status} />
          {risk && (
            <TrustBadge
              label={risk.trust_label}
              display={risk.trust_display}
              score={risk.trust_score}
            />
          )}
        </div>
      </div>

      {risk?.is_blacklisted && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <Ban className="mt-0.5 shrink-0 text-red-600" size={22} />
            <div>
              <p className="font-bold text-red-800">عميل في القائمة السوداء</p>
              <p className="mt-1 text-sm text-red-700">
                السبب: {risk.blacklist_reason}
              </p>
            </div>
          </div>
        </div>
      )}

      {risk && risk.warnings.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 shrink-0 text-amber-700" size={22} />
            <div>
              <p className="font-bold text-amber-900">تحذير — طلب مشبوه</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-800">
                {risk.warnings.map((w) => (
                  <li key={w}>• {w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={phoneToTelLink(order.phone)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy text-sm font-bold text-white"
          >
            <PhoneCall size={18} />
            اتصال
          </a>
          <a
            href={phoneToWhatsAppLink(order.phone, receivedWa)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-bold text-white"
          >
            <MessageCircle size={18} />
            واتساب استلام
          </a>
          <a
            href={phoneToWhatsAppLink(order.phone, confirmedWa)}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-green-300 bg-green-50 text-sm font-bold text-green-800"
          >
            <MessageCircle size={18} />
            واتساب تأكيد
          </a>
        </div>
      </div>

      {risk && (
        <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <History size={18} className="text-gold" />
            <h2 className="text-sm font-bold text-muted-foreground">سجل العميل</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-cream p-3 text-center">
              <p className="text-xs text-muted-foreground">إجمالي الطلبات</p>
              <p className="mt-1 text-xl font-black text-navy">
                {risk.history.total_orders}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-center">
              <p className="text-xs text-muted-foreground">تم التوصيل</p>
              <p className="mt-1 text-xl font-black text-green-800">
                {risk.history.delivered_count}
              </p>
            </div>
            <div className="rounded-xl bg-indigo-50 p-3 text-center">
              <p className="text-xs text-muted-foreground">مؤكد</p>
              <p className="mt-1 text-xl font-black text-indigo-800">
                {risk.history.confirmed_count}
              </p>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-center">
              <p className="text-xs text-muted-foreground">ملغى</p>
              <p className="mt-1 text-xl font-black text-red-800">
                {risk.history.cancelled_count}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground">
          معلومات العميل
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User size={18} className="mt-0.5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">الاسم</p>
              <p className="font-bold text-navy">{order.customer_name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-gold" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">الهاتف</p>
              <p className="font-bold text-navy" dir="ltr">
                {order.phone}
              </p>
            </div>
            <button
              onClick={copyPhone}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-navy/15 hover:bg-navy/5"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">العنوان / المدينة</p>
              <p className="font-bold text-navy">{order.address}</p>
              {order.city && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.city}
                </p>
              )}
            </div>
          </div>
          {order.confirmation_agent && (
            <p className="text-sm">
              <span className="text-muted-foreground">وكيل التأكيد: </span>
              {order.confirmation_agent}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <Package size={18} className="mt-0.5 text-gold" />
          <div>
            <p className="font-bold text-navy">
              {order.offer_name} × {order.quantity}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.unit_price} د.م / وحدة
            </p>
            <p className="mt-3 text-2xl font-black text-navy">
              {order.total_price} <span className="text-sm font-bold">د.م</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <p className="mb-3 text-sm font-bold text-muted-foreground">نتيجة المكالمة</p>
        <div className="flex flex-wrap gap-2">
          {CALL_OUTCOMES.map((opt) => (
            <button
              key={opt.value}
              disabled={saving}
              onClick={() => handleCall(opt.value)}
              className="min-h-11 rounded-full border border-navy/15 px-4 py-2.5 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-40"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground">تغيير الحالة</h2>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              disabled={saving || currentStatus === opt.value}
              onClick={() => handleStatusChange(opt.value)}
              className="min-h-11 rounded-full border border-navy/15 px-4 py-2.5 text-sm font-bold text-navy hover:bg-navy hover:text-white disabled:opacity-40"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <StickyNote size={18} className="text-gold" />
          <h2 className="text-sm font-bold text-muted-foreground">
            ملاحظات داخلية (حفظ تلقائي)
          </h2>
        </div>
        <textarea
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          rows={3}
          placeholder="اكتب ملاحظة..."
          className="w-full rounded-xl border-2 border-navy/15 px-4 py-3 text-sm outline-none focus:border-navy"
        />
        {order.notes.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-navy/10 pt-4">
            {order.notes.map((note) => (
              <li key={note.id} className="rounded-lg bg-cream/50 px-3 py-2 text-sm">
                <p>{note.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(note.created_at).toLocaleString("ar-MA")}
                  {note.admin_username && ` — ${note.admin_username}`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-sm font-bold text-muted-foreground">
          الجدول الزمني
        </h2>
        <OrderTimeline events={order.timeline} />
      </div>

      {!risk?.is_blacklisted && (
        <button
          onClick={() => setShowBlacklist(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 py-3 text-sm font-bold text-red-700"
        >
          <Ban size={16} />
          إضافة للقائمة السوداء
        </button>
      )}

      <button
        onClick={() => setShowDelete(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700"
      >
        <Trash2 size={16} />
        أرشفة الطلب
      </button>

      {actionMessage && (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-bold ${
            actionMessage.kind === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {actionMessage.text}
        </p>
      )}

      {showBlacklist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} />
              <h3 className="text-lg font-bold text-navy">إضافة للقائمة السوداء</h3>
            </div>
            <textarea
              value={blacklistReason}
              onChange={(e) => setBlacklistReason(e.target.value)}
              rows={3}
              placeholder="سبب الإضافة..."
              className="w-full rounded-xl border-2 border-navy/15 px-4 py-3 text-sm outline-none focus:border-navy"
            />
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowBlacklist(false)}
                className="min-h-11 flex-1 rounded-lg border border-navy/20 py-3 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={handleBlacklist}
                disabled={blacklisting || !blacklistReason.trim()}
                className="min-h-11 flex-1 rounded-lg bg-red-600 py-3 font-bold text-white disabled:opacity-60"
              >
                {blacklisting ? "جاري..." : "تأكيد"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-navy">تأكيد الأرشفة</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              هل تريد أرشفة الطلب {order.order_number}؟
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.customer_name}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              سيختفي من قائمة الطلبات النشطة ويمكن استعادته من الأرشيف.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                disabled={archiving}
                className="min-h-11 flex-1 rounded-lg border border-navy/20 py-3 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={handleArchive}
                disabled={archiving}
                className="min-h-11 flex-1 rounded-lg bg-red-600 py-3 font-bold text-white disabled:opacity-60"
              >
                {archiving ? "جاري الأرشفة..." : "أرشفة الطلب"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
