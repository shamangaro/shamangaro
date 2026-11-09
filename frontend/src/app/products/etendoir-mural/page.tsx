import type { Metadata } from "next";
import { EtendoirLanding } from "@/components/etendoir-mural/EtendoirLanding";
import { ETENDOIR_PRODUCT } from "@/components/etendoir-mural/config";

export const metadata: Metadata = {
  title: {
    absolute: `Étendoir mural pliant — ${ETENDOIR_PRODUCT.unitPrice} DH | SHAMANGARO`,
  },
  description:
    "Étendoir mural pliant : 3 tronçons et 6 crochets par tronçon. 349 DH, livraison gratuite, paiement à la livraison.",
  openGraph: {
    title: `Étendoir mural pliant — ${ETENDOIR_PRODUCT.unitPrice} DH`,
    description: "Il se déplie pour suspendre les vêtements, puis se replie contre le mur. Livraison gratuite · Paiement à la livraison.",
    locale: "fr_MA",
    alternateLocale: "ar_MA",
    siteName: "SHAMANGARO",
    images: [{ url: "/images/etendoir-mural/hero-angle.jpg" }],
  },
};

export default function EtendoirMuralPage() {
  return <EtendoirLanding />;
}
