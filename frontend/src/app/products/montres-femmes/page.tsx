import type { Metadata } from "next";
import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesHeader } from "@/components/montres-femmes/WatchesHeader";
import { WatchesFreeDeliveryStrip } from "@/components/montres-femmes/WatchesFreeDelivery";
import { WatchesOrderFlow } from "@/components/montres-femmes/WatchesOrderFlow";
import { WatchesProofSection } from "@/components/montres-femmes/WatchesProofSection";
import { WatchesReviews } from "@/components/montres-femmes/WatchesReviews";
import { WatchesBenefits } from "@/components/montres-femmes/WatchesBenefits";
import { WatchesTrust } from "@/components/montres-femmes/WatchesTrust";
import { WatchesOrderingSteps } from "@/components/montres-femmes/WatchesOrderingSteps";
import { WatchesFAQ } from "@/components/montres-femmes/WatchesFAQ";
import { WatchesStickyCTA } from "@/components/montres-femmes/WatchesStickyCTA";
import { WatchesScrollToTopButton } from "@/components/montres-femmes/WatchesScrollToTopButton";
import { WatchesFooter } from "@/components/montres-femmes/WatchesFooter";
import { WatchesFaceBackdrop } from "@/components/montres-femmes/WatchesFaceBackdrop";

export const metadata: Metadata = {
  title: { absolute: "Montres Femmes Élégantes — 260 DH | SHAMANGARO" },
  description:
    "ساعات نسائية أنيقة — 260 DH، توصيل مجاني، الدفع عند الإستلام، كاين التبديل.",
  keywords: [
    "SHAMANGARO",
    "Montres Femmes",
    "ساعات نسائية المغرب",
    "ساعات نسائية 260 درهم",
  ],
  openGraph: {
    title: "Montres Femmes Élégantes — 260 DH",
    description:
      "ساعات نسائية أنيقة — توصيل مجاني · الدفع عند الإستلام · كاين التبديل",
    locale: "ar_MA",
    siteName: "SHAMANGARO Montres Femmes",
    images: [{ url: "/images/montres-femmes/hero.png", width: 800, height: 1000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Montres Femmes Élégantes — 260 DH",
    description:
      "ساعات نسائية أنيقة — توصيل مجاني · الدفع عند الإستلام · كاين التبديل",
  },
};

export default function MontresFemmesPage() {
  return (
    <WatchesPageProvider>
      <div className="relative bg-[#FAF7F2]">
        <WatchesFaceBackdrop />
        <div className="relative z-10">
          <WatchesHeader />
          <main>
            <WatchesOrderFlow />
            <WatchesProofSection />
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
        </div>
      </div>
    </WatchesPageProvider>
  );
}
