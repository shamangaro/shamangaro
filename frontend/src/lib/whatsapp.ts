import { contactInfo } from "@/config/legal";

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${contactInfo.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
