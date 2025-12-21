"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PromoSection from "@/components/auth/PromoSection";
import { useProfile } from "@/hooks/useProfile";
import { useCooperative } from "@/hooks/useJoinCooperative";
import { useTierActions } from "@/hooks/useTier";
import { Tier } from "@/types/tier.types";

type FormValues = {
  monthlyContribution: number;
  marketplaceDiscount?: number;
  maxAmount: number;
  interestRate: number;
  maxDurationMonths: number;
  minPaidMonths: number;
};

const TierForm = () => {
  const { data: user, isLoading } = useProfile();
  const { cooperatives, loadCooperatives, isLoadingCooperatives } =
    useCooperative();

  const {
    tiers,
    fetchAll,
    fetchLoading,
    fetchError,
    create,
    createLoading,
    update,
    updateLoading,
    updateError,
  } = useTierActions();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load cooperatives
  useEffect(() => {
    loadCooperatives();
  }, []);

  // Fetch tiers for admin coop
  useEffect(() => {
    if (user && cooperatives.length > 0) {
      const myCoop = cooperatives.find((c) => c.adminId === user._id);
      if (myCoop) {
        fetchAll(myCoop._id);
      }
    }
  }, [user, cooperatives]);

  if (isLoading || isLoadingCooperatives || fetchLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#F10E7C]" />
      </div>
    );
  }

  const myCoop = cooperatives.find((c) => c.adminId === user?._id);

  if (!myCoop) {
    return (
      <div className="text-center py-20 text-gray-500">
        You are not an admin of any cooperative.
      </div>
    );
  }

  const nextTierName = `Tier ${tiers.length + 1}`;

  // CREATE
  const onCreate = async (data: FormValues) => {
    await create({
      cooperativeId: myCoop._id,
      name: nextTierName,
      monthlyContribution: Number(data.monthlyContribution),
      benefits: {
        marketplaceDiscount: Number(data.marketplaceDiscount || 0),
      },
      loanSettings: {
        maxAmount: Number(data.maxAmount),
        interestRate: Number(data.interestRate),
        maxDurationMonths: Number(data.maxDurationMonths),
        eligibilityCriteria: {
          minPaidMonths: Number(data.minPaidMonths),
        },
      },
    });

    reset();
  };

  // UPDATE
  const onUpdate = async (data: FormValues) => {
    if (!selectedTier) return;
    console.log(data);
    await update({
      id: selectedTier._id,
      cooperativeId: myCoop._id,
      monthlyContribution: Number(data.monthlyContribution),
      benefits: {
        marketplaceDiscount: Number(data.marketplaceDiscount || 0),
      },
      loanSettings: {
        maxAmount: Number(data.maxAmount),
        interestRate: Number(data.interestRate),
        maxDurationMonths: Number(data.maxDurationMonths),
        eligibilityCriteria: {
          minPaidMonths: Number(data.minPaidMonths),
        },
      },
    });

    reset();
    setIsEditMode(false);
    setSelectedTier(null);
  };

  return (
    <div className="flex flex-col md:flex-row mt-24 gap-6">
      {/* LEFT */}
      <div className="flex-1 space-y-6">
        {/* ERROR */}
        {fetchError && (
          <div className="text-center text-red-600">
            Failed to load tiers: {fetchError}
          </div>
        )}

        {/* TIER LIST */}
        {!fetchError && (
          <>
            {tiers.length > 0 ? (
              <Card className="rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">
                    Your Subscription Tiers
                  </h2>

                  {tiers.map((tier) => (
                    <div
                      key={tier._id}
                      onClick={() => {
                        setSelectedTier(tier);
                        setIsEditMode(false);
                      }}
                      className="cursor-pointer border rounded-xl p-4 hover:border-gray-400"
                    >
                      <p className="font-medium">{tier.name}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No available tiers.
              </div>
            )}
          </>
        )}

        {/* TIER DETAILS */}
        {selectedTier && !isEditMode && (
          <Card className="rounded-2xl bg-gray-50">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">
                {selectedTier.name} Details
              </h3>

              <p>Monthly Contribution: ₹{selectedTier.monthlyContribution}</p>
              <p>Interest Rate: {selectedTier.loanSettings.interestRate}%</p>
              <p>Max Loan: ₹{selectedTier.loanSettings.maxAmount}</p>
              <p>
                Duration: {selectedTier.loanSettings.maxDurationMonths} months
              </p>

              <Button
                className="w-full mt-4"
                onClick={() => {
                  setIsEditMode(true);
                  reset({
                    monthlyContribution: selectedTier.monthlyContribution,
                    marketplaceDiscount:
                      selectedTier.benefits?.marketplaceDiscount,
                    maxAmount: selectedTier.loanSettings.maxAmount,
                    interestRate: selectedTier.loanSettings.interestRate,
                    maxDurationMonths:
                      selectedTier.loanSettings.maxDurationMonths,
                    minPaidMonths:
                      selectedTier.loanSettings.eligibilityCriteria
                        .minPaidMonths,
                  });
                }}
              >
                Update Tier
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CREATE / UPDATE FORM */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              {isEditMode && selectedTier
                ? `Update ${selectedTier.name}`
                : `Create ${nextTierName}`}
            </h2>

            <Input
              {...register("monthlyContribution", { required: true })}
              type="number"
              placeholder="Monthly Contribution (₹)"
            />
            <Input
              {...register("marketplaceDiscount")}
              type="number"
              placeholder="Marketplace Discount (%)"
            />
            <Input
              {...register("maxAmount", { required: true })}
              type="number"
              placeholder="Maximum Loan Amount (₹)"
            />
            <Input
              {...register("interestRate", { required: true })}
              type="number"
              placeholder="Interest Rate (%)"
            />
            <Input
              {...register("maxDurationMonths", { required: true })}
              type="number"
              placeholder="Max Duration (Months)"
            />
            <Input
              {...register("minPaidMonths", { required: true })}
              type="number"
              placeholder="Minimum Paid Months"
            />

            {updateError && (
              <div className="text-red-600 text-sm text-center">
                {updateError}
              </div>
            )}

            {isEditMode ? (
              <Button
                className="w-full"
                disabled={updateLoading}
                onClick={handleSubmit(onUpdate)}
              >
                {updateLoading ? "Updating..." : "Save Changes"}
              </Button>
            ) : (
              <Button
                className="w-full"
                disabled={createLoading}
                onClick={handleSubmit(onCreate)}
              >
                {createLoading ? "Creating..." : "Create Tier"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="flex-1">
        <PromoSection />
      </div>
    </div>
  );
};

export default TierForm;
