"use client";

import React, { useEffect, useState } from "react";
import PromoSection from "@/components/auth/PromoSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useCooperative } from "@/hooks/useJoinCooperative";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { getDawCooperativeId } from "@/app/actions/coop";

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

  const { data: user, isLoading: isProfileLoading } = useProfile();
  console.log("user", user);
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [cooperativeId, setCooperativeId] = useState<string>("");

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    country: "",
    category: "",
    userId: "",
    cooperativeId: "",
    subscriptionTierId: "",
  });

  useEffect(() => {
    const loadCoopId = async () => {
      const id = await getDawCooperativeId();
      if (id) {
        setCooperativeId(id);
        setFormDetails((prev) => ({ ...prev, cooperativeId: id }));
        loadCooperativeById(id);
      }
    };
    loadCoopId();
  }, []);

  useEffect(() => {
    if (user) {
      setFormDetails((prev) => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || "",
        userId: user._id,
      }));
    }
  }, [user]);

  const isSeller = user?.roles?.includes("seller");

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
    // console.log("lets join");
    await join(formDetails);
  };

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#F10E7C]" />
      </div>
    );
  }

  /* ================= BLOCK NON-SELLERS ================= */
  if (!isSeller) {
    return (
      <div className="mt-32 flex justify-center px-6">
        <div className="max-w-xl w-full bg-white border rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Seller Account Required
          </h2>

          <p className="text-gray-600">
            Only users registered as <strong>sellers</strong> can join a
            cooperative.
          </p>

          <p className="text-sm text-gray-500">
            Please complete seller onboarding before joining a cooperative.
          </p>

          <Button
            className="mt-4 w-full"
            onClick={() => router.push("/sellers/sellers-signup")}
          >
            Create or Verify Your seller account
          </Button>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="mt-24 mb-12 flex flex-col md:flex-row gap-12 mx-6 md:mx-24 items-start">
      {/* LEFT */}
      <div className="md:flex-1">
        <h1 className="text-[32px] sm:text-[40px] lg:text-[52px] font-medium leading-[120%]">
          Join {cooperative?.name || "Cooperative"}
        </h1>

        <p className="mt-4 text-gray-600">{cooperative?.description}</p>

        {/* ============ STEP 1 ============ */}
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
                value={formDetails.name}
                disabled
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formDetails.email}
                disabled
              />
              <Input
                name="phone"
                placeholder="Phone"
                value={formDetails.phone}
                disabled
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

        {/* ============ STEP 2 ============ */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border p-6 mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Select Subscription Tier</h3>

            {isLoadingCooperative && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[#F10E7C]" />
              </div>
            )}

            <div className="space-y-3">
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
                  </div>
                );
              })}
            </div>

            {joinError && <p className="text-sm text-red-500">{joinError}</p>}

            {joinSuccess && (
              <p className="text-sm text-green-600">
                Successfully joined the cooperative 🎉
              </p>
            )}

            <Button
              className="w-full"
              disabled={!formDetails.subscriptionTierId || isJoining}
              onClick={handleFinalSubmit}
            >
              {isJoining ? "Joining..." : "Join Cooperative"}
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="md:flex-1 w-full">
        <PromoSection />
      </div>
    </div>
  );
};

export default JoinCooperative;
