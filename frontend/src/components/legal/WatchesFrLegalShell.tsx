import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { WatchesLogoMark } from "@/components/montres-femmes/WatchesLogoMark";
import { WatchesFrLegalNav } from "@/components/legal/WatchesFrLegalNav";
import { WATCHES_FR_HOME } from "@/config/legal-watches-fr";

interface WatchesFrLegalShellProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function WatchesFrLegalShell({
  title,
  subtitle,
  icon: Icon,
  children,
}: WatchesFrLegalShellProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2]" lang="fr" dir="ltr">
      <header className="border-b border-[#D8E8DC] bg-white/95">
        <Container>
          <div className="flex min-h-14 items-center justify-between py-2">
            <Logo
              size="md"
              href={WATCHES_FR_HOME}
              icon={<WatchesLogoMark className="h-10 w-auto" />}
              subtitle="Montres Femmes"
              subtitleClassName="whitespace-nowrap font-semibold uppercase tracking-[0.08em] text-[#B8924A] text-[10px] sm:text-xs"
              textClassName="text-[#134A35]"
              className="min-w-0 gap-1.5"
            />
            <Link
              href={WATCHES_FR_HOME}
              className="text-xs font-semibold text-[#134A35] underline-offset-2 hover:underline sm:text-sm"
            >
              Commander
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <section className="border-b border-[#D8E8DC] bg-white">
          <Container className="py-10 md:py-14">
            <Link
              href={WATCHES_FR_HOME}
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#4A5C52] transition-colors hover:text-[#134A35]"
            >
              <ChevronLeft size={16} />
              Retour à Montres Femmes
            </Link>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#134A35] text-white shadow-lg shadow-black/10">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-[#0F2A1F] md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 max-w-lg text-base text-[#4A5C52]">{subtitle}</p>
            </div>

            <div className="mt-8">
              <WatchesFrLegalNav />
            </div>
          </Container>
        </section>

        <section className="py-10 md:py-14">
          <Container>
            <div className="mx-auto max-w-3xl space-y-5">{children}</div>
          </Container>
        </section>
      </main>
    </div>
  );
}
