import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_ICON_SRC = "/images/logo-icon.png";
const LOGO_ICON_WIDTH = 192;
const LOGO_ICON_HEIGHT = 224;

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LogoVariant = "icon" | "wordmark";

const iconSizeClasses: Record<LogoSize, string> = {
  xs: "h-7 w-auto",
  sm: "h-9 w-auto",
  md: "h-10 w-auto",
  lg: "h-12 w-auto",
  xl: "h-16 w-auto",
};

const textSizeClasses: Record<LogoSize, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string | null;
  subtitle?: string;
  className?: string;
  textClassName?: string;
  subtitleClassName?: string;
  priority?: boolean;
}

function LogoIcon({
  size,
  className,
  priority,
  decorative,
}: {
  size: LogoSize;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <img
      src={LOGO_ICON_SRC}
      alt={decorative ? "" : "SHAMANGARO"}
      aria-hidden={decorative ? true : undefined}
      width={LOGO_ICON_WIDTH}
      height={LOGO_ICON_HEIGHT}
      className={cn("block shrink-0 object-contain", iconSizeClasses[size], className)}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export function Logo({
  variant = "wordmark",
  size = "md",
  href = "/",
  subtitle,
  className,
  textClassName,
  subtitleClassName,
  priority = false,
}: LogoProps) {
  const content =
    variant === "icon" ? (
      <LogoIcon size={size} className={className} priority={priority} />
    ) : (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <LogoIcon size={size} priority={priority} decorative />
        <span className="flex flex-col items-start leading-tight">
          <span
            className={cn(
              "translate-y-0.5 font-extrabold tracking-wide text-navy",
              textSizeClasses[size],
              textClassName
            )}
          >
            SHAMANGARO
          </span>
          {subtitle ? (
            <span
              className={cn(
                "text-xs font-medium text-muted-foreground",
                subtitleClassName
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </span>
      </span>
    );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center"
        aria-label="SHAMANGARO"
      >
        {content}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{content}</span>;
}
