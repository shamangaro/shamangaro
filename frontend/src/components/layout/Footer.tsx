import { Container } from "@/components/shared/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-white to-[#f5f5f5] py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src="/images/logo-shamangaro.svg"
            alt="SHAMANGARO"
            width={380}
            height={88}
            className="block h-10 w-auto md:h-11"
            loading="lazy"
            decoding="async"
          />

          <p className="max-w-sm text-base text-muted-foreground">
            علامة مغربية premium ديال الحياة الخارجية. مصممة فالمغرب، للي كيقدرو
            الجودة والأناقة.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <span>الدفع عند الإستلام</span>
            <span>توصيل لجميع المدن</span>
            <span>ضمان سنة</span>
          </div>

          <div className="h-px w-full max-w-xs bg-border" />

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} SHAMANGARO</span>
            <span>·</span>
            <a
              href="https://wa.me/212679653509"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-navy-light"
            >
              06 79 65 35 09
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
