export type WatchVariantId =
  | "two-tone-white"
  | "two-tone-brown"
  | "gold-brown"
  | "navy-leather"
  | "burgundy-oval"
  | "cream-leather"
  | "silver-blue"
  | "twotone-green"
  | "gold-green-stones"
  | "twotone-white-gold"
  | "leopard-panther"
  | "twotone-white-alt"
  | "oval-gold-black"
  | "oval-silver-black"
  | "square-gold-green"
  | "oval-gold-cream"
  | "square-gold-white"
  | "square-gold-brown"
  | "octagon-silver"
  | "cushion-navy"
  | "cushion-cream"
  | "square-gold-ivory"
  | "silver-pink";

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
  unitPrice: 260,
  sourcePage: "/products/montres-femmes",
  logoIcon: "/images/montres-femmes/logo-watch-mark.svg?v=square",
} as const;

/** Couleur par défaut — confirmée au téléphone avec la cliente */
export const DEFAULT_WATCH_VARIANT: WatchVariantId = "two-tone-white";

/** Static LCP hero (default SKU). Bypasses /_next/image AVIF decode delay. */
export const WATCH_HERO_LCP_IMAGE =
  "/images/montres-femmes/watch-01-twotone-white-lcp.webp";
export const WATCH_HERO_LCP_WIDTH = 800;
export const WATCH_HERO_LCP_HEIGHT = 960;

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
  {
    id: "silver-blue",
    label: "Silver Blue",
    labelAr: "فضي أزرق",
    color: "#1E4E8C",
    ringColor: "#C0C0C0",
    image: "/images/montres-femmes/gallery-01-silver-blue.jpg",
  },
  {
    id: "twotone-green",
    label: "Two-tone Green",
    labelAr: "ذهبي فضي أخضر",
    color: "#1F6B3A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-02-twotone-green.jpg",
  },
  {
    id: "gold-green-stones",
    label: "Gold Green Stones",
    labelAr: "ذهبي أخضر مرصّع",
    color: "#1F6B3A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-03-gold-green-stones.jpg",
  },
  {
    id: "twotone-white-gold",
    label: "Two-tone White Gold",
    labelAr: "ذهبي فضي أبيض",
    color: "#F5F5F0",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-04-twotone-white.jpg",
  },
  {
    id: "leopard-panther",
    label: "Leopard Panther",
    labelAr: "نمر مربع",
    color: "#1A1A1A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-05-leopard-panther.jpg",
  },
  {
    id: "twotone-white-alt",
    label: "Two-tone White Alt",
    labelAr: "ذهبي فضي أبيض",
    color: "#F5F5F0",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-06-twotone-white-alt.jpg",
  },
  {
    id: "oval-gold-black",
    label: "Oval Gold Black",
    labelAr: "بيضاوية ذهبية أسود",
    color: "#111111",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-07-oval-gold-black.jpg",
  },
  {
    id: "oval-silver-black",
    label: "Oval Silver Black",
    labelAr: "بيضاوية فضية أسود",
    color: "#111111",
    ringColor: "#C0C0C0",
    image: "/images/montres-femmes/gallery-08-oval-silver-black.jpg",
  },
  {
    id: "square-gold-green",
    label: "Square Gold Green",
    labelAr: "مربعة ذهبية أخضر",
    color: "#1F6B3A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-09-square-gold-green.jpg",
  },
  {
    id: "oval-gold-cream",
    label: "Oval Gold Cream",
    labelAr: "بيضاوية ذهبية كريمي",
    color: "#E8D5B7",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-10-oval-gold-cream.jpg",
  },
  {
    id: "square-gold-white",
    label: "Square Gold White",
    labelAr: "مربعة ذهبية أبيض",
    color: "#F5F5F0",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-11-square-gold-white.jpg",
  },
  {
    id: "square-gold-brown",
    label: "Square Gold Brown",
    labelAr: "مربعة ذهبية بني",
    color: "#5C3317",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-12-square-gold-brown.jpg",
  },
  {
    id: "octagon-silver",
    label: "Octagon Silver",
    labelAr: "ثمانية فضي",
    color: "#C0C0C0",
    ringColor: "#A8A8A8",
    image: "/images/montres-femmes/gallery-13-octagon-silver.jpg",
  },
  {
    id: "cushion-navy",
    label: "Cushion Navy",
    labelAr: "وسادة ذهبية أزرق",
    color: "#2F5F8A",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-14-cushion-navy.jpg",
  },
  {
    id: "cushion-cream",
    label: "Cushion Cream",
    labelAr: "وسادة ذهبية كريمي",
    color: "#E8D5B7",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-15-cushion-cream.jpg",
  },
  {
    id: "square-gold-ivory",
    label: "Square Gold Ivory",
    labelAr: "مربعة ذهبية عاجي",
    color: "#F3E6C8",
    ringColor: "#C9A227",
    image: "/images/montres-femmes/gallery-16-square-gold-ivory.jpg",
  },
  {
    id: "silver-pink",
    label: "Silver Pink",
    labelAr: "فضي وردي",
    color: "#E8A0B8",
    ringColor: "#C0C0C0",
    image: "/images/montres-femmes/gallery-17-silver-pink.jpg",
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

/** Real-life product proof — drop JPEG/PNG files in public/images/montres-femmes/. */
export const WATCH_PROOF_SLOTS = [
  {
    id: "wrist",
    file: "proof-01-wrist.jpg",
    required: true,
    labelAr: "على المعصم",
    labelFr: "Au poignet",
    hintAr: "صورة حقيقية للساعة على معصم امرأة",
    hintFr: "Photo réelle de la montre au poignet",
  },
  {
    id: "closeup",
    file: "proof-02-closeup.jpg",
    required: true,
    labelAr: "صورة مقرّبة",
    labelFr: "Gros plan",
    hintAr: "صورة مقرّبة للوجه والسوار",
    hintFr: "Gros plan du cadran et du bracelet",
  },
  {
    id: "packaging",
    file: "proof-03-packaging.jpg",
    required: true,
    labelAr: "العلبة / التغليف",
    labelFr: "Boîte / emballage",
    hintAr: "العلبة أو التغليف كما كيوصلك",
    hintFr: "Boîte ou emballage tel que livré",
  },
  {
    id: "size",
    file: "proof-04-size.jpg",
    required: true,
    labelAr: "الحجم على المعصم",
    labelFr: "Taille / proportion",
    hintAr: "تبان فيها نسبة الساعة مع المعصم أو اليد",
    hintFr: "La montre en proportion avec le poignet",
  },
  {
    id: "lifestyle",
    file: "proof-05-lifestyle.jpg",
    required: false,
    labelAr: "في الحياة اليومية",
    labelFr: "Style de vie",
    hintAr: "اختياري — مع اللباس أو الخارج",
    hintFr: "Optionnel — tenue / quotidien",
  },
  {
    id: "detail",
    file: "proof-06-detail.jpg",
    required: false,
    labelAr: "تفصيل إضافي",
    labelFr: "Détail",
    hintAr: "اختياري — قفل، سوار، أو زاوية أخرى",
    hintFr: "Optionnel — boucle, bracelet, autre angle",
  },
] as const;

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
    a: "260 درهم لساعة وحدة. المجموع = 260 × العدد. التوصيل مجاني.",
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
  { quantity: 1 as const, label: "ساعة وحدة", total: 260 },
  { quantity: 2 as const, label: "جوج ساعات", total: 520 },
  { quantity: 3 as const, label: "3 ساعات", total: 780 },
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
