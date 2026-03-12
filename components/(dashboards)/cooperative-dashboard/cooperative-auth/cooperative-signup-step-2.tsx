"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { CheckCircle2, Check } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

export function CooperativeSignupStep2() {
  const { currentStep, formData, setMembershipTier, setStep } =
    useCooperativeSignupStore();
  const { membershipTier, personalInfo } = formData;
  const { data: profile } = useProfile();

  const userCountry = profile?.country || personalInfo?.country || "";
  const isNigeria =
    userCountry.toLowerCase() === "nigeria" ||
    userCountry.toUpperCase() === "NG" ||
    userCountry.toUpperCase() === "NGA";

  const tiers = isNigeria
    ? [
        {
          id: 1,
          name: "Basic Tier",
          price: "up to ₦1M",
          features: [
            "Quick Cash ₦20K",
            "Gasoline ₦150K",
            "School Fees ₦600K",
            "Equipment ₦1M",
          ],
        },
        {
          id: 2,
          name: "Standard Tier",
          price: "up to ₦5M",
          features: ["Business Expansion ₦3M", "Inventory ₦2M"],
        },
        {
          id: 3,
          name: "Premium Tier",
          price: "up to ₦10M",
          features: ["Major Equipment ₦10M"],
        },
      ]
    : [
        {
          id: 1,
          name: "Basic Tier",
          price: "up to $2,000",
          features: [
            "Quick Cash $40",
            "Gasoline $300",
            "School Fees $1,200",
            "Equipment $2,000",
          ],
        },
        {
          id: 2,
          name: "Standard Tier",
          price: "up to $6,000",
          features: ["Business Expansion $3,600", "Inventory $2,400"],
        },
        {
          id: 3,
          name: "Premium Tier",
          price: "up to $10,000",
          features: ["Major Equipment $10k"],
        },
      ];

  const handleNext = () => {
    if (membershipTier) setStep(currentStep + 1);
  };

  const handleBack = () => setStep(currentStep - 1);

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">
          Select Your Membership Tier
        </h1>
        <p className="text-sm text-gray-500">
          Fill out this application to join our cooperative community
        </p>
      </div>

      <div className="space-y-4">
        {tiers.map((tier) => {
          const isSelected = membershipTier === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setMembershipTier(tier.id)}
              className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                isSelected
                  ? "border-[#F10E7C] bg-pink-50/10 ring-1 ring-[#F10E7C]"
                  : "border-gray-100 bg-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="text-xl font-bold text-[#F10E7C]">
                    {tier.price}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="h-6 w-6 text-[#F10E7C]" />
                )}
              </div>

              <div className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#F10E7C]">
                      <Check className="h-3 w-3 text-[#F10E7C]" />
                    </div>
                    <span className="text-sm text-[#222]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-8">
        <button
          onClick={handleBack}
          className="w-full rounded-full border border-gray-100 bg-gray-50 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!membershipTier}
          className="w-full rounded-full bg-[#F10E7C] py-3 text-sm font-medium text-white transition-colors hover:bg-[#d00c6b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
