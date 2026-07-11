import { cn } from "@/lib/utils";

const TRUST_STYLES = {
  trusted: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  high_risk: "bg-red-100 text-red-800 border-red-200",
} as const;

export function TrustBadge({
  label,
  display,
  score,
}: {
  label: string;
  display: string;
  score?: number;
}) {
  const style =
    TRUST_STYLES[label as keyof typeof TRUST_STYLES] ??
    "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        style
      )}
    >
      <span>{display}</span>
      {score !== undefined && (
        <span className="opacity-70" dir="ltr">
          ({score})
        </span>
      )}
    </span>
  );
}

export function RiskFlag({ isRisk }: { isRisk: boolean }) {
  if (!isRisk) return null;
  return (
    <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
      ⚠️ خطر
    </span>
  );
}
