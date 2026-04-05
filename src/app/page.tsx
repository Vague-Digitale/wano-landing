import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import BusinessTypesSection from "@/components/BusinessTypesSection";
import MultiDeviceSection from "@/components/MultiDeviceSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <BusinessTypesSection />
        <MultiDeviceSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
