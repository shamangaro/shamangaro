import type { Metadata } from "next";
import { getWatchesFrLegalPage } from "@/config/legal-watches-fr";

export function buildWatchesFrLegalMetadata(slug: string): Metadata {
  const page = getWatchesFrLegalPage(slug);
  if (!page) return {};

  const title = `${page.title} | SHAMANGARO Montres Femmes`;

  return {
    title: { absolute: title },
    description: page.description,
    keywords: [
      "SHAMANGARO",
      "Montres Femmes",
      "montres femmes Maroc",
      "montre femme 260 DH",
    ],
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title,
      description: page.description,
      locale: "fr_MA",
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
