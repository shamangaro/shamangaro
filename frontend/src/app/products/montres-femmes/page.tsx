import type { Metadata } from "next";
import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesHeader } from "@/components/montres-femmes/WatchesHeader";
import { WatchesHero } from "@/components/montres-femmes/WatchesHero";
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
  title: "Montres Femmes Élégantes — 249 DH | SHAMANGARO",
  description:
    "ساعات نسائية أنيقة — 249 DH، توصيل مجاني، الدفع عند الإستلام، كاين التبديل.",
  openGraph: {
    title: "Montres Femmes Élégantes — 249 DH",
    description:
      "ساعات نسائية أنيقة — توصيل مجاني · الدفع عند الإستلام · كاين التبديل",
    images: [{ url: "/images/montres-femmes/hero.png", width: 800, height: 1000 }],
  },
};

export default function MontresFemmesPage() {
  return (
    <WatchesPageProvider>
      <WatchesHeader />
      <main className="pb-28 lg:pb-0">
        <WatchesHero />
        <WatchesFreeDeliveryStrip />
        <WatchesBenefits />
        <WatchesTrust />
        <WatchesOrderingSteps />
        <WatchesOrderFlow />
        <WatchesFreeDeliveryStrip />
        <WatchesReviews />
        <WatchesFAQ />
      </main>
      <WatchesFooter />
      <WatchesStickyCTA />
      <WatchesScrollToTopButton />
    </WatchesPageProvider>
  );
}
