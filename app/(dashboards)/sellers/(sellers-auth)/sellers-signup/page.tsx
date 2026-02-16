"use client";
import SellersSignup from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup";
import SellersSignupPromo from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup-promo";
import Image from "next/image";
import Link from "next/link";
import DAWModal from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/modal/join-daw-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/store";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";

export default function SellersSignupPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const setStep = useSellerSignupStore((s) => s.setStep);
  const [isDAWModalOpen, setIsDAWModalOpen] = useState(false);

  // Check role only — if they have "seller" in their roles, they're already a seller
  const isAlreadySeller = isAuthenticated && user?.roles?.includes("seller");

  useEffect(() => {
    if (isAlreadySeller) {
      // Already a seller — show DAW modal only (for cooperative join)
      setIsDAWModalOpen(true);
    } else if (isAuthenticated) {
      // Authenticated but not a seller yet — show DAW modal, then allow onboarding
      setIsDAWModalOpen(true);
    } else {
      // Guest — start at step 0 (Personal Info)
      setStep(0);
    }
  }, [isAuthenticated, isAlreadySeller, setStep]);

  // Clean up guest-init flag on unmount
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("seller-signup-guest-init");
    };
  }, []);

  const handleModalClose = () => {
    // Not a seller yet — dismiss modal and show the onboarding form
    setIsDAWModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12 overflow-y-auto">
        {isAuthenticated && (
          <DAWModal
            isOpen={isDAWModalOpen}
            onClose={handleModalClose}
            dismissLabel="Maybe Later"
            isAlreadySeller={!!isAlreadySeller}
          />
        )}
        {/* Only show the signup form if user is NOT already a seller */}
        {!isAlreadySeller && (
          <div className="w-full max-w-[500px] flex flex-col gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-full.png"
                alt="DAW Logo"
                width={120}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>

            {/* Form Component */}
            <SellersSignup />
          </div>
        )}
      </div>

      {/* Right Section - Promo */}
      <div className="flex-1 hidden lg:flex p-4">
        <SellersSignupPromo />
      </div>
    </div>
  );
}
