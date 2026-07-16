export type OfferId = "solo" | "duo" | "family";

export interface ProductOffer {
  id: OfferId;
  label: string;
  subtitle: string;
  chairs: number;
  pricePerChair: number;
  total: number;
  badge?: string;
  savings?: number;
}

export const BASE_PRICE_PER_CHAIR = 249;

export const productOffers: ProductOffer[] = [
  {
    id: "solo",
    label: "كرسي واحد",
    subtitle: "Neo Transat × 1",
    chairs: 1,
    pricePerChair: 249,
    total: 249,
  },
  {
    id: "duo",
    label: "كرسيين",
    subtitle: "Neo Transat × 2",
    chairs: 2,
    pricePerChair: 229,
    total: 458,
    badge: "الأكثر مبيعاً",
    savings: 40,
  },
  {
    id: "family",
    label: "3 كراسي",
    subtitle: "Neo Transat × 3",
    chairs: 3,
    pricePerChair: 219,
    total: 657,
    badge: "أفضل عرض",
    savings: 90,
  },
];

export function getPricePerChair(chairCount: number): number {
  if (chairCount >= 3) return 219;
  if (chairCount === 2) return 229;
  return BASE_PRICE_PER_CHAIR;
}

export function getOfferTotal(chairCount: number): number {
  if (chairCount <= 0) return 0;
  return chairCount * getPricePerChair(chairCount);
}

export function getOfferSavings(chairCount: number): number {
  if (chairCount <= 0) return 0;
  return getOriginalTotal(chairCount) - getOfferTotal(chairCount);
}

export function getOriginalTotal(chairCount: number): number {
  if (chairCount <= 0) return 0;
  return chairCount * BASE_PRICE_PER_CHAIR;
}

export function getOfferLabel(chairCount: number): string {
  if (chairCount === 1) return "كرسي واحد";
  if (chairCount === 2) return "كرسيين";
  return `${chairCount} كراسي`;
}

export function getOfferSubtitle(chairCount: number): string {
  return `Neo Transat × ${chairCount}`;
}

export function getOfferById(offerId: string): ProductOffer | undefined {
  return productOffers.find((offer) => offer.id === offerId);
}
