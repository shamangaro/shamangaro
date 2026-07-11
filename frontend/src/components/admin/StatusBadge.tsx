import { cn } from "@/lib/utils";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  type OrderStatus,
} from "@/lib/orders";

export function StatusBadge({ status }: { status: string }) {
  const key = status as OrderStatus;
  const label = STATUS_LABELS[key] ?? status;
  const color = STATUS_COLORS[key] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
        color
      )}
    >
      {label}
    </span>
  );
}
