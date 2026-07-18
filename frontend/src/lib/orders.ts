import { apiFetch } from "./api";

export interface OrderCreatePayload {
  customer_name: string;
  phone: string;
  address: string;
  offer_id: "solo" | "duo" | "family";
}

export interface OrderCreateResponse {
  order_number: string;
  total_price: number;
}

export interface OrderPublic {
  order_number: string;
  customer_name: string;
  phone: string;
  offer_name: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

export interface OrderAdmin {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string | null;
  offer_id: string;
  offer_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  internal_notes: string | null;
  is_risk: boolean;
  confirmation_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerHistory {
  total_orders: number;
  delivered_count: number;
  cancelled_count: number;
  confirmed_count: number;
  last_order_date: string | null;
}

export interface OrderRisk {
  trust_score: number;
  trust_label: "trusted" | "warning" | "high_risk";
  trust_display: string;
  warnings: string[];
  is_blacklisted: boolean;
  blacklist_reason: string | null;
  history: CustomerHistory;
}

export interface OrderTimelineEvent {
  id: number;
  event_type: string;
  status: string | null;
  note: string | null;
  admin_username: string | null;
  created_at: string;
}

export interface OrderNote {
  id: number;
  body: string;
  admin_username: string | null;
  created_at: string;
}

export interface OrderCall {
  id: number;
  outcome: string;
  notes: string | null;
  admin_username: string | null;
  created_at: string;
}

export interface OrderAdminDetail extends OrderAdmin {
  risk: OrderRisk | null;
  timeline: OrderTimelineEvent[];
  notes: OrderNote[];
  calls: OrderCall[];
}

export interface BlacklistEntry {
  id: number;
  phone: string;
  name: string | null;
  address: string | null;
  city: string | null;
  reason: string;
  created_at: string;
}

export interface OrderListResponse {
  items: OrderAdmin[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface OrderStats {
  today_orders: number;
  all_orders: number;
  new_orders: number;
  waiting_confirmation_orders: number;
  contacted_orders: number;
  confirmed_orders: number;
  packed_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  no_answer_orders: number;
  callback_orders: number;
  today_sales: number;
  week_sales: number;
  month_sales: number;
  total_sales: number;
  trusted_customers: number;
  warning_customers: number;
  high_risk_customers: number;
  blacklisted_customers: number;
}

export interface AnalyticsData {
  today_revenue: number;
  week_revenue: number;
  month_revenue: number;
  orders_by_city: { city: string; count: number }[];
  revenue_by_day: { date: string; revenue: number; orders: number }[];
  revenue_by_month: { month: string; revenue: number; orders: number }[];
  conversion_rate: number;
  delivered_rate: number;
  cancelled_rate: number;
  average_basket: number;
}

export interface NotificationItem {
  order_id: number;
  order_number: string;
  customer_name: string;
  total_price: number;
  created_at: string;
}

export interface NotificationSummary {
  pending_count: number;
  latest_order_number: string | null;
  items: NotificationItem[];
}

export type OrderStatus =
  | "NEW"
  | "WAITING_CONFIRMATION"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "NO_ANSWER"
  | "CALLBACK";

export type CallOutcome = "answered" | "no_answer" | "callback" | "confirmed";

export const STATUS_LABELS: Record<string, string> = {
  NEW: "جديد",
  WAITING_CONFIRMATION: "في انتظار التأكيد",
  CONTACTED: "في انتظار التأكيد",
  PREPARING: "في انتظار التأكيد",
  CONFIRMED: "مؤكد",
  PACKED: "تم التغليف",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغى",
  NO_ANSWER: "لا رد",
  CALLBACK: "اتصل لاحقاً",
};

export const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  WAITING_CONFIRMATION: "bg-cyan-100 text-cyan-800",
  CONTACTED: "bg-cyan-100 text-cyan-800",
  PREPARING: "bg-cyan-100 text-cyan-800",
  CONFIRMED: "bg-indigo-100 text-indigo-800",
  PACKED: "bg-violet-100 text-violet-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  NO_ANSWER: "bg-orange-100 text-orange-800",
  CALLBACK: "bg-amber-100 text-amber-800",
};

const LEGACY_STATUS_MAP: Record<string, OrderStatus> = {
  CONTACTED: "WAITING_CONFIRMATION",
  PREPARING: "WAITING_CONFIRMATION",
};

export function normalizeOrderStatus(status: string): OrderStatus {
  return LEGACY_STATUS_MAP[status] ?? (status as OrderStatus);
}

export const ALL_STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "", label: "الكل" },
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

export async function createOrder(
  payload: OrderCreatePayload
): Promise<OrderCreateResponse> {
  return apiFetch<OrderCreateResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "omit",
  });
}

export async function getOrderPublic(
  orderNumber: string
): Promise<OrderPublic | null> {
  try {
    return await apiFetch<OrderPublic>(`/orders/${orderNumber}`, {
      credentials: "omit",
    });
  } catch {
    return null;
  }
}

export async function adminLogin(username: string, password: string) {
  return apiFetch<{ id: number; username: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function adminLogout() {
  return apiFetch<void>("/admin/logout", { method: "POST" });
}

export async function adminMe() {
  return apiFetch<{ id: number; username: string }>("/admin/me");
}

export async function getOrderStats(): Promise<OrderStats> {
  return apiFetch<OrderStats>("/admin/orders/stats");
}

export async function getAnalytics(): Promise<AnalyticsData> {
  return apiFetch<AnalyticsData>("/admin/orders/analytics");
}

export async function listOrders(params: {
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  confirmation_queue?: boolean;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}): Promise<OrderListResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.page_size) qs.set("page_size", String(params.page_size));
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  if (params.confirmation_queue) qs.set("confirmation_queue", "true");
  if (params.sort_by) qs.set("sort_by", params.sort_by);
  if (params.sort_dir) qs.set("sort_dir", params.sort_dir);
  return apiFetch<OrderListResponse>(`/admin/orders?${qs.toString()}`);
}

export async function getOrderAdmin(id: number): Promise<OrderAdminDetail> {
  return apiFetch<OrderAdminDetail>(`/admin/orders/${id}`);
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  return apiFetch<OrderAdmin>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function addOrderNote(id: number, body: string) {
  return apiFetch<OrderNote>(`/admin/orders/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

export async function logOrderCall(
  id: number,
  outcome: CallOutcome,
  notes?: string
) {
  return apiFetch<OrderCall>(`/admin/orders/${id}/calls`, {
    method: "POST",
    body: JSON.stringify({ outcome, notes: notes || null }),
  });
}

export async function deleteOrder(id: number) {
  return apiFetch<void>(`/admin/orders/${id}`, { method: "DELETE" });
}

export function exportOrdersUrl(params: {
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  format?: "csv" | "xlsx" | "pdf";
}): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  qs.set("format", params.format ?? "csv");
  return `${base}/admin/orders/export?${qs.toString()}`;
}

export async function downloadOrdersExport(params: {
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  format: "csv" | "xlsx" | "pdf";
}) {
  const url = exportOrdersUrl(params);
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("فشل التصدير");
  const blob = await res.blob();
  const ext = params.format;
  const filename = `orders-${new Date().toISOString().slice(0, 10)}.${ext}`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function getNotificationSummary(
  since?: string
): Promise<NotificationSummary> {
  const qs = since ? `?since=${encodeURIComponent(since)}` : "";
  return apiFetch<NotificationSummary>(`/admin/notifications/summary${qs}`);
}

export async function markNotificationsSeen() {
  return apiFetch<{ ok: boolean }>("/admin/notifications/seen", {
    method: "POST",
  });
}

export async function addToBlacklist(payload: {
  phone: string;
  name?: string;
  address?: string;
  city?: string;
  reason: string;
}) {
  return apiFetch<BlacklistEntry>("/admin/blacklist", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listBlacklist() {
  return apiFetch<BlacklistEntry[]>("/admin/blacklist");
}

export async function removeFromBlacklist(id: number) {
  return apiFetch<void>(`/admin/blacklist/${id}`, { method: "DELETE" });
}
