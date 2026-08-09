import {
  PRODUCT_BADGE_CLASSES,
  PRODUCT_BADGE_LABELS,
  classifyOrderProduct,
  type OrderProductFields,
  type OrderProductType,
} from "@/lib/order-product";
import { cn } from "@/lib/utils";

export function OrderProductBadge({
  order,
  productType,
  className,
}: {
  order?: OrderProductFields;
  productType?: OrderProductType;
  className?: string;
}) {
  const resolved = productType ?? (order ? classifyOrderProduct(order) : "unknown");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold",
        PRODUCT_BADGE_CLASSES[resolved],
        className
      )}
    >
      {PRODUCT_BADGE_LABELS[resolved]}
    </span>
  );
}
