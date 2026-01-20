"use client";

import CTASection from "@/components/landing-page/cooperatives/CTASection";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { CooperativePlatform } from "@/components/landing-page/home/cooperative-platform";
import Hero from "@/components/landing-page/home/Hero";
import { LearnGrowCourses } from "@/components/landing-page/home/learn-grow-courses";
import { MarketplaceProducts } from "@/components/landing-page/home/marketplace-courses";
import { MembershipPricing } from "@/components/landing-page/home/membership-pricing";
import { Testimonials } from "@/components/landing-page/home/testimonials";

import { HeroSection } from "@/components/landing-page/home/signed-in-hero";
import { PopularProducts } from "@/components/landing-page/home/popular-products";
import { useAuthSync } from "@/hooks/useAuthSync";
import { BecomeASellerBanner } from "@/components/landing-page/home/become-a-seller-banner";
import WhyDAWSection from "@/components/landing-page/home/why-daw";

export default function Home() {
  // This hook automatically syncs auth state between client and server
  const { isAuthenticated, isVerified, isLoading } = useAuthSync();

  console.log("Home Page Auth Status:", {
    isAuthenticated,
    isVerified,
    isLoading,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F10E7C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated && isVerified && (
        <>
          <HeroSection />
          <PopularProducts />
        </>
      )}
      {!isAuthenticated && <Hero />}
      <CooperativePlatform />
      <WhyDAWSection />
      {/* <MembershipPricing /> */}
      <Testimonials />
      <MarketplaceProducts />
      {isAuthenticated && isVerified && <BecomeASellerBanner />}
      <LearnGrowCourses />
      <CTASection />
      <Footer />
    </div>
  );
}
