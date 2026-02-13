"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { CooperativeSignupStepper } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-stepper";
import { CooperativeSignupStep1 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-1";
import { CooperativeSignupStep2 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-2";
import { CooperativeSignupStep3 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-3";
import { CooperativeSignupStepShop } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-shop";
import { CooperativeSignupStepDocs } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-docs";
import { useProfile } from "@/hooks/useProfile";
import { getSellerDocumentsMe } from "@/app/actions/profile";
import { fetchDAWCooperative } from "@/app/actions/coop";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/store";
import { useRouter } from "next/navigation";

export default function CooperativeSignupPage() {
  const router = useRouter();
  const { currentStep, setPreloadedPersonalInfo, setHasSellerDocuments, setDAWCooperative } =
    useCooperativeSignupStore();
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useProfile();

  // Check if user is already a cooperative member
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAlreadyMember = isAuthenticated && user?.roles?.includes("member");

  const isBuyerOrGuestFlow =
    !profile ||
    (profile && (!profile.shop || (Array.isArray(profile.shop) && profile.shop.length === 0)));
  const totalSteps = isBuyerOrGuestFlow ? 5 : 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchDAWCooperative().then((res) => {
      if (res.success && res.data?.cooperative && res.data?.tiers?.length) {
        setDAWCooperative(res.data.cooperative._id, res.data.tiers);
      }
    });
  }, [mounted, setDAWCooperative]);

  useEffect(() => {
    if (!mounted || !profile) return;
    setPreloadedPersonalInfo({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      shop: profile.shop,
    });
    getSellerDocumentsMe().then((res) => {
      if (res.success && res.data?.hasDocuments) {
        setHasSellerDocuments(true);
      }
    });
  }, [mounted, profile, setPreloadedPersonalInfo, setHasSellerDocuments]);

  if (!mounted) {
    return null;
  }

  // Block access for users who are already cooperative members
  if (isAlreadyMember) {
    return (
      <div className="flex w-full flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <div className="rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div style={{ backgroundColor: "#f10e7c" }} className="px-8 py-10 text-white">
              <h2 className="text-3xl font-bold mb-3">
                You&apos;re Already a Member!
              </h2>
              <p className="text-lg opacity-95">
                Your account is already a member of the DAW Cooperative. You have full access to all cooperative features and benefits.
              </p>
            </div>

            {/* Content */}
            <div className="bg-white px-8 py-8">
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Contribution tracking</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">Loan access</span>
                </li>
                <li className="flex items-start">
                  <span style={{ color: "#f10e7c" }} className="mr-3 text-xl font-bold">✓</span>
                  <span className="text-gray-700">DAW Member shop badge</span>
                </li>
              </ul>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/sellers/dashboard")}
                  style={{ backgroundColor: "#f10e7c" }}
                  className="flex-1 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  My Dashboard
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-[600px]">
        <CooperativeSignupStepper currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mt-8">
          {isBuyerOrGuestFlow ? (
            <div>
              {currentStep === 1 && <CooperativeSignupStep1 />}
              {currentStep === 2 && <CooperativeSignupStepShop />}
              {currentStep === 3 && <CooperativeSignupStepDocs />}
              {currentStep === 4 && <CooperativeSignupStep2 />}
              {currentStep === 5 && <CooperativeSignupStep3 />}
            </div>
          ) : (
            <>
              {currentStep === 1 && <CooperativeSignupStep1 />}
              {currentStep === 2 && <CooperativeSignupStep2 />}
              {currentStep === 3 && <CooperativeSignupStep3 />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
