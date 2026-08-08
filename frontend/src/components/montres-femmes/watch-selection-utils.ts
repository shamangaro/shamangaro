import {
  WATCHES_PRODUCT,
  getWatchVariant,
  type WatchSlide,
  type WatchVariantId,
} from "./config";

export const MAX_WATCH_LINE_QUANTITY = 99;
export const MIN_WATCH_LINE_QUANTITY = 1;

export type SelectWatchResult = "added" | "unchanged";

/** Payload passed from a slider slide into the cart selection handler. */
export interface WatchSelection {
  slideId: string;
  variantId: WatchVariantId;
  watchName: string;
  modelNumber: string;
  caption: string;
  image: string;
  unitPrice: number;
}

export interface SelectedWatchLine {
  slideId: string;
  variantId: WatchVariantId;
  watchName: string;
  modelNumber: string;
  caption: string;
  image: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export function computeLineSubtotal(quantity: number): number {
  return WATCHES_PRODUCT.unitPrice * quantity;
}

export function withLineTotals(
  line: Omit<SelectedWatchLine, "unitPrice" | "subtotal"> & {
    unitPrice?: number;
    subtotal?: number;
  }
): SelectedWatchLine {
  const unitPrice = line.unitPrice ?? WATCHES_PRODUCT.unitPrice;
  return {
    ...line,
    unitPrice,
    subtotal: computeLineSubtotal(line.quantity),
  };
}

export function watchSelectionFromSlide(slide: WatchSlide): WatchSelection {
  const variant = getWatchVariant(slide.variantId);
  return {
    slideId: slide.id,
    variantId: variant.id,
    watchName: variant.labelAr,
    modelNumber: variant.label,
    caption: slide.caption,
    image: slide.src,
    unitPrice: WATCHES_PRODUCT.unitPrice,
  };
}

export function watchSelectionToLine(
  watch: WatchSelection,
  quantity = MIN_WATCH_LINE_QUANTITY
): SelectedWatchLine {
  return withLineTotals({
    slideId: watch.slideId,
    variantId: watch.variantId,
    watchName: watch.watchName,
    modelNumber: watch.modelNumber,
    caption: watch.caption,
    image: watch.image,
    quantity,
  });
}

export function countSelectedWatches(lines: SelectedWatchLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function countSelectedModels(lines: SelectedWatchLine[]): number {
  return lines.length;
}

export function computeWatchTotalFromLines(lines: SelectedWatchLine[]): number {
  return lines.reduce((sum, line) => sum + line.subtotal, 0);
}

/** Add exactly one cart line for this slide. Never replaces other slides. */
export function selectWatchLine(
  lines: SelectedWatchLine[],
  watch: WatchSelection
): { lines: SelectedWatchLine[]; result: SelectWatchResult } {
  if (lines.some((line) => line.slideId === watch.slideId)) {
    return { lines, result: "unchanged" };
  }

  return {
    lines: [...lines, watchSelectionToLine(watch)],
    result: "added",
  };
}

export function isSlideSelectedInCart(
  lines: SelectedWatchLine[],
  slide: WatchSlide
): boolean {
  return lines.some((line) => line.slideId === slide.id);
}

/** One cart line per slide — guards against duplicate inserts. */
export function normalizeWatchLines(
  lines: SelectedWatchLine[]
): SelectedWatchLine[] {
  const bySlide = new Map<string, SelectedWatchLine>();
  for (const line of lines) {
    if (!bySlide.has(line.slideId)) {
      bySlide.set(line.slideId, line);
    }
  }
  return Array.from(bySlide.values());
}

export function incrementWatchLineQuantity(
  lines: SelectedWatchLine[],
  slideId: string
): SelectedWatchLine[] {
  return lines.map((line) => {
    if (line.slideId !== slideId) return line;
    const quantity = Math.min(line.quantity + 1, MAX_WATCH_LINE_QUANTITY);
    return withLineTotals({ ...line, quantity });
  });
}

export function decrementWatchLineQuantity(
  lines: SelectedWatchLine[],
  slideId: string
): SelectedWatchLine[] {
  return lines.map((line) => {
    if (line.slideId !== slideId) return line;
    const quantity = Math.max(line.quantity - 1, MIN_WATCH_LINE_QUANTITY);
    return withLineTotals({ ...line, quantity });
  });
}

export function removeWatchLine(
  lines: SelectedWatchLine[],
  slideId: string
): SelectedWatchLine[] {
  return lines.filter((line) => line.slideId !== slideId);
}

/** Aggregate cart lines by backend variant for order API. */
export function lineItemsToPayload(lines: SelectedWatchLine[]) {
  const totals = new Map<WatchVariantId, number>();
  for (const line of normalizeWatchLines(lines)) {
    totals.set(
      line.variantId,
      (totals.get(line.variantId) ?? 0) + line.quantity
    );
  }
  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([variant_id, quantity]) => ({ variant_id, quantity }));
}

export const WATCH_SELECTION_COPY = {
  browseHint: "تصفّحي الصور و اختاري الساعة اللي عجباتك.",
  selectWatch: "اختاري هاد الساعة",
  selectWatchAria: "اختاري هاد الساعة",
  addedWatch: "تمت الإضافة",
  addedToast: "تمت إضافة الساعة إلى السلة",
  selectedLabel: "مختارة",
  cartTitle: "السلة",
  selectedTitle: "الساعات المختارة",
  remove: "حذف",
  unitPriceLabel: "ثمن الوحدة",
  continueOrder: "إتمام الطلب",
  selectAtLeastOne: "اختاري ساعة على الأقل",
  modelsSelected: (count: number) =>
    count === 1 ? "ساعة واحدة مختارة" : `${count} ساعات مختارة`,
  totalQuantity: (count: number) =>
    count === 1 ? "المجموع: ساعة واحدة" : `المجموع: ${count} ساعات`,
  totalPriceLabel: "المجموع",
  stepCheckout: "معلومات الطلب",
  stickySummary: (count: number) =>
    count === 1
      ? "ساعة واحدة مختارة — شوفي الاختيار"
      : `${count} ساعات مختارة — شوفi الاختيار`,
  checkoutLocked: "اختاري ساعة على الأقل باش تكملي الطلب",
} as const;
