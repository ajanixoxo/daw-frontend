"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  /** 5 for buyer/guest (Personal, Shop, Docs, Membership, Finish); 3 for seller (Personal, Membership, Finish) */
  totalSteps: number;
}

const FIVE_STEP_LABELS = [
  "Personal Info",
  "Shop Info",
  "KYC & Documents",
  "Membership",
  "Finish",
];

const THREE_STEP_LABELS = ["Personal Info", "Membership Tier", "Finish"];

export function CooperativeSignupStepper({ currentStep, totalSteps }: StepperProps) {
  const labels = totalSteps === 5 ? FIVE_STEP_LABELS : THREE_STEP_LABELS;
  const steps = labels.map((label, i) => ({ id: i + 1, label }));
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to keep the active step visible
  useEffect(() => {
    if (activeStepRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeStepRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <div
      ref={scrollRef}
      className="mb-8 overflow-x-auto scrollbar-hide"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex items-center text-sm font-medium text-gray-500 min-w-max px-1 py-1">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={step.id === currentStep ? activeStepRef : undefined}
            className="flex items-center shrink-0"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors shrink-0",
                  currentStep >= step.id
                    ? "bg-[#F10E7C] text-white"
                    : "bg-gray-200 text-gray-400"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "whitespace-nowrap",
                  currentStep >= step.id ? "text-[#222]" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-px w-10 shrink-0 transition-colors",
                  currentStep > step.id ? "bg-[#F10E7C]" : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
