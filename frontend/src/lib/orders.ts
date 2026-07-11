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
  offer_id: string;
  offer_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
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
  confirmed_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  today_sales: number;
  total_sales: number;
}

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  NEW: "جديد",
  CONFIRMED: "مؤكد",
  PREPARING: "قيد التحضير",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغى",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-indigo-100 text-indigo-800",
  PREPARING: "bg-amber-100 text-amber-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

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

export async function listOrders(params: {
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
}): Promise<OrderListResponse> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.page_size) qs.set("page_size", String(params.page_size));
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  return apiFetch<OrderListResponse>(`/admin/orders?${qs.toString()}`);
}

export async function getOrderAdmin(id: number): Promise<OrderAdmin> {
  return apiFetch<OrderAdmin>(`/admin/orders/${id}`);
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  return apiFetch<OrderAdmin>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
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
}): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  return `${base}/admin/orders/export?${qs.toString()}`;
}
