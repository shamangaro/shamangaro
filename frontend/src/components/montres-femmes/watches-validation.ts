import {
  isValidMoroccanPhone,
  normalizeMoroccanPhone,
} from "@/lib/phone";
import type { SelectedWatchLine } from "./watch-selection-utils";
import { countSelectedWatches } from "./watch-selection-utils";

export const WATCHES_VALIDATION = {
  selection: "اختاري ساعة على الأقل قبل ما تكملي الطلب",
  name: "دخلي الاسم الكامل",
  phone: "دخلي رقم هاتف مغربي صحيح كيبدأ بـ 06 أو 07",
  city: "اختاري المدينة",
} as const;

export interface WatchesFormValues {
  name: string;
  phone: string;
  city: string;
}

export interface WatchesFormErrors {
  selection?: string;
  name?: string;
  phone?: string;
  city?: string;
}

export function validateWatchesCheckout(
  selectedLines: SelectedWatchLine[],
  checkoutUnlocked: boolean,
  form: WatchesFormValues
): WatchesFormErrors {
  const errors: WatchesFormErrors = {};
  const selectedCount = countSelectedWatches(selectedLines);

  if (!checkoutUnlocked || selectedCount < 1) {
    errors.selection = WATCHES_VALIDATION.selection;
  }
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = WATCHES_VALIDATION.name;
  }
  if (!isValidMoroccanPhone(form.phone)) {
    errors.phone = WATCHES_VALIDATION.phone;
  }
  if (!form.city.trim()) errors.city = WATCHES_VALIDATION.city;

  return errors;
}

export function normalizeWatchesPhone(phone: string): string {
  return normalizeMoroccanPhone(phone);
}
