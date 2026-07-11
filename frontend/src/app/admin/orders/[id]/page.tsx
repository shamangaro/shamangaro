"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Copy,
  MapPin,
  Package,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import {
  deleteOrder,
  getOrderAdmin,
  updateOrderStatus,
  type OrderAdmin,
  type OrderStatus,
} from "@/lib/orders";
import { StatusBadge } from "@/components/admin/StatusBadge";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "NEW", label: "جديد" },
  { value: "CONFIRMED", label: "مؤكد" },
  { value: "PREPARING", label: "قيد التحضير" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "DELIVERED", label: "تم التوصيل" },
  { value: "CANCELLED", label: "ملغى" },
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<OrderAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    getOrderAdmin(orderId)
      .then(setOrder)
      .catch(() => router.push("/admin/orders"))
      .finally(() => setLoading(false));
  }, [orderId, router]);

  const handleStatusChange = async (status: OrderStatus) => {
    if (!order) return;
    setSaving(true);
    try {
      const updated = await updateOrderStatus(order.id, status);
      setOrder(updated);
    } finally {
      setSaving(false);
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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "full",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4">
          <Link
            href="/admin/orders"
            className="rounded-lg p-2 hover:bg-navy/5"
          >
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
          <div className="mr-auto">
            <StatusBadge status={order.status} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 p-4">
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
              >
                <Copy size={16} />
              </button>
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
              <p className="mt-2 text-sm text-muted-foreground">
                الدفع عند الاستلام
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
                disabled={saving || order.status === opt.value}
                onClick={() => handleStatusChange(opt.value)}
                className="rounded-full border border-navy/15 px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-40"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowDelete(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          أرشفة الطلب
        </button>
      </main>

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
