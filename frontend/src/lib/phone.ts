/** Moroccan mobile: 06 or 07 + 8 digits (10 digits total). */
const MOROCCAN_PHONE_REGEX = /^0[67]\d{8}$/;

export function normalizeMoroccanPhone(phone: string): string {
  return phone.replace(/[\s.-]/g, "");
}

export function isValidMoroccanPhone(phone: string): boolean {
  return MOROCCAN_PHONE_REGEX.test(normalizeMoroccanPhone(phone));
}

export const MOROCCAN_PHONE_ERROR =
  "أدخل رقم مغربي صالح (10 أرقام، يبدأ بـ 06 أو 07)";
