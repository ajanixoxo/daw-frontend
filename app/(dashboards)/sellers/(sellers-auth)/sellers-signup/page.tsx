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

  const isAlreadySeller = isAuthenticated && user?.roles?.includes("seller");
  const isMember = isAuthenticated && user?.roles?.includes("member");

  useEffect(() => {
    setIsDAWModalOpen(true);
    if (!isAuthenticated) {
      // Guest — start at step 0 (Personal Info)
      setStep(0);
    }
  }, [isAuthenticated, setStep]);

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

  // Block access for users who are already sellers
  if (isAlreadySeller) {
    const isBoth = isAlreadySeller && isMember;
    return (
      <div className="flex w-full flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="rounded-2xl shadow-2xl overflow-hidden bg-white">
            {/* Header */}
            <div style={{ backgroundColor: "#f10e7c" }} className="px-8 py-10 text-white">
              <h2 className="text-3xl font-bold mb-3 text-center">
                {isBoth ? "You're All Set!" : "You're Already a Seller!"}
              </h2>
              <p className="text-lg opacity-95 text-center">
                {isBoth
                  ? "Your account already has a seller profile, a shop, and is a member of the DAW Cooperative."
                  : "Your account already has a seller profile and shop. Join the DAW cooperative to unlock even more benefits."}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white px-8 py-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Exclusive member-only deals</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Early access to new features</span>
                </li>
                {!isBoth && (
                  <li className="flex items-start">
                    <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                    <span className="text-gray-700">Priority customer support</span>
                  </li>
                )}
              </ul>

              {/* Navigation Buttons */}
              <div className="flex flex-col gap-3">
                {!isBoth && (
                  <button
                    onClick={() => router.push("/cooperative/cooperative-signup")}
                    style={{ backgroundColor: "#f10e7c" }}
                    className="w-full text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
                  >
                    Join DAW Cooperative
                  </button>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push("/sellers/dashboard")}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center"
                  >
                    My Dashboard
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center"
                  >
                    Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <DAWModal
          isOpen={isDAWModalOpen}
          onClose={handleModalClose}
          dismissLabel="Maybe Later"
          isAlreadySeller={!!isAlreadySeller}
        />
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
