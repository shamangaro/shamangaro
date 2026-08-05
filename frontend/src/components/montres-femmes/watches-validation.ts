import {
  isValidMoroccanPhone,
  normalizeMoroccanPhone,
} from "@/lib/phone";
import type { WatchVariantId } from "./config";

export const WATCHES_VALIDATION = {
  model: "اختاري موديل الساعة",
  quantity: "اختاري العدد",
  name: "دخلي الاسم الكامل",
  phone: "دخلي رقم هاتف مغربي صحيح كيبدأ بـ 06 أو 07",
  city: "اختاري المدينة",
  address: "دخلي العنوان بالتفصيل",
} as const;

export interface WatchesFormValues {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface WatchesFormErrors {
  model?: string;
  quantity?: string;
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export function validateWatchesCheckout(
  variantId: WatchVariantId | null,
  quantity: number | null,
  form: WatchesFormValues
): WatchesFormErrors {
  const errors: WatchesFormErrors = {};

  if (!variantId) errors.model = WATCHES_VALIDATION.model;
  if (!quantity || ![1, 2, 3].includes(quantity)) {
    errors.quantity = WATCHES_VALIDATION.quantity;
  }
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = WATCHES_VALIDATION.name;
  }
  if (!isValidMoroccanPhone(form.phone)) {
    errors.phone = WATCHES_VALIDATION.phone;
  }
  if (!form.city.trim()) errors.city = WATCHES_VALIDATION.city;
  if (!form.address.trim() || form.address.trim().length < 5) {
    errors.address = WATCHES_VALIDATION.address;
  }

  return errors;
}

export function buildWatchesAddress(city: string, address: string): string {
  return `${city.trim()}، ${address.trim()}`;
}

export function normalizeWatchesPhone(phone: string): string {
  return normalizeMoroccanPhone(phone);
}
