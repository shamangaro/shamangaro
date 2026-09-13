import { WatchesPageProvider } from "@/components/montres-femmes/WatchesPageContext";
import { WatchesFaceBackdrop } from "@/components/montres-femmes/WatchesFaceBackdrop";
import { FrWatchesHeader } from "./FrWatchesHeader";
import { FrWatchesFreeDeliveryStrip } from "./FrWatchesFreeDelivery";
import { FrWatchesOrderFlow } from "./FrWatchesOrderFlow";
import { FrWatchesReviews } from "./FrWatchesReviews";
import { FrWatchesBenefits } from "./FrWatchesBenefits";
import { FrWatchesTrust } from "./FrWatchesTrust";
import { FrWatchesOrderingSteps } from "./FrWatchesOrderingSteps";
import { FrWatchesFAQ } from "./FrWatchesFAQ";
import { FrWatchesStickyCTA } from "./FrWatchesStickyCTA";
import { FrWatchesScrollToTopButton } from "./FrWatchesScrollToTopButton";
import { FrWatchesFooter } from "./FrWatchesFooter";

export function FrWatchesLanding() {
  return (
    <WatchesPageProvider>
      <div lang="fr" dir="ltr" className="relative bg-[#FAF7F2]">
        <WatchesFaceBackdrop />
        <div className="relative z-10">
          <FrWatchesHeader />
          <main>
            <FrWatchesOrderFlow />
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
