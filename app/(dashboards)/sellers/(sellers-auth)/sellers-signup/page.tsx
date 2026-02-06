"use client";
import SellersSignup from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup";
import SellersSignupPromo from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup-promo";
import Image from "next/image";
import Link from "next/link";
import DAWModal from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/modal/join-daw-modal";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/store";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";

export default function SellersSignupPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setStep = useSellerSignupStore((s) => s.setStep);
  const [isDAWModalOpen, setIsDAWModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsDAWModalOpen(true);
    } else {
      // Start at step 0 (Personal Info) for unauthenticated users
      setStep(0);
    }
  }, [isAuthenticated, setStep]);

  // Clean up guest-init flag on unmount
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("seller-signup-guest-init");
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12 overflow-y-auto">
        {isAuthenticated && (
          <DAWModal
            isOpen={isDAWModalOpen}
            onClose={() => setIsDAWModalOpen(false)}
          />
        )}
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
      </div>

      {/* Right Section - Promo */}
      <div className="flex-1 hidden lg:flex p-4">
        <SellersSignupPromo />
      </div>
    </div>
  );
}
