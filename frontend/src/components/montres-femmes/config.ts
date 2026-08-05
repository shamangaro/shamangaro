export type WatchVariantId = "taupe" | "burgundy" | "navy-blue";

export interface WatchVariant {
  id: WatchVariantId;
  label: string;
  labelAr: string;
  color: string;
  ringColor: string;
  image: string;
}

export const WATCHES_PRODUCT = {
  name: "Montres Femmes Élégantes",
  slug: "montres-femmes",
  unitPrice: 245,
  sourcePage: "/products/montres-femmes",
} as const;

export const WATCH_VARIANTS: WatchVariant[] = [
  {
    id: "taupe",
    label: "Taupe",
    labelAr: "توب",
    color: "#B8A898",
    ringColor: "#9A8878",
    image: "/images/montres-femmes/variant-taupe.svg",
  },
  {
    id: "burgundy",
    label: "Burgundy",
    labelAr: "عنابي",
    color: "#7B2D42",
    ringColor: "#5C2233",
    image: "/images/montres-femmes/variant-burgundy.svg",
  },
  {
    id: "navy-blue",
    label: "Navy Blue",
    labelAr: "أزرق بحري",
    color: "#1E3A5F",
    ringColor: "#152A45",
    image: "/images/montres-femmes/variant-navy.svg",
  },
];

export const WATCH_GALLERY = [
  "/images/montres-femmes/gallery-detail.svg",
  "/images/montres-femmes/gallery-lifestyle.svg",
  "/images/montres-femmes/gallery-packaging.svg",
];

export const WATCH_BENEFITS = [
  {
    title: "تصميم أنثوي راقي",
    description: "خطوط ناعمة ولمسة فاخرة تناسب كل المناسبات — من يومي إلى مسائي.",
  },
  {
    title: "خفيفة ومريحة",
    description: "وزن خفيف على المعصم مع سوار ناعم — راحة طوال اليوم.",
  },
  {
    title: "3 ألوان أنيقة",
    description: "توب، عنابي، وأزرق بحري — اختاري اللون اللي يمشي مع ستايلك.",
  },
  {
    title: "هدية جاهزة",
    description: "تغليف أنيق يصل جاهز للإهداء — بدون أي تكلفة إضافية.",
  },
];

export const WATCH_FAQ = [
  {
    q: "شحال الثمن؟",
    a: "245 درهم للساعة الواحدة. المجموع = 245 × الكمية. التوصيل مجاني.",
  },
  {
    q: "كيفاش ندفع؟",
    a: "الدفع عند الاستلام فقط — كاش أو بطاقة عند التوصيل. بدون دفع أونلاين.",
  },
  {
    q: "شنو الألوان المتوفرة؟",
    a: "3 طرازات: Taupe (توب)، Burgundy (عنابي)، Navy Blue (أزرق بحري).",
  },
  {
    q: "واش كاين التبديل؟",
    a: "نعم، التبديل متاح. تواصلي معنا بعد الاستلام إذا بغيتي تبدلي اللون أو المقاس.",
  },
  {
    q: "شحال كياخد التوصيل؟",
    a: "1 إلى 3 أيام عمل لجميع المدن المغربية.",
  },
  {
    q: "واش نقدر نزيد الكمية؟",
    a: "نعم، اختاري الكمية اللي بغيتي — المجموع يتحدث تلقائياً.",
  },
];

export function getWatchVariant(id: WatchVariantId): WatchVariant {
  return WATCH_VARIANTS.find((v) => v.id === id) ?? WATCH_VARIANTS[1];
}

export const WATCH_QUANTITY_OPTIONS = [
  { quantity: 1 as const, label: "ساعة وحدة", total: 245 },
  { quantity: 2 as const, label: "جوج ساعات", total: 490 },
  { quantity: 3 as const, label: "3 ساعات", total: 735 },
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
