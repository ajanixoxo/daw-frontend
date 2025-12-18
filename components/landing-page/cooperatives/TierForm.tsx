"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTier } from "@/hooks/useTier";
import PromoSection from "@/components/auth/PromoSection";
import { useProfile } from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";

type FormValues = {
  tierName: string;
  monthlyContribution: number;
  marketplaceDiscount?: number;
  maxAmount: number;
  interestRate: number;
  maxDurationMonths: number;
  minPaidMonths: number;
};

const TierForm = () => {
  const { create, loading } = useCreateTier();
  const { data: user, isLoading } = useProfile();

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();

  const tierName = watch("tierName");
  console.log("user", user);
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#F10E7C]" />
      </div>
    );
  }

  if (!user?._id) {
    return (
      <div className="text-center py-20 text-gray-500">
        Unable to load cooperative information
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    const payload = {
      cooperativeId: user._id, // ✅ always available now
      name: data.tierName,
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
    };

    await create(payload);
  };

  return (
    <div className="flex flex-col md:flex-row  mt-24 gap-6">
      {/* LEFT – FORM */}
      <div className="flex-1">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Create Cooperative Tier</h2>

            <p className="text-sm text-muted-foreground">
              Fields marked with <span className="text-red-500">*</span> are
              mandatory
            </p>

            {/* Tier Selection */}
            <Select
              value={tierName}
              onValueChange={(value) => setValue("tierName", value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Tier *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tier 1">Tier 1</SelectItem>
                <SelectItem value="Tier 2">Tier 2</SelectItem>
                <SelectItem value="Tier 3">Tier 3</SelectItem>
              </SelectContent>
            </Select>

            <Input
              {...register("monthlyContribution", { required: true })}
              type="number"
              placeholder="Monthly Contribution (₹) *"
            />

            <Input
              {...register("marketplaceDiscount")}
              type="number"
              placeholder="Marketplace Discount (%) (Optional)"
            />

            <Input
              {...register("maxAmount", { required: true })}
              type="number"
              placeholder="Maximum Loan Amount (₹) *"
            />

            <Input
              {...register("interestRate", { required: true })}
              type="number"
              placeholder="Interest Rate (%) *"
            />

            <Input
              {...register("maxDurationMonths", { required: true })}
              type="number"
              placeholder="Max Duration (in Months) *"
            />

            <Input
              {...register("minPaidMonths", { required: true })}
              type="number"
              placeholder="Minimum Paid Months Required *"
            />

            <Button
              className="w-full"
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? "Creating..." : "Create Tier"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT – PROMO */}
      <div className="flex-1">
        <PromoSection />
      </div>
    </div>
  );
};

export default TierForm;
