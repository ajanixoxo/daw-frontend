"use client";

import { FC, useEffect, useState } from "react";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";
import SellerSignupStep1 from "./steps/SellerSignupStep1";
import SellerSignupStep2 from "./steps/SellerSignupStep2";

const SellersSignup: FC = () => {
  const { currentStep } = useSellerSignupStore();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const steps = [
    { id: 1, label: "Shop Info" },
    { id: 2, label: "Documents Upload" },
  ];

  return (
    <div className="w-full max-w-[550px]">
      {/* Stepper */}
      <div className="flex items-center gap-4 mb-12">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep === step.id
                    ? "bg-brand-pink text-white"
                    : "bg-[#E5E5E5] text-[#6b6b6b]"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  currentStep === step.id ? "text-[#1a1a1a]" : "text-[#b6b8c0]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-4 h-px bg-[#E5E5E5] flex-1 min-w-[40px]" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="w-full">
        {currentStep === 1 && <SellerSignupStep1 />}
        {currentStep === 2 && <SellerSignupStep2 />}
      </div>
    </div>
  );
};

export default SellersSignup;
