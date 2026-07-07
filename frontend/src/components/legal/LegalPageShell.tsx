import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { LegalNav } from "@/components/legal/LegalNav";

interface LegalPageShellProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function LegalPageShell({
  title,
  subtitle,
  icon: Icon,
  children,
}: LegalPageShellProps) {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-[#fafafa] via-white to-white">
          <Container className="py-10 md:py-14">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-navy"
            >
              <ChevronLeft size={16} />
              الرجوع للصفحة الرئيسية
            </Link>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-black/10">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-navy md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 max-w-lg text-base text-muted-foreground">
                {subtitle}
              </p>
            </div>

            <div className="mt-8">
              <LegalNav />
            </div>
          </Container>
        </section>

        <section className="bg-gradient-to-b from-white to-[#f5f5f5] py-10 md:py-14">
          <Container>
            <div className="mx-auto max-w-3xl space-y-5">{children}</div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
