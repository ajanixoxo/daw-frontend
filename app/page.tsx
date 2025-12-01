import CTASection from "@/components/landing-page/cooperatives/CTASection";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { CooperativePlatform } from "@/components/landing-page/home/cooperative-platform";
import Hero from "@/components/landing-page/home/Hero";
import { LearnGrowCourses } from "@/components/landing-page/home/learn-grow-courses";
import { MarketplaceProducts } from "@/components/landing-page/home/marketplace-courses";
import { MembershipPricing } from "@/components/landing-page/home/membership-pricing";
import { Testimonials } from "@/components/landing-page/home/testimonials";
import { WhyDAW } from "@/components/landing-page/home/why-daw";
import { HeroSection } from "@/components/landing-page/home/signed-in-hero";
export default function Home() {
  return (
    <div>
      <HeroSection/>
      <Hero />
      <CooperativePlatform />
      <WhyDAW />
      <MembershipPricing />
      <Testimonials />
      <MarketplaceProducts />
      <LearnGrowCourses />
      <CTASection />
      <Footer />
    </div>
  );
}
