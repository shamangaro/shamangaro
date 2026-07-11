"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  addToBlacklist,
  deleteOrder,
  getOrderAdmin,
  normalizeOrderStatus,
  updateOrderNotes,
  updateOrderStatus,
  type OrderAdminDetail,
  type OrderStatus,
} from "@/lib/orders";
import { phoneToTelLink, phoneToWhatsAppLink } from "@/lib/phone";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RiskFlag, TrustBadge } from "@/components/admin/TrustBadge";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "NEW", label: "جديد" },
  { value: "CONTACTED", label: "تم الاتصال" },
  { value: "CONFIRMED", label: "مؤكد" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "DELIVERED", label: "تم التوصيل" },
  { value: "CANCELLED", label: "ملغى" },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderAdminDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [blacklisting, setBlacklisting] = useState(false);
  const [notes, setNotes] = useState("");
  const [blacklistReason, setBlacklistReason] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showBlacklist, setShowBlacklist] = useState(false);

  const loadOrder = useCallback(async () => {
    const data = await getOrderAdmin(orderId);
    setOrder(data);
    setNotes(data.internal_notes ?? "");
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
    try {
      await updateOrderStatus(order.id, status);
      await loadOrder();
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!order) return;
    setSavingNotes(true);
    try {
      await updateOrderNotes(order.id, notes.trim() ? notes.trim() : null);
      await loadOrder();
    } finally {
      setSavingNotes(false);
    }
  };

  const handleBlacklist = async () => {
    if (!order || !blacklistReason.trim()) return;
    setBlacklisting(true);
    try {
      await addToBlacklist({
        phone: order.phone,
        name: order.customer_name,
        address: order.address,
        reason: blacklistReason.trim(),
      });
      setShowBlacklist(false);
      setBlacklistReason("");
      await loadOrder();
    } finally {
      setBlacklisting(false);
    }
  };

  const handleDelete = async () => {
    if (!order) return;
    await deleteOrder(order.id);
    router.push("/admin/orders");
  };

  const copyPhone = () => {
    if (order) navigator.clipboard.writeText(order.phone);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  if (!order) return null;

  const risk = order.risk;
  const currentStatus = normalizeOrderStatus(order.status);
  const whatsappMessage = `سلام عليكم ${order.customer_name}، بخصوص طلبك ${order.order_number} من SHAMANGARO.`;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "full",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-4">
          <Link href="/admin/orders" className="rounded-lg p-2 hover:bg-navy/5">
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-extrabold text-navy" dir="ltr">
              {order.order_number}
            </h1>
            <p className="text-xs text-muted-foreground">
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className="mr-auto flex flex-wrap items-center gap-2">
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
      </header>

      <main className="mx-auto max-w-3xl space-y-4 p-4">
        {risk?.is_blacklisted && (
          <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <Ban className="mt-0.5 shrink-0 text-red-600" size={22} />
              <div>
                <p className="font-bold text-red-800">
                  ⚠️ THIS CUSTOMER IS BLACKLISTED
                </p>
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
              <ShieldAlert
                className="mt-0.5 shrink-0 text-amber-700"
                size={22}
              />
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

        {risk && (
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <History size={18} className="text-gold" />
              <h2 className="text-sm font-bold text-muted-foreground">
                سجل العميل
              </h2>
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
            {risk.history.last_order_date && (
              <p className="mt-4 text-sm text-muted-foreground">
                آخر طلب:{" "}
                {new Date(risk.history.last_order_date).toLocaleString("ar-MA")}
              </p>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-navy/10 bg-white p-6">
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
                className="rounded-lg border border-navy/15 p-2 hover:bg-navy/5"
                title="نسخ الهاتف"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={phoneToTelLink(order.phone)}
                className="flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-bold text-white transition-colors hover:bg-navy-light"
              >
                <PhoneCall size={18} />
                اتصال
              </a>
              <a
                href={phoneToWhatsAppLink(order.phone, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle size={18} />
                واتساب
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-gold" />
              <div>
                <p className="text-xs text-muted-foreground">العنوان</p>
                <p className="font-bold text-navy">{order.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="mb-4 text-sm font-bold text-muted-foreground">
            تفاصيل الطلب
          </h2>
          <div className="flex items-start gap-3">
            <Package size={18} className="mt-0.5 text-gold" />
            <div className="flex-1">
              <p className="font-bold text-navy">
                {order.offer_name} × {order.quantity}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {order.unit_price} د.م / وحدة
              </p>
              <p className="mt-3 text-2xl font-black text-navy">
                {order.total_price}{" "}
                <span className="text-sm font-bold">د.م</span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="mb-4 text-sm font-bold text-muted-foreground">
            تغيير الحالة
          </h2>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                disabled={saving || currentStatus === opt.value}
                onClick={() => handleStatusChange(opt.value)}
                className="rounded-full border border-navy/15 px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-40"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <StickyNote size={18} className="text-gold" />
            <h2 className="text-sm font-bold text-muted-foreground">
              ملاحظات داخلية
            </h2>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="ملاحظات للفريق الداخلي فقط..."
            className="w-full rounded-xl border-2 border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-all focus:border-navy"
          />
          <button
            onClick={handleSaveNotes}
            disabled={savingNotes}
            className="mt-3 w-full rounded-full bg-gold py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {savingNotes ? "جاري الحفظ..." : "حفظ الملاحظات"}
          </button>
        </div>

        {!risk?.is_blacklisted && (
          <button
            onClick={() => setShowBlacklist(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 py-3 text-sm font-bold text-red-700 hover:bg-red-100"
          >
            <Ban size={16} />
            🚫 Add to Blacklist
          </button>
        )}

        <button
          onClick={() => setShowDelete(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          أرشفة الطلب
        </button>
      </main>

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
              placeholder="سبب الإضافة للقائمة السوداء..."
              className="w-full rounded-xl border-2 border-navy/15 px-4 py-3 text-sm outline-none focus:border-navy"
            />
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowBlacklist(false)}
                className="flex-1 rounded-lg border border-navy/20 py-2.5 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={handleBlacklist}
                disabled={blacklisting || !blacklistReason.trim()}
                className="flex-1 rounded-lg bg-red-600 py-2.5 font-bold text-white disabled:opacity-60"
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
            <h3 className="text-lg font-bold text-navy">تأكيد الحذف</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              هل أنت متأكد من أرشفة الطلب {order.order_number}؟
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 rounded-lg border border-navy/20 py-2.5 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 py-2.5 font-bold text-white"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
