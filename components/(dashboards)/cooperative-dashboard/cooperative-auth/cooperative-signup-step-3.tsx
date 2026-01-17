"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import Link from "next/link";
import { useState } from "react";

export function CooperativeSignupStep3() {
  const { formData, setStep } = useCooperativeSignupStore();
  const { personalInfo, membershipTier } = formData;
  const [agreed, setAgreed] = useState(false);

  const handleBack = () => {
    setStep(2);
  };

  const handleComplete = () => {
    if (agreed) {
      // Handle submission logic
      console.log("Submitting:", formData);
    }
  };

  const tiers = {
    1: "$25,000",
    2: "$30,000",
    3: "$50,000",
  };

  const tierPrice = membershipTier
    ? tiers[membershipTier as keyof typeof tiers]
    : "";

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">
          Complete Your Registration
        </h1>
      </div>

      <div className="mb-8 space-y-6 rounded-2xl bg-gray-50/50 p-6">
        <h3 className="text-lg font-medium text-[#222]">
          Registration Summary
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[#222]">Name</p>
            <p className="text-sm text-gray-600">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Email Address:</p>
            <p className="text-sm text-gray-600 truncate">
              {personalInfo.email}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Phone:</p>
            <p className="text-sm text-gray-600">{personalInfo.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Business Name:</p>
            <p className="text-sm text-gray-600">{personalInfo.businessName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Country:</p>
            <p className="text-sm text-gray-600">{personalInfo.country}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Membership Tier:</p>
            <p className="text-sm text-gray-600">
              Tier {membershipTier}: {tierPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-pink-50 p-4">
        <h4 className="mb-2 text-sm font-medium text-[#222]">
          Payment Information
        </h4>
        <p className="text-xs text-gray-600">
          After completing registration, you'll be redirected to make your first
          contribution payment through our secure payment platform
        </p>
      </div>

      <div className="mb-8 flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-[#F10E7C] focus:ring-[#F10E7C]"
        />
        <label htmlFor="terms" className="text-xs text-gray-600">
          By continuing, you agree to the{" "}
          <Link href="#" className="font-medium text-[#F10E7C] underline">
            Terms & Conditions
          </Link>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="w-full rounded-full border border-gray-100 bg-gray-50 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={!agreed}
          className="w-full rounded-full bg-[#F10E7C] py-3 text-sm font-medium text-white transition-colors hover:bg-[#d00c6b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Application
        </button>
      </div>
    </div>
  );
}
