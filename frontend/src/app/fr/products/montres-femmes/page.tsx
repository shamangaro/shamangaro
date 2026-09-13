import type { Metadata } from "next";
import { FrWatchesLanding } from "@/components/montres-femmes-fr/FrWatchesLanding";

export const metadata: Metadata = {
  title: "Montres Femmes Élégantes — 250 DH | SHAMANGARO",
  description:
    "Montres femmes élégantes — 250 DH, livraison gratuite, paiement à la livraison, échange possible.",
  openGraph: {
    locale: "fr_MA",
    title: "Montres Femmes Élégantes — 250 DH",
    description:
      "Montres femmes élégantes — livraison gratuite · paiement à la livraison · échange possible",
    images: [{ url: "/images/montres-femmes/hero.png", width: 800, height: 1000 }],
  },
};

export default function FrenchMontresFemmesPage() {
  return <FrWatchesLanding />;
}
