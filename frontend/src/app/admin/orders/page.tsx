"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  MessageCircle,
  PhoneCall,
  Search,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  ALL_STATUS_FILTERS,
  archiveOrder,
  downloadOrdersExport,
  listOrders,
  permanentlyDeleteOrder,
  restoreOrder,
  type OrderAdmin,
} from "@/lib/orders";
import { phoneToTelLink, phoneToWhatsAppLink } from "@/lib/phone";
import { buildOrderReceivedWhatsApp } from "@/lib/whatsapp";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RiskFlag } from "@/components/admin/TrustBadge";
import { cn } from "@/lib/utils";

const SORT_COLUMNS = [
  { key: "created_at", label: "التاريخ" },
  { key: "customer_name", label: "العميل" },
  { key: "city", label: "المدينة" },
  { key: "total_price", label: "المجموع" },
  { key: "status", label: "الحالة" },
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"active" | "archived">("active");
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [restoreId, setRestoreId] = useState<number | null>(null);
  const [permanentDeleteOrder, setPermanentDeleteOrder] = useState<OrderAdmin | null>(
    null
  );
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("archived") === "1") {
      setViewMode("archived");
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const listData = await listOrders({
        page,
        page_size: 20,
        search: search || undefined,
        status: status || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        archived: viewMode === "archived",
        sort_by: sortBy,
        sort_dir: sortDir,
      });
      setOrders(listData.items);
      setTotal(listData.total);
      setTotalPages(listData.total_pages);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, dateFrom, dateTo, sortBy, sortDir, viewMode]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const toggleSort = (key: string) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
    setPage(1);
  };

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
  };

  const confirmArchive = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    setActionMessage(null);
    try {
      await archiveOrder(deleteId);
      setDeleteId(null);
      setActionMessage({ kind: "success", text: "تمت أرشفة الطلب بنجاح." });
      await load();
    } catch {
      setActionMessage({
        kind: "error",
        text: "تعذر أرشفة الطلب. حاول مرة أخرى.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const confirmRestore = async () => {
    if (!restoreId) return;
    setActionLoading(true);
    setActionMessage(null);
    try {
      await restoreOrder(restoreId);
      setRestoreId(null);
      setActionMessage({ kind: "success", text: "تمت استعادة الطلب بنجاح." });
      await load();
    } catch {
      setActionMessage({
        kind: "error",
        text: "تعذر استعادة الطلب. حاول مرة أخرى.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const confirmPermanentDelete = async () => {
    if (!permanentDeleteOrder) return;
    setActionLoading(true);
    setActionMessage(null);
    try {
      await permanentlyDeleteOrder(permanentDeleteOrder.id);
      setPermanentDeleteOrder(null);
      setActionMessage({ kind: "success", text: "تم حذف الطلب نهائياً." });
      await load();
    } catch {
      setActionMessage({
        kind: "error",
        text: "تعذر الحذف النهائي. حاول مرة أخرى.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const archiveTarget = deleteId
    ? orders.find((order) => order.id === deleteId)
    : null;

  const handleExport = async (format: "csv" | "xlsx" | "pdf") => {
    setExporting(format);
    try {
      await downloadOrdersExport({
        search: search || undefined,
        status: status || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        format,
      });
    } finally {
      setExporting(null);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ar-MA", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-navy">الطلبات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {viewMode === "archived"
            ? "الطلبات المؤرشفة — استعادة أو حذف نهائي"
            : "إدارة وتتبع جميع الطلبات النشطة"}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setViewMode("active");
              setPage(1);
              setActionMessage(null);
            }}
            className={cn(
              "min-h-11 rounded-lg px-4 py-2 text-sm font-bold",
              viewMode === "active"
                ? "bg-navy text-white"
                : "border border-navy/15 text-navy hover:bg-navy/5"
            )}
          >
            الطلبات النشطة
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("archived");
              setPage(1);
              setActionMessage(null);
            }}
            className={cn(
              "min-h-11 rounded-lg px-4 py-2 text-sm font-bold",
              viewMode === "archived"
                ? "bg-navy text-white"
                : "border border-navy/15 text-navy hover:bg-navy/5"
            )}
          >
            الأرشيف
          </button>
        </div>
      </div>

      {actionMessage && (
        <p
          className={cn(
            "rounded-xl px-4 py-3 text-sm font-bold",
            actionMessage.kind === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          )}
        >
          {actionMessage.text}
        </p>
      )}

      <div className="rounded-2xl border border-navy/10 bg-white p-4 md:p-6">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end"
        >
          <div className="flex-1">
            <label className="mb-1 block text-xs font-bold text-navy">بحث</label>
            <div className="relative">
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="اسم، هاتف، رقم الطلب، مدينة..."
                className="h-11 w-full rounded-lg border border-navy/15 pr-9 pl-3 text-sm outline-none focus:border-navy"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-navy">الحالة</label>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
            >
              {ALL_STATUS_FILTERS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-navy">من</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-navy">إلى</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-lg border border-navy/15 px-3 text-sm outline-none focus:border-navy"
            />
          </div>
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-navy px-5 text-sm font-bold text-white hover:bg-navy-light sm:w-auto"
          >
            بحث
          </button>
          <div className="flex flex-wrap gap-2">
            {viewMode === "active" &&
              (["csv", "xlsx", "pdf"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  disabled={exporting !== null}
                  onClick={() => handleExport(fmt)}
                  className="flex h-11 items-center gap-2 rounded-lg border border-navy/20 px-3 text-sm font-bold text-navy hover:bg-navy/5 disabled:opacity-50"
                >
                  <Download size={16} />
                  {exporting === fmt ? "..." : fmt.toUpperCase()}
                </button>
              ))}
          </div>
        </form>

        {loading ? (
          <p className="py-12 text-center text-muted-foreground">جاري التحميل...</p>
        ) : orders.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            {viewMode === "archived" ? "لا توجد طلبات مؤرشفة" : "لا توجد طلبات"}
          </p>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1100px] text-sm">
                <thead>
                  <tr className="border-b border-navy/10 text-right">
                    <th className="px-2 py-3 font-bold text-navy">رقم الطلب</th>
                    {SORT_COLUMNS.map((col) => (
                      <th key={col.key} className="px-2 py-3 font-bold text-navy">
                        <button
                          type="button"
                          onClick={() => toggleSort(col.key)}
                          className="inline-flex items-center gap-1 hover:text-gold"
                        >
                          {col.label}
                          {sortBy === col.key && (
                            <ChevronDown
                              size={14}
                              className={cn(
                                sortDir === "asc" && "rotate-180"
                              )}
                            />
                          )}
                        </button>
                      </th>
                    ))}
                    <th className="px-2 py-3 font-bold text-navy">الهاتف</th>
                    <th className="px-2 py-3 font-bold text-navy">العنوان</th>
                    <th className="px-2 py-3 font-bold text-navy">الكمية</th>
                    <th className="px-2 py-3 font-bold text-navy">سعر الوحدة</th>
                    <th className="px-2 py-3 font-bold text-navy">الوكيل</th>
                    <th className="px-2 py-3 font-bold text-navy">ملاحظات</th>
                    <th className="px-2 py-3 font-bold text-navy">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const waMsg = buildOrderReceivedWhatsApp(
                      order.customer_name,
                      order.quantity,
                      order.total_price
                    );
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-navy/5 hover:bg-cream/50"
                      >
                        <td className="px-2 py-3 font-mono font-bold" dir="ltr">
                          {order.order_number}
                        </td>
                        <td className="px-2 py-3 text-muted-foreground">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-2 py-3">{order.customer_name}</td>
                        <td className="px-2 py-3">{order.city || "—"}</td>
                        <td className="px-2 py-3 font-bold">
                          {order.total_price} د.م
                        </td>
                        <td className="px-2 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-2 py-3" dir="ltr">
                          {order.phone}
                        </td>
                        <td className="max-w-[140px] truncate px-2 py-3">
                          {order.address}
                        </td>
                        <td className="px-2 py-3">{order.quantity}</td>
                        <td className="px-2 py-3">{order.unit_price} د.م</td>
                        <td className="px-2 py-3 text-xs">
                          {order.confirmation_agent || "—"}
                        </td>
                        <td className="max-w-[120px] truncate px-2 py-3 text-xs text-muted-foreground">
                          {order.internal_notes || "—"}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-1">
                            {viewMode === "active" ? (
                              <>
                                <a
                                  href={phoneToTelLink(order.phone)}
                                  className="rounded p-1.5 hover:bg-navy/10"
                                  title="اتصال"
                                >
                                  <PhoneCall size={16} />
                                </a>
                                <a
                                  href={phoneToWhatsAppLink(order.phone, waMsg)}
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
                                  title="نسخ"
                                >
                                  <Copy size={16} />
                                </button>
                                <button
                                  onClick={() => setDeleteId(order.id)}
                                  className="rounded p-1.5 text-red-600 hover:bg-red-50"
                                  title="أرشفة"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setRestoreId(order.id)}
                                  className="rounded p-1.5 text-green-700 hover:bg-green-50"
                                  title="استعادة"
                                >
                                  <RotateCcw size={16} />
                                </button>
                                <button
                                  onClick={() => setPermanentDeleteOrder(order)}
                                  className="rounded p-1.5 text-red-600 hover:bg-red-50"
                                  title="حذف نهائي"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 lg:hidden">
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
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={order.status} />
                      <RiskFlag isRisk={order.is_risk} />
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>{order.customer_name}</p>
                    <p dir="ltr">{order.phone}</p>
                    <p>{order.city || "—"} — {order.total_price} د.م</p>
                  </div>
                  {viewMode === "active" ? (
                    <Link
                      href={`/admin/orders/${order.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        router.push(`/admin/orders/${order.id}`);
                      }}
                      className="relative z-10 mt-3 flex min-h-11 w-full items-center justify-center rounded-lg bg-navy text-sm font-bold text-white"
                    >
                      عرض التفاصيل
                    </Link>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRestoreId(order.id)}
                        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 text-sm font-bold text-green-800"
                      >
                        <RotateCcw size={16} />
                        استعادة
                      </button>
                      <button
                        type="button"
                        onClick={() => setPermanentDeleteOrder(order)}
                        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 text-sm font-bold text-white"
                      >
                        <Trash2 size={16} />
                        حذف نهائي
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {total} طلب — صفحة {page} من {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-navy/20 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-navy/20 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-navy">تأكيد الأرشفة</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              هل تريد أرشفة الطلب{" "}
              {archiveTarget?.order_number ?? `#${deleteId}`}؟
            </p>
            {archiveTarget && (
              <p className="mt-1 text-sm text-muted-foreground">
                {archiveTarget.customer_name}
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg border border-navy/20 py-3 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={confirmArchive}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg bg-red-600 py-3 font-bold text-white disabled:opacity-60"
              >
                {actionLoading ? "جاري..." : "أرشفة الطلب"}
              </button>
            </div>
          </div>
        </div>
      )}

      {restoreId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-navy">استعادة الطلب</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              هل تريد إعادة هذا الطلب إلى قائمة الطلبات النشطة؟
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setRestoreId(null)}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg border border-navy/20 py-3 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={confirmRestore}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg bg-green-600 py-3 font-bold text-white disabled:opacity-60"
              >
                {actionLoading ? "جاري..." : "استعادة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {permanentDeleteOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6">
            <h3 className="text-lg font-bold text-red-700">حذف نهائي</h3>
            <p className="mt-2 text-sm font-bold text-navy" dir="ltr">
              {permanentDeleteOrder.order_number}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {permanentDeleteOrder.customer_name}
            </p>
            <p className="mt-3 text-sm font-bold text-red-700">
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الطلب نهائياً من النظام.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setPermanentDeleteOrder(null)}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg border border-navy/20 py-3 font-bold text-navy"
              >
                إلغاء
              </button>
              <button
                onClick={confirmPermanentDelete}
                disabled={actionLoading}
                className="min-h-11 flex-1 rounded-lg bg-red-600 py-3 font-bold text-white disabled:opacity-60"
              >
                {actionLoading ? "جاري..." : "حذف نهائي"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
