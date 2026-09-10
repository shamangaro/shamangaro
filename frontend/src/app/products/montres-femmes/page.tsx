import type { Metadata } from "next";
import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesHeader } from "@/components/montres-femmes/WatchesHeader";
import { WatchesFreeDeliveryStrip } from "@/components/montres-femmes/WatchesFreeDelivery";
import { WatchesOrderFlow } from "@/components/montres-femmes/WatchesOrderFlow";
import { WatchesReviews } from "@/components/montres-femmes/WatchesReviews";
import { WatchesBenefits } from "@/components/montres-femmes/WatchesBenefits";
import { WatchesTrust } from "@/components/montres-femmes/WatchesTrust";
import { WatchesOrderingSteps } from "@/components/montres-femmes/WatchesOrderingSteps";
import { WatchesFAQ } from "@/components/montres-femmes/WatchesFAQ";
import { WatchesStickyCTA } from "@/components/montres-femmes/WatchesStickyCTA";
import { WatchesScrollToTopButton } from "@/components/montres-femmes/WatchesScrollToTopButton";
import { WatchesFooter } from "@/components/montres-femmes/WatchesFooter";

export const metadata: Metadata = {
  title: "Montres Femmes Élégantes — 250 DH | SHAMANGARO",
  description:
    "ساعات نسائية أنيقة — 250 DH، توصيل مجاني، الدفع عند الإستلام، كاين التبديل.",
  openGraph: {
    title: "Montres Femmes Élégantes — 250 DH",
    description:
      "ساعات نسائية أنيقة — توصيل مجاني · الدفع عند الإستلام · كاين التبديل",
    images: [{ url: "/images/montres-femmes/hero.png", width: 800, height: 1000 }],
  },
};

export default function MontresFemmesPage() {
  return (
    <WatchesPageProvider>
      <WatchesHeader />
      <main>
        <WatchesOrderFlow />
        <WatchesTrust />
        <WatchesBenefits />
        <WatchesFreeDeliveryStrip />
        <WatchesOrderingSteps />
        <WatchesFreeDeliveryStrip />
        <WatchesReviews />
        <WatchesFAQ />
        <WatchesFooter />
      </main>
      <WatchesStickyCTA />
      <WatchesScrollToTopButton />
    </WatchesPageProvider>
  );
}
