import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyOrderCTA } from "@/components/shared/StickyOrderCTA";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { ProductHero } from "@/components/sections/ProductHero";
import { ComparisonSlider } from "@/components/sections/ComparisonSlider";
import { OrderSection } from "@/components/sections/OrderSection";
import { Features } from "@/components/sections/Features";
import { HowToUse } from "@/components/sections/HowToUse";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-28 lg:pb-0">
        <ProductHero />
        <ComparisonSlider />
        <OrderSection />
        <Features />
        <HowToUse />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
      <StickyOrderCTA />
      <ScrollToTopButton />
    </>
  );
}
