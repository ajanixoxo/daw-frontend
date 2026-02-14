"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";
import { useAuthStore } from "@/zustand/store";
import { Check } from "lucide-react";
import SellerSignupStep0 from "./steps/SellerSignupStep0";
import SellerSignupStep1 from "./steps/SellerSignupStep1";
import SellerSignupStep2 from "./steps/SellerSignupStep2";

const SellersSignup: FC = () => {
  const { currentStep } = useSellerSignupStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to keep the active step visible
  useEffect(() => {
    if (activeStepRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeStepRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [currentStep]);

  if (!mounted) return null;

  const steps = isAuthenticated
    ? [
        { id: 1, label: "Shop Info" },
        { id: 2, label: "Documents Upload" },
      ]
    : [
        { id: 0, label: "Personal Info" },
        { id: 1, label: "Shop Info" },
        { id: 2, label: "Documents Upload" },
      ];

  return (
    <div className="w-full max-w-[550px]">

      {/* Stepper */}
      <div
        ref={scrollRef}
        className="mb-12 overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-center text-sm font-medium min-w-max px-1 py-1">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={step.id === currentStep ? activeStepRef : undefined}
              className="flex items-center shrink-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors shrink-0 ${
                    currentStep === step.id
                      ? "bg-brand-pink text-white"
                      : currentStep > step.id
                        ? "bg-brand-pink text-white"
                        : "bg-[#E5E5E5] text-[#6b6b6b]"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    currentStep >= step.id ? "text-[#1a1a1a]" : "text-[#b6b8c0]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-3 h-px w-10 shrink-0 transition-colors ${
                    currentStep > step.id ? "bg-brand-pink" : "bg-[#E5E5E5]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="w-full">
        {currentStep === 0 && !isAuthenticated && <SellerSignupStep0 />}
        {currentStep === 1 && <SellerSignupStep1 />}
        {currentStep === 2 && <SellerSignupStep2 />}
      </div>
    </div>
  );
};

export default SellersSignup;
