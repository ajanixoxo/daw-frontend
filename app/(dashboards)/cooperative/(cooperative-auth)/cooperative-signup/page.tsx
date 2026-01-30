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

export default function CooperativeSignupPage() {
  const { currentStep, setPreloadedPersonalInfo, setHasSellerDocuments, setDAWCooperative } =
    useCooperativeSignupStore();
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useProfile();

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
