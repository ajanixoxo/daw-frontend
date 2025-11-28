import AboutSection from "@/components/landing-page/cooperatives/AboutSection";
import CommunityPage from "@/components/landing-page/cooperatives/Community";
import CooperativesOption from "@/components/landing-page/cooperatives/CooperativesOption";
import CTASection from "@/components/landing-page/cooperatives/CTASection";
import Footer from "@/components/landing-page/cooperatives/Footer";
import Hero from "@/components/landing-page/cooperatives/Hero";
import { LoanTierPricing } from "@/components/landing-page/cooperatives/loan-tier";
import Mission from "@/components/landing-page/cooperatives/Mission";
import { OurSDGs } from "@/components/landing-page/cooperatives/sdgs";
import WhyDAWSection from "@/components/landing-page/cooperatives/WhyDAWSection";

export default function Cooperatives() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Mission />
      <OurSDGs />
      <WhyDAWSection />

      <CommunityPage />
      <LoanTierPricing />
      <CooperativesOption />

      <CTASection />
      <Footer />
    </>
  );
}
