import type { Metadata } from "next";
import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesTrustBar } from "@/components/montres-femmes/WatchesTrustBar";
import { WatchesHeader } from "@/components/montres-femmes/WatchesHeader";
import { WatchesHero } from "@/components/montres-femmes/WatchesHero";
import { WatchesModelSelector } from "@/components/montres-femmes/WatchesModelSelector";
import { WatchesQuantitySelector } from "@/components/montres-femmes/WatchesQuantitySelector";
import { WatchesOrderSummary } from "@/components/montres-femmes/WatchesOrderSummary";
import { WatchesBenefits } from "@/components/montres-femmes/WatchesBenefits";
import { WatchesGallery } from "@/components/montres-femmes/WatchesGallery";
import { WatchesGiftPackaging } from "@/components/montres-femmes/WatchesGiftPackaging";
import { WatchesTrust } from "@/components/montres-femmes/WatchesTrust";
import { WatchesOrderingSteps } from "@/components/montres-femmes/WatchesOrderingSteps";
import { WatchesFAQ } from "@/components/montres-femmes/WatchesFAQ";
import { WatchesCheckout } from "@/components/montres-femmes/WatchesCheckout";
import { WatchesStickyCTA } from "@/components/montres-femmes/WatchesStickyCTA";
import { WatchesFooter } from "@/components/montres-femmes/WatchesFooter";

export const metadata: Metadata = {
  title: "Montres Femmes Élégantes — 245 DH | SHAMANGARO",
  description:
    "ساعات نسائية أنiقة — 3 ألوان (Taupe، Burgundy، Navy Blue). 245 DH، توصيل مجاني، الدفع عند الاستلام، التبديل متاح.",
  openGraph: {
    title: "Montres Femmes Élégantes — 245 DH",
    description:
      "ساعات نسائية أنiقة — توصيل مجاني · الدفع عند الاستلام · التبديل متاح",
    images: [{ url: "/images/montres-femmes/hero.svg", width: 800, height: 600 }],
  },
};

export default function MontresFemmesPage() {
  return (
    <WatchesPageProvider>
      <WatchesTrustBar />
      <WatchesHeader />
      <main className="pb-24 lg:pb-0">
        <WatchesHero />
        <WatchesModelSelector />
        <WatchesQuantitySelector />
        <WatchesOrderSummary />
        <WatchesBenefits />
        <WatchesGallery />
        <WatchesGiftPackaging />
        <WatchesTrust />
        <WatchesOrderingSteps />
        <WatchesFAQ />
        <WatchesCheckout />
      </main>
      <WatchesFooter />
      <WatchesStickyCTA />
    </WatchesPageProvider>
  );
}
