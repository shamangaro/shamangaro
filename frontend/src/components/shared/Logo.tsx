import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
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
  iconSrc?: string;
  icon?: ReactNode;
  iconClassName?: string;
  priority?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

function LogoIcon({
  size,
  className,
  priority,
  decorative,
  src,
}: {
  size: LogoSize;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  src: string;
}) {
  return (
    <img
      src={src}
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
  iconSrc = LOGO_ICON_SRC,
  icon,
  iconClassName,
  priority = false,
  onClick,
}: LogoProps) {
  const content =
    variant === "icon" ? (
      icon ? (
        <span className={cn(className, iconClassName)}>{icon}</span>
      ) : (
        <LogoIcon
          size={size}
          className={cn(className, iconClassName)}
          priority={priority}
          src={iconSrc}
        />
      )
    ) : (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {icon ? (
          <span className={iconClassName}>{icon}</span>
        ) : (
          <LogoIcon
            size={size}
            className={iconClassName}
            priority={priority}
            decorative
            src={iconSrc}
          />
        )}
        <span className="flex flex-col items-start justify-center leading-none">
          <span
            className={cn(
              "font-extrabold tracking-wide text-navy",
              textSizeClasses[size],
              textClassName,
              subtitle ? "leading-none" : "translate-y-0.5 leading-tight"
            )}
          >
            SHAMANGARO
          </span>
          {subtitle ? (
            <span
              className={cn(
                "mt-1 text-xs font-medium text-muted-foreground",
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
        onClick={onClick}
        className="inline-flex shrink-0 items-center"
        aria-label="SHAMANGARO"
      >
        {content}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{content}</span>;
}
