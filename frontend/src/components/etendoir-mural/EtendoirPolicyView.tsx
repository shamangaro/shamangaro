import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import type { EtendoirLang } from "./copy";
import {
  ETENDOIR_POLICIES,
  ETENDOIR_POLICY_COPY,
  etendoirPolicyPath,
  type EtendoirPolicySlug,
} from "./policies";

export function EtendoirPolicyView({
  lang,
  slug,
}: {
  lang: EtendoirLang;
  slug: EtendoirPolicySlug;
}) {
  const copy = ETENDOIR_POLICY_COPY[lang];
  const page = copy.pages[slug];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={lang === "ar" ? "ar" : "fr"} className="min-h-screen bg-[#F4F4F5] text-[#171717]">
      <header className="sticky top-0 z-30 bg-white">
        <Container className="h-16">
          <div className="relative flex h-full items-center justify-between" dir="ltr">
            <span className="relative z-10 w-14" aria-hidden />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Link
                href="/products/etendoir-mural"
                className="pointer-events-auto flex flex-col items-center leading-none"
                aria-label="SHAMANGARO"
              >
                <span className="text-base font-extrabold tracking-wide text-[#171717] sm:text-lg">
                  SHAMANGARO
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#171717]/45 sm:text-[10px]">
                  Premium Brand
                </span>
              </Link>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-[11px] font-medium" dir="ltr">
              <Link
                href={etendoirPolicyPath(slug, "fr")}
                aria-current={lang === "fr" ? "page" : undefined}
                className={cn(lang === "fr" ? "text-[#171717] underline decoration-[#737373] decoration-2 underline-offset-[5px]" : "text-[#171717]/35")}
              >
                FR
              </Link>
              <Link
                href={etendoirPolicyPath(slug, "ar")}
                aria-current={lang === "ar" ? "page" : undefined}
                className={cn(lang === "ar" ? "text-[#171717] underline decoration-[#737373] decoration-2 underline-offset-[5px]" : "text-[#171717]/35")}
              >
                دارجة
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8 sm:py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/products/etendoir-mural"
              className="text-sm font-semibold text-[#171717] underline-offset-4 hover:underline"
            >
              {copy.back}
            </Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#737373]">
              {lang === "ar" ? "مجفف ملابس جداري" : "Étendoir mural pliant"}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#171717] sm:text-3xl">{page.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#666] sm:text-base">{page.subtitle}</p>

            <nav aria-label={copy.navLabel} className="mt-6 flex flex-wrap gap-2">
              {ETENDOIR_POLICIES.map((item) => {
                const active = item === slug;
                return (
                  <Link
                    key={item}
                    href={etendoirPolicyPath(item, lang)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm",
                      active
                        ? "bg-[#171717] text-white"
                        : "border border-[#D4D4D4] bg-white text-[#171717] hover:border-[#171717]"
                    )}
                  >
                    {copy.pages[item].label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 space-y-4">
              {page.blocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-2xl border border-[#D4D4D4] bg-white p-4 shadow-sm sm:p-5"
                >
                  <h2 className="text-base font-bold text-[#171717]">{block.title}</h2>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed text-[#525252]">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {block.list ? (
                      <ul className="list-disc space-y-1 ps-5">
                        {block.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {block.link ? (
                      <p>
                        <Link
                          href={block.link.href}
                          className="font-semibold text-[#171717] underline underline-offset-4"
                        >
                          {block.link.label}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-[#737373]">{copy.updated}</p>
          </div>
        </Container>
      </main>
    </div>
  );
}
