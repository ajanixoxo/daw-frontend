import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

export function CooperativeSignupStepper({ currentStep }: StepperProps) {
  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Membership Tier" },
    { id: 3, label: "Finish" },
  ];

  return (
    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
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
                currentStep >= step.id ? "text-[#222]" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="mx-4 h-[1px] w-12 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
