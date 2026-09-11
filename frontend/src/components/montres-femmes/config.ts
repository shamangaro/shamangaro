export type WatchVariantId =
  | "two-tone-white"
  | "two-tone-brown"
  | "gold-brown"
  | "navy-leather"
  | "burgundy-oval"
  | "cream-leather";

export interface WatchVariant {
  id: WatchVariantId;
  label: string;
  labelAr: string;
  color: string;
  ringColor: string;
  image: string;
}

export interface WatchSlide {
  /** Stable unique id — never use slide index. */
  id: string;
  src: string;
  alt: string;
  caption: string;
  variantId: WatchVariantId;
}

export const WATCHES_PRODUCT = {
  name: "Montres Femmes Élégantes",
  slug: "montres-femmes",
  unitPrice: 250,
  sourcePage: "/products/montres-femmes",
  logoIcon: "/images/montres-femmes/logo-watch-mark.svg?v=square",
} as const;

/** Couleur par défaut — confirmée au téléphone avec la cliente */
export const DEFAULT_WATCH_VARIANT: WatchVariantId = "two-tone-white";

/** Copy livraison — cohérent sur toute la LP Montres Femmes */
export const WATCHES_DELIVERY = {
  headline: "توصيل مجاني",
  subline: "لجميع مدن المغرب",
  detail: "1–3 أيام عمل · بدون مصاريف إضافية",
  full: "توصيل مجاني لجميع مدن المغرب",
} as const;

/** LP palette — khdar malaki + or sur les cadres */
export const WATCHES_THEME = {
  green: "#134A35",
  greenDark: "#0A2F23",
  greenMid: "#1A684A",
  gold: "#B8924A",
  goldLight: "#D4BC82",
  greenLight: "#E8F5ED",
  greenSoft: "#D4EDDA",
  greenBorder: "#A8C9B4",
  cream: "#FAF7F2",
  creamAlt: "#F7F3EE",
  text: "#0F2A1F",
  textMuted: "#4A5C52",
  border: "#D8E8DC",
  frameRing: "ring-1 ring-[#B8924A]/25 border border-[#A8C9B4]",
} as const;

export const WATCH_VARIANTS: WatchVariant[] = [
  {
    id: "two-tone-white",
    label: "Two-tone White",
    labelAr: "أبيض",
    color: "#D4AF37",
    ringColor: "#C0C0C0",
    image: "/images/montres-femmes/watch-01-twotone-white.jpg",
  },
  {
    id: "two-tone-brown",
    label: "Two-tone Brown",
    labelAr: "بني",
    color: "#5C3317",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/watch-02-twotone-brown.jpg",
  },
  {
    id: "gold-brown",
    label: "Gold Brown",
    labelAr: "ذهبي",
    color: "#C9A227",
    ringColor: "#A8841C",
    image: "/images/montres-femmes/watch-03-gold-brown.jpg",
  },
  {
    id: "navy-leather",
    label: "Navy Leather",
    labelAr: "أزرق",
    color: "#2F5F8A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/watch-04-navy-leather.jpg",
  },
  {
    id: "burgundy-oval",
    label: "Burgundy Oval",
    labelAr: "بنفسجي",
    color: "#6B1F5A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/watch-05-burgundy-oval.jpg",
  },
  {
    id: "cream-leather",
    label: "Cream Leather",
    labelAr: "كريمي",
    color: "#E8D5B7",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/watch-06-cream-leather.jpg",
  },
];

export const WATCH_SLIDES: WatchSlide[] = WATCH_VARIANTS.map((variant) => ({
  id: variant.id,
  src: variant.image,
  alt: `ساعة نسائية ${variant.labelAr}`,
  caption: variant.labelAr,
  variantId: variant.id,
}));

export const WATCH_GALLERY = [
  "/images/montres-femmes/gallery-detail.svg",
  "/images/montres-femmes/gallery-lifestyle.svg",
  "/images/montres-femmes/gallery-packaging.svg",
];

export const WATCH_BENEFITS = [
  {
    title: "ستايل أنثوي راقي",
    description:
      "خطوط ناعمة ولمسة راقية — كتمشي معاك من النهار للسهرات.",
  },
  {
    title: "خفيفة ومريحة",
    description: "خفيفة على المعصم و السوار ناعم — راحة طول النهار.",
  },
  {
    title: "هدية جاهزة",
    description: "تغليف زوين كيوصل جاهز — بلا ما تزيدي والو.",
  },
];

export const WATCH_FAQ = [
  {
    q: "شحال الثمن؟",
    a: "250 درهم لساعة وحدة. المجموع = 250 × العدد. التوصيل مجاني.",
  },
  {
    q: "كيفاش نخلّص؟",
    a: "الدفع عند الإستلام — كاش ولا بطاقة ملي توصلك. بلا دفع أونلاين.",
  },
  {
    q: "واش كاين التبديل؟",
    a: "آه، التبديل ممكن. عيطي لينا من بعد ما توصلك إلا بغيتي تبدّلي اللون.",
  },
  {
    q: "شحال كياخد التوصيل؟",
    a: "1 حتى 3 أيام ديال الخدمة لجميع المدن ديال المغرب.",
  },
  {
    q: "واش نقدر نزيد العدد؟",
    a: "آه، ختاري العدد اللي بغيتي — المجموع كيتبدّل بوحدو.",
  },
];

export function getWatchVariant(id: WatchVariantId): WatchVariant {
  return WATCH_VARIANTS.find((v) => v.id === id) ?? WATCH_VARIANTS[0];
}

export const WATCH_QUANTITY_OPTIONS = [
  { quantity: 1 as const, label: "ساعة وحدة", total: 250 },
  { quantity: 2 as const, label: "جوج ساعات", total: 500 },
  { quantity: 3 as const, label: "3 ساعات", total: 750 },
];

export const MOROCCAN_CITIES = [
  "الدار البيضاء",
  "الرباط",
  "مراكش",
  "فاس",
  "طنجة",
  "أكادير",
  "مكناس",
  "وجدة",
  "القنيطرة",
  "تطوان",
  "تمارة",
  "سلا",
  "الجديدة",
  "بني ملال",
  "خريبكة",
  "المحمدية",
  "الناظور",
  "سطات",
  "آسفي",
  "العيون",
];

export function computeWatchTotal(quantity: number): number {
  return WATCHES_PRODUCT.unitPrice * quantity;
}

export function formatWatchPrice(amount: number): string {
  return `${amount} درهم`;
}
