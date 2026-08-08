export type WatchVariantId = "taupe" | "burgundy" | "navy-blue";

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
  unitPrice: 249,
  sourcePage: "/products/montres-femmes",
} as const;

/** Couleur par défaut — confirmée au téléphone avec la cliente */
export const DEFAULT_WATCH_VARIANT: WatchVariantId = "taupe";

/** Copy livraison — cohérent sur toute la LP Montres Femmes */
export const WATCHES_DELIVERY = {
  headline: "توصيل مجاني",
  subline: "لجميع مدن المغرب",
  detail: "1–3 أيام عمل · بدون مصاريف إضافية",
  full: "توصيل مجاني لجميع مدن المغرب",
} as const;

/** LP palette — khdar malaki + or sur les cadres */
export const WATCHES_THEME = {
  green: "#1A5C42",
  greenDark: "#0F3D2E",
  greenMid: "#247A58",
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
    id: "taupe",
    label: "Taupe",
    labelAr: "توب",
    color: "#B8A898",
    ringColor: "#9A8878",
    image: "/images/montres-femmes/slide-01-packaging.png",
  },
  {
    id: "burgundy",
    label: "Burgundy",
    labelAr: "عنابي",
    color: "#7B2D42",
    ringColor: "#5C2233",
    image: "/images/montres-femmes/slide-04-burgundy.png",
  },
  {
    id: "navy-blue",
    label: "Navy Blue",
    labelAr: "أزرق بحري",
    color: "#1E3A5F",
    ringColor: "#152A45",
    image: "/images/montres-femmes/slide-02-navy.png",
  },
];

export const WATCH_SLIDES: WatchSlide[] = [
  {
    id: "taupe-packaging",
    src: "/images/montres-femmes/slide-01-packaging.png",
    alt: "ساعة نسائية ذهبية مع علبة هدايا",
    caption: "علبة هدايا فاخرة",
    variantId: "taupe",
  },
  {
    id: "navy-leather",
    src: "/images/montres-femmes/slide-02-navy.png",
    alt: "ساعة بسوار جلد أزرق بحري",
    caption: "سوار جلد أنيق",
    variantId: "navy-blue",
  },
  {
    id: "taupe-twotone",
    src: "/images/montres-femmes/slide-03-twotone.png",
    alt: "ساعة بسوار معدني ذهبي وفضي",
    caption: "سوار معدني فاخر",
    variantId: "taupe",
  },
  {
    id: "burgundy-wrist",
    src: "/images/montres-femmes/slide-04-burgundy.png",
    alt: "ساعة عنابي على المعصم",
    caption: "لمسة أنثوية راقية",
    variantId: "burgundy",
  },
  {
    id: "taupe-cream",
    src: "/images/montres-femmes/slide-05-cream.png",
    alt: "ساعة بسوار جلد كريمي",
    caption: "ستايل كلاسيكي",
    variantId: "taupe",
  },
  {
    id: "taupe-detail",
    src: "/images/montres-femmes/slide-06-detail.png",
    alt: "تفاصيل الساعة والعلبة",
    caption: "جودة وتفاصيل دقيقة",
    variantId: "taupe",
  },
];

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
    a: "249 درهم لساعة وحدة. المجموع = 249 × العدد. التوصيل مجاني.",
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
  return WATCH_VARIANTS.find((v) => v.id === id) ?? WATCH_VARIANTS[1];
}

export const WATCH_QUANTITY_OPTIONS = [
  { quantity: 1 as const, label: "ساعة وحدة", total: 249 },
  { quantity: 2 as const, label: "جوج ساعات", total: 498 },
  { quantity: 3 as const, label: "3 ساعات", total: 747 },
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
