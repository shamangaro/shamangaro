import { cn } from "@/lib/utils";

/** Motif vert modern pro — grille fine + lignes diagonales + lueur dorée */
export function WatchesGreenPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="watches-modern-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="#B8924A"
              strokeWidth="0.4"
              opacity="0.2"
            />
            <path
              d="M0 24H48M24 0V48"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.3"
              opacity="0.07"
            />
          </pattern>
          <pattern
            id="watches-modern-diagonal"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="#D4BC82"
              strokeWidth="0.45"
              opacity="0.11"
            />
          </pattern>
          <pattern
            id="watches-modern-dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.85" fill="#B8924A" opacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#watches-modern-grid)" />
        <rect width="100%" height="100%" fill="url(#watches-modern-diagonal)" />
        <rect width="100%" height="100%" fill="url(#watches-modern-dots)" />
      </svg>

      <div className="absolute -end-16 top-0 h-52 w-52 rounded-full bg-[#B8924A]/14 blur-3xl" />
      <div className="absolute -start-12 bottom-0 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_45%,rgba(0,0,0,0.07)_100%)]" />
    </div>
  );
}

export const watchesGreenSurfaceClassName =
  "relative overflow-hidden border-[#B8924A]/25 bg-gradient-to-r from-[#0A2F23] via-[#134A35] to-[#0A2F23]";

export const watchesGreenTopLineClassName =
  "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8924A]/50 to-transparent";

export const watchesGreenBottomLineClassName =
  "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B8924A]/28 to-transparent";
