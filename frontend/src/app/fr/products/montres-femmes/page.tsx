import type { Metadata } from "next";
import { FrWatchesLanding } from "@/components/montres-femmes-fr/FrWatchesLanding";

export const metadata: Metadata = {
  title: { absolute: "Montres Femmes Élégantes — 260 DH | SHAMANGARO" },
  description:
    "Montres femmes élégantes — 260 DH, livraison gratuite, paiement à la livraison, échange possible.",
  keywords: [
    "SHAMANGARO",
    "Montres Femmes",
    "montres femmes Maroc",
    "montre femme 260 DH",
  ],
  openGraph: {
    locale: "fr_MA",
    title: "Montres Femmes Élégantes — 260 DH",
    description:
      "Montres femmes élégantes — livraison gratuite · paiement à la livraison · échange possible",
    siteName: "SHAMANGARO Montres Femmes",
    images: [{ url: "/images/montres-femmes/hero.png", width: 800, height: 1000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montres Femmes Élégantes — 260 DH",
    description:
      "Montres femmes élégantes — livraison gratuite · paiement à la livraison · échange possible",
  },
};

export default function FrenchMontresFemmesPage() {
  return <FrWatchesLanding />;
}
