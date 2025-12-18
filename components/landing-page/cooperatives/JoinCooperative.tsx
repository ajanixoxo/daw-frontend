"use client";

import React, { useEffect, useState } from "react";
import PromoSection from "@/components/auth/PromoSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { useCooperative } from "@/hooks/useCooperative";
import { Loader2 } from "lucide-react";
import { useCooperative } from "@/hooks/useJoinCooperative";

const COOPERATIVE_ID = "6940311dd9b9141819c58938"; // ✅ REAL cooperativeId

const JoinCooperative = () => {
  const {
    cooperative,
    loadCooperativeById,
    isLoadingCooperative,
    join,
    isJoining,
    joinError,
    joinSuccess,
  } = useCooperative();

  const [step, setStep] = useState<1 | 2>(1);

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    country: "",
    category: "",
    userId: "", // 🔜 later from profile
    cooperativeId: COOPERATIVE_ID,
    subscriptionTierId: "",
  });

  /* 🔹 FETCH COOPERATIVE DATA */
  useEffect(() => {
    loadCooperativeById(COOPERATIVE_ID);
  }, []);

  /* 🔹 FORM HANDLERS */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleTierSelect = (tierId: string) => {
    setFormDetails((prev) => ({
      ...prev,
      subscriptionTierId: tierId,
    }));
  };

  const handleFinalSubmit = async () => {
    await join(formDetails);
  };

  return (
    <div className="mt-24 mb-12 flex flex-col md:flex-row gap-12 mx-6 md:mx-24 items-start">
      {/* LEFT SECTION */}
      <div className="md:flex-1">
        <h1 className="text-[32px] sm:text-[40px] lg:text-[52px] font-medium leading-[120%]">
          Join {cooperative?.name || "Cooperative"}
        </h1>

        <p className="mt-4 text-gray-600">{cooperative?.description}</p>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <form
            onSubmit={handleContinue}
            className="bg-white rounded-3xl border p-6 mt-8 space-y-6"
          >
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
              <Input
                name="businessName"
                placeholder="Business Name"
                onChange={handleChange}
              />
              <Input
                name="country"
                placeholder="Country"
                onChange={handleChange}
              />
              <Input
                name="category"
                placeholder="Business Category"
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border p-6 mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Select Subscription Tier</h3>

            {/* LOADING */}
            {isLoadingCooperative && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[#F10E7C]" />
              </div>
            )}

            {/* TIERS */}
            <div className="space-y-4">
              {cooperative?.subscriptionTiers?.map((tier) => {
                const isSelected = formDetails.subscriptionTierId === tier._id;

                return (
                  <div
                    key={tier._id}
                    onClick={() => handleTierSelect(tier._id)}
                    className={`cursor-pointer rounded-xl border p-5 transition ${
                      isSelected
                        ? "border-[#F10E7C] bg-pink-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{tier.name}</p>
                      <p className="font-medium text-[#F10E7C]">
                        ₹{tier.monthlyContribution}/month
                      </p>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <p>
                        Marketplace Discount:{" "}
                        <strong>
                          {tier.benefits?.marketplaceDiscount || 0}%
                        </strong>
                      </p>
                      <p>Max Loan: ₹{tier.loanSettings?.maxAmount}</p>
                      <p>Interest Rate: {tier.loanSettings?.interestRate}%</p>
                      <p>
                        Max Duration: {tier.loanSettings?.maxDurationMonths}{" "}
                        months
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SUMMARY */}
            {formDetails.subscriptionTierId && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {formDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {formDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formDetails.phone}
                </p>
                <p>
                  <strong>Selected Tier:</strong>{" "}
                  {
                    cooperative?.subscriptionTiers.find(
                      (t) => t._id === formDetails.subscriptionTierId
                    )?.name
                  }
                </p>
              </div>
            )}

            {/* ERROR */}
            {joinError && <p className="text-sm text-red-500">{joinError}</p>}

            {/* SUCCESS */}
            {joinSuccess && (
              <p className="text-sm text-green-600">
                Successfully joined the cooperative 🎉
              </p>
            )}

            {/* SUBMIT */}
            <Button
              className="w-full"
              disabled={!formDetails.subscriptionTierId || isJoining}
              onClick={handleFinalSubmit}
            >
              {isJoining ? "Joining Cooperative..." : "Join DAW Cooperative"}
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="md:flex-1 w-full">
        <PromoSection />
      </div>
    </div>
  );
};

export default JoinCooperative;
