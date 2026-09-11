import { cn } from "@/lib/utils";

export function WatchesLogoMark({
  className,
  tone = "green",
}: {
  className?: string;
  tone?: "green" | "white";
}) {
  const body = tone === "white" ? "#FFFFFF" : "#134A35";
  const marks = tone === "white" ? "#0A2F23" : "#FAF7F2";
  return (
    <svg
      viewBox="0 0 80 140"
      className={cn("block h-14 w-auto shrink-0", className)}
      aria-hidden
    >
      <g fill={body}>
        <path d="M28 4c0-1.7 1.4-3 3-3h18c1.6 0 3 1.3 3 3v38H28z" />
        <rect x="10" y="40" width="60" height="60" rx="6" />
        <rect x="69.5" y="64" width="7.5" height="12" rx="2.2" />
        <path d="M28 98h24v38c0 1.7-1.4 3-3 3H31c-1.6 0-3-1.3-3-3z" />
      </g>
      <rect
        x="20"
        y="50"
        width="40"
        height="40"
        rx="4"
        fill="none"
        stroke={marks}
        strokeWidth="4.5"
      />
      <g transform="translate(40 70)">
        <g className="watches-logo-hour">
          <line
            x1="0"
            y1="2.4"
            x2="0"
            y2="-11"
            stroke={marks}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>
        <g className="watches-logo-minute">
          <line
            x1="0"
            y1="2.4"
            x2="0"
            y2="-16"
            stroke={marks}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
