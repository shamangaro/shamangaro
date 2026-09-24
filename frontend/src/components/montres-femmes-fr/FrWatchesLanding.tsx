import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesFaceBackdrop } from "@/components/montres-femmes/WatchesFaceBackdrop";
import { FrWatchesHeader } from "./FrWatchesHeader";
import { FrWatchesFreeDeliveryStrip } from "./FrWatchesFreeDelivery";
import { FrWatchesOrderFlow } from "./FrWatchesOrderFlow";
import { WatchesProofSection } from "@/components/montres-femmes/WatchesProofSection";
import { FrWatchesReviews } from "./FrWatchesReviews";
import { FrWatchesBenefits } from "./FrWatchesBenefits";
import { FrWatchesTrust } from "./FrWatchesTrust";
import { FrWatchesOrderingSteps } from "./FrWatchesOrderingSteps";
import { FrWatchesFAQ } from "./FrWatchesFAQ";
import { FrWatchesStickyCTA } from "./FrWatchesStickyCTA";
import { FrWatchesScrollToTopButton } from "./FrWatchesScrollToTopButton";
import { FrWatchesFooter } from "./FrWatchesFooter";
import { WatchesHeroPhoto } from "@/components/montres-femmes/WatchesHeroPhoto";
import {
  DEFAULT_WATCH_VARIANT,
  WATCH_VARIANTS,
} from "@/components/montres-femmes/config";
import { FR_VARIANT_LABELS } from "./copy";

export function FrWatchesLanding() {
  return (
    <WatchesPageProvider>
      <div lang="fr" dir="ltr" className="relative bg-[#FAF7F2]">
        <WatchesFaceBackdrop />
        <div className="relative z-10">
          <FrWatchesHeader />
          <main>
            <FrWatchesOrderFlow
              lcpHero={
                <WatchesHeroPhoto
                  variantId={DEFAULT_WATCH_VARIANT}
                  src={WATCH_VARIANTS[0].image}
                  alt={FR_VARIANT_LABELS[DEFAULT_WATCH_VARIANT]}
                />
              }
            />
            <WatchesProofSection lang="fr" />
            <FrWatchesTrust />
            <FrWatchesBenefits />
            <FrWatchesFreeDeliveryStrip />
            <FrWatchesOrderingSteps />
            <FrWatchesFreeDeliveryStrip />
            <FrWatchesReviews />
            <FrWatchesFAQ />
            <FrWatchesFooter />
          </main>
          <FrWatchesStickyCTA />
          <FrWatchesScrollToTopButton />
        </div>
      </div>
    </WatchesPageProvider>
  );
}
