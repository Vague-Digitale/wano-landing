import { SiteHeader } from "@/components/v2/SiteHeader";
import { HeroSection } from "@/components/v2/HeroSection";
import { ForWhoSection } from "@/components/v2/ForWhoSection";
import { HowItWorksSection } from "@/components/v2/HowItWorksSection";
import { StatsSection } from "@/components/v2/StatsSection";
import { TestimonialsSection } from "@/components/v2/TestimonialsSection";
import { PricingSection } from "@/components/v2/PricingSection";
import { RoadmapSection } from "@/components/v2/RoadmapSection";
import { FinalCTASection } from "@/components/v2/FinalCTASection";
import { SiteFooter } from "@/components/v2/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ForWhoSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <RoadmapSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
