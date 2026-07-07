import type { Metadata } from "next";
import { getLegalPage } from "@/config/legal";

export function buildLegalMetadata(slug: string): Metadata {
  const page = getLegalPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title: `${page.title} | SHAMANGARO`,
      description: page.description,
      locale: "ar_MA",
      type: "website",
      siteName: "SHAMANGARO",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
