"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { CooperativeSignupStepper } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-stepper";
import { CooperativeSignupStep1 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-1";
import { CooperativeSignupStep2 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-2";
import { CooperativeSignupStep3 } from "@/components/(dashboards)/cooperative-dashboard/cooperative-auth/cooperative-signup-step-3";
import { useEffect, useState } from "react";

export default function CooperativeSignupPage() {
  const { currentStep } = useCooperativeSignupStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-[600px]">
        <CooperativeSignupStepper currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 1 && <CooperativeSignupStep1 />}
          {currentStep === 2 && <CooperativeSignupStep2 />}
          {currentStep === 3 && <CooperativeSignupStep3 />}
        </div>
      </div>
    </div>
  );
}
