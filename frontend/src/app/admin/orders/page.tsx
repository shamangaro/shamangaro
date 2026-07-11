"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Package,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Trash2,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  adminLogout,
  deleteOrder,
  exportOrdersUrl,
  getOrderStats,
  listOrders,
  type OrderAdmin,
  type OrderStats,
} from "@/lib/orders";
import { phoneToTelLink, phoneToWhatsAppLink } from "@/lib/phone";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";

const STATUSES = [
  { value: "", label: "الكل" },
  { value: "NEW", label: "جديد" },
  { value: "CONTACTED", label: "تم الاتصال" },
  { value: "CONFIRMED", label: "مؤكد" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "DELIVERED", label: "تم التوصيل" },
  { value: "CANCELLED", label: "ملغى" },
];

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight
          ? "border-gold/40 bg-gold/10"
          : "border-navy/10 bg-white"
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black text-navy">{value}</p>
    </div>
  );
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, listData] = await Promise.all([
        getOrderStats(),
        listOrders({
          page,
          page_size: 20,
          search: search || undefined,
          status: status || undefined,
          date_from: dateFrom || undefined,
          date_to: dateTo || undefined,
        }),
      ]);
      setStats(statsData);
      setOrders(listData.items);
      setTotal(listData.total);
      setTotalPages(listData.total_pages);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, dateFrom, dateTo]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteOrder(deleteId);
    setDeleteId(null);
    load();
  };

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Package className="text-gold" size={24} />
            <div>
              <h1 className="text-lg font-extrabold text-navy">SHAMANGARO</h1>
              <p className="text-xs text-muted-foreground">إدارة الطلبات</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5"
          >
            <LogOut size={16} />
            خروج
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        {stats && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            <StatCard label="طلبات اليوم" value={stats.today_orders} highlight />
            <StatCard label="جميع الطلبات" value={stats.all_orders} />
            <StatCard label="جديد" value={stats.new_orders} />
            <StatCard label="تم الاتصال" value={stats.contacted_orders} />
            <StatCard label="مؤكد" value={stats.confirmed_orders} />
            <StatCard label="تم الشحن" value={stats.shipped_orders} />
            <StatCard label="تم التوصيل" value={stats.delivered_orders} />
            <StatCard label="ملغاة" value={stats.cancelled_orders} />
            <StatCard
              label="مبيعات اليوم"
              value={`${stats.today_sales} د.م`}
              highlight
            />
            <StatCard
              label="إجمالي المبيعات"
              value={`${stats.total_sales} د.م`}
            />
          </div>
        )}

        <div className="rounded-2xl border border-navy/10 bg-white p-4 md:p-6">
          <form
            onSubmit={handleSearch}
            className="mb-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end"
          >
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-navy">
                بحث
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="اسم، هاتف، رقم الطلب..."
                  className="h-10 w-full rounded-lg border border-navy/15 pr-9 pl-3 text-sm outline-none focus:border-navy"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">
                الحالة
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">
                من
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-navy">
                إلى
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
              />
            </div>
            <button
              type="submit"
              className="h-10 rounded-lg bg-navy px-5 text-sm font-bold text-white hover:bg-navy-light"
            >
              بحث
            </button>
            <a
              href={exportOrdersUrl({
                search: search || undefined,
                status: status || undefined,
                date_from: dateFrom || undefined,
                date_to: dateTo || undefined,
              })}
              className="flex h-10 items-center gap-2 rounded-lg border border-navy/20 px-4 text-sm font-bold text-navy hover:bg-navy/5"
            >
              <Download size={16} />
              تصدير CSV
            </a>
          </form>

          {loading ? (
            <p className="py-12 text-center text-muted-foreground">
              جاري التحميل...
            </p>
          ) : orders.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              لا توجد طلبات
            </p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy/10 text-right">
                      <th className="px-3 py-3 font-bold text-navy">رقم الطلب</th>
                      <th className="px-3 py-3 font-bold text-navy">التاريخ</th>
                      <th className="px-3 py-3 font-bold text-navy">العميل</th>
                      <th className="px-3 py-3 font-bold text-navy">الهاتف</th>
                      <th className="px-3 py-3 font-bold text-navy">العرض</th>
                      <th className="px-3 py-3 font-bold text-navy">المجموع</th>
                      <th className="px-3 py-3 font-bold text-navy">الحالة</th>
                      <th className="px-3 py-3 font-bold text-navy">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-navy/5 hover:bg-cream/50"
                      >
                        <td className="px-3 py-3 font-mono font-bold" dir="ltr">
                          {order.order_number}
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-3 py-3">{order.customer_name}</td>
                        <td className="px-3 py-3" dir="ltr">
                          {order.phone}
                        </td>
                        <td className="px-3 py-3">
                          {order.offer_name} ×{order.quantity}
                        </td>
                        <td className="px-3 py-3 font-bold">
                          {order.total_price} د.م
                        </td>
                        <td className="px-3 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <a
                              href={phoneToTelLink(order.phone)}
                              className="rounded p-1.5 hover:bg-navy/10"
                              title="اتصال"
                            >
                              <PhoneCall size={16} />
                            </a>
                            <a
                              href={phoneToWhatsAppLink(
                                order.phone,
                                `سلام عليكم ${order.customer_name}، بخصوص طلبك ${order.order_number}`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded p-1.5 text-[#25D366] hover:bg-green-50"
                              title="واتساب"
                            >
                              <MessageCircle size={16} />
                            </a>
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="rounded p-1.5 hover:bg-navy/10"
                              title="عرض"
                            >
                              <Eye size={16} />
                            </Link>
                            <button
                              onClick={() => copyPhone(order.phone)}
                              className="rounded p-1.5 hover:bg-navy/10"
                              title="نسخ الهاتف"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteId(order.id)}
                              className="rounded p-1.5 text-red-600 hover:bg-red-50"
                              title="حذف"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-navy/10 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono font-bold text-navy" dir="ltr">
                          {order.order_number}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="mt-3 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">العميل: </span>
                        {order.customer_name}
                      </p>
                      <p dir="ltr">
                        <span className="text-muted-foreground" dir="rtl">
                          الهاتف:{" "}
                        </span>
                        {order.phone}
                      </p>
                      <p>
                        <span className="text-muted-foreground">العرض: </span>
                        {order.offer_name} — {order.total_price} د.م
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <a
                        href={phoneToTelLink(order.phone)}
                        className="rounded-lg border border-navy/20 px-3 py-2"
                        title="اتصال"
                      >
                        <PhoneCall size={16} />
                      </a>
                      <a
                        href={phoneToWhatsAppLink(
                          order.phone,
                          `سلام عليكم ${order.customer_name}، بخصوص طلبك ${order.order_number}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-green-200 px-3 py-2 text-[#25D366]"
                        title="واتساب"
                      >
                        <MessageCircle size={16} />
                      </a>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="flex-1 rounded-lg bg-navy py-2 text-center text-sm font-bold text-white"
                      >
                        عرض التفاصيل
                      </Link>
                      <button
                        onClick={() => copyPhone(order.phone)}
                        className="rounded-lg border border-navy/20 px-3 py-2"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {total} طلب — صفحة {page} من {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border border-navy/20 p-2 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-navy/20 p-2 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-navy">تأكيد الحذف</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              هل أنت متأكد من أرشفة هذا الطلب؟ لا يمكن التراجع.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-navy/20 py-2.5 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
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
