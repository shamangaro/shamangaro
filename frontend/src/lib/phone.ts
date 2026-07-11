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

/** Moroccan local 06/07 number → international 212… for WhatsApp. */
export function phoneToInternational(phone: string): string {
  const normalized = normalizeMoroccanPhone(phone);
  if (normalized.startsWith("0")) {
    return `212${normalized.slice(1)}`;
  }
  return normalized.replace(/^\+/, "");
}

export function phoneToTelLink(phone: string): string {
  const normalized = normalizeMoroccanPhone(phone);
  return `tel:+${phoneToInternational(normalized)}`;
}

export function phoneToWhatsAppLink(phone: string, text?: string): string {
  const base = `https://wa.me/${phoneToInternational(phone)}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
