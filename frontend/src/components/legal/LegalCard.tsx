import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalCard({ icon: Icon, title, children, className }: LegalCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border/60 bg-white p-5 shadow-sm md:p-6",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
          <Icon size={20} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-navy">{title}</h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
