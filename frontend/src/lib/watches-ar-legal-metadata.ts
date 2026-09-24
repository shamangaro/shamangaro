import type { Metadata } from "next";
import { getWatchesArLegalPage } from "@/config/legal-watches-ar";

export function buildWatchesArLegalMetadata(slug: string): Metadata {
  const page = getWatchesArLegalPage(slug);
  if (!page) return {};

  const title = `${page.title} | SHAMANGARO Montres Femmes`;

  return {
    title: { absolute: title },
    description: page.description,
    keywords: [
      "SHAMANGARO",
      "Montres Femmes",
      "ساعات نسائية المغرب",
      "ساعات نسائية",
    ],
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title,
      description: page.description,
      locale: "ar_MA",
      type: "website",
      siteName: "SHAMANGARO Montres Femmes",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
