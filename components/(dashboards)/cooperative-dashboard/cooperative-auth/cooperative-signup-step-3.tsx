"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { useProfile } from "@/hooks/useProfile";
import {
  joinCooperative,
  guestJoinCooperative,
  fetchDAWCooperative,
  cooperativeJoinWithSellerOnboard,
} from "@/app/actions/coop";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/zustand/store";
import { useQueryClient } from "@tanstack/react-query";

export function CooperativeSignupStep3() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    dawCooperativeId,
    dawTiers,
    setDAWCooperative,
    setStep,
    reset,
  } = useCooperativeSignupStore();
  const { personalInfo, membershipTier } = formData;
  const shopInfo = formData.shopInfo ?? {
    shopName: "",
    description: "",
    category: "",
    contactNumber: "",
    businessAddress: "",
    shopLogo: null,
    shopBanner: null,
  };
  const documents = formData.documents ?? {
    nin: "",
    passportPhotograph: null,
    businessCac: null,
  };
  const { data: profile } = useProfile();
  const updateUser = useAuthStore((s) => s.updateUser);
  const queryClient = useQueryClient();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isLoggedIn = !!profile;
  const isBuyerOrGuestFlow =
    !profile ||
    (profile &&
      (!profile.shop ||
        (Array.isArray(profile.shop) && profile.shop.length === 0)));

  const handleBack = () => setStep(currentStep - 1);

  const handleComplete = async () => {
    if (!agreed) return;

    setIsSubmitting(true);
    setSubmitError(null);

    let cooperativeId = dawCooperativeId;
    const tierIndex = membershipTier != null ? membershipTier - 1 : -1;
    let subscriptionTierId =
      tierIndex >= 0 && dawTiers[tierIndex] ? dawTiers[tierIndex]._id : null;

    if (!cooperativeId || !subscriptionTierId) {
      try {
        const res = await fetchDAWCooperative();
        if (
          !res.success ||
          !res.data?.cooperative ||
          !res.data?.tiers?.length
        ) {
          toast.error(
            res.error ??
              "Could not load DAW cooperative. Please refresh and try again.",
          );
          setIsSubmitting(false);
          return;
        }
        setDAWCooperative(res.data.cooperative._id, res.data.tiers);
        cooperativeId = res.data.cooperative._id;
        subscriptionTierId =
          tierIndex >= 0 && res.data.tiers[tierIndex]
            ? res.data.tiers[tierIndex]._id
            : null;
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Could not load DAW cooperative.";
        toast.error(msg);
        setSubmitError(msg);
        setIsSubmitting(false);
        return;
      }
    }

    if (!cooperativeId || !subscriptionTierId) {
      toast.error(
        "DAW cooperative or tier not loaded. Please refresh and try again.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (isBuyerOrGuestFlow) {
        const fd = new FormData();
        if (!isLoggedIn) {
          fd.append("firstName", personalInfo.firstName.trim());
          fd.append("lastName", (personalInfo.lastName ?? "").trim());
          fd.append("email", personalInfo.email.trim());
          fd.append("phone", personalInfo.phone.trim());
          fd.append("password", personalInfo.password);
          fd.append("confirmPassword", personalInfo.confirmPassword);
          if (personalInfo.country) fd.append("country", personalInfo.country);
          if (personalInfo.currency)
            fd.append("currency", personalInfo.currency);
        }
        fd.append("name", shopInfo.shopName);
        fd.append("description", shopInfo.description);
        fd.append("category", shopInfo.category);
        if (shopInfo.contactNumber)
          fd.append("contactNumber", shopInfo.contactNumber);
        if (shopInfo.businessAddress)
          fd.append("businessAddress", shopInfo.businessAddress);
        fd.append("cooperativeId", cooperativeId);
        fd.append("subscriptionTierId", subscriptionTierId);
        if (shopInfo.shopLogo) fd.append("shopLogo", shopInfo.shopLogo);
        if (shopInfo.shopBanner) fd.append("shopBanner", shopInfo.shopBanner);
        if (documents.nin) fd.append("nin", documents.nin.trim());
        if (documents.passportPhotograph)
          fd.append("passportPhotograph", documents.passportPhotograph);
        if (documents.businessCac)
          fd.append("businessCac", documents.businessCac);

        const res = await cooperativeJoinWithSellerOnboard(fd);
        if (res.success) {
          toast.success(
            isLoggedIn
              ? "Seller onboarded and joined DAW cooperative."
              : "Account created and joined. Please verify your email with the OTP sent.",
          );
          reset();
          router.push(isLoggedIn ? "/sellers/shop" : "/otp?mode=signup");
          // Sync roles AFTER navigation starts to prevent flash of "already member" card
          if (isLoggedIn && res.data?.user) {
            updateUser({ roles: res.data.user.roles });
            queryClient.invalidateQueries({ queryKey: ["seller-profile"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["my-shop"] });
          }
          return;
        }
        setSubmitError(res.error ?? "Failed to complete registration");
        toast.error(res.error ?? "Failed to complete registration");
        return;
      }

      if (isLoggedIn) {
        const res = await joinCooperative({
          cooperativeId,
          subscriptionTierId,
        });
        if (res.success) {
          toast.success("You have joined the DAW cooperative.");
          reset();
          router.push("/sellers/shop");
          // Sync roles AFTER navigation starts to prevent flash of "already member" card
          if (res.data?.user) {
            updateUser({ roles: res.data.user.roles });
          }
          queryClient.invalidateQueries({ queryKey: ["seller-profile"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["my-shop"] });
          return;
        }
        setSubmitError(res.error ?? "Failed to join cooperative");
        toast.error(res.error ?? "Failed to join cooperative");
        return;
      }

      const { email, password, confirmPassword, firstName, lastName, phone } =
        personalInfo;
      if (
        !email?.trim() ||
        !password ||
        !confirmPassword?.trim() ||
        !firstName?.trim() ||
        !phone?.trim()
      ) {
        toast.error(
          "Please fill in email, password, confirm password, first name, and phone.",
        );
        setIsSubmitting(false);
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        setIsSubmitting(false);
        return;
      }

      const res = await guestJoinCooperative({
        email: email.trim(),
        password,
        confirmPassword: confirmPassword.trim(),
        firstName: firstName.trim(),
        lastName: (lastName ?? "").trim(),
        phone: phone.trim(),
        country: personalInfo.country,
        currency: personalInfo.currency,
        cooperativeId,
        subscriptionTierId,
      });

      if (res.success) {
        toast.success(
          "Account created and joined. Please verify your email with the OTP sent.",
        );
        reset();
        router.push("/otp?mode=signup");
        return;
      }
      setSubmitError(res.error ?? "Failed to join cooperative");
      toast.error(res.error ?? "Failed to join cooperative");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userCountry = profile?.country || personalInfo?.country || "";
  const isNigeria =
    userCountry.toLowerCase() === "nigeria" ||
    userCountry.toUpperCase() === "NG" ||
    userCountry.toUpperCase() === "NGA";

  const tiersInfo = isNigeria
    ? {
        1: { name: "Basic Tier", price: "up to ₦1M" },
        2: { name: "Standard Tier", price: "up to ₦5M" },
        3: { name: "Premium Tier", price: "up to ₦10M" },
      }
    : {
        1: { name: "Basic Tier", price: "up to $2,000" },
        2: { name: "Standard Tier", price: "up to $6,000" },
        3: { name: "Premium Tier", price: "up to $10,000" },
      };

  const selectedTier = membershipTier
    ? tiersInfo[membershipTier as keyof typeof tiersInfo]
    : { name: "None", price: "None" };

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
            <p className="text-sm text-gray-600">{personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Shop Name:</p>
            <p className="text-sm text-gray-600">{shopInfo.shopName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#222]">Membership Tier:</p>
            <p className="text-sm text-gray-600">
              {selectedTier.name} ({selectedTier.price})
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

      {submitError && (
        <p className="mb-4 text-sm text-red-600">{submitError}</p>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="w-full rounded-full border border-gray-100 bg-gray-50 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={!agreed || isSubmitting}
          className="w-full rounded-full bg-[#F10E7C] py-3 text-sm font-medium text-white transition-colors hover:bg-[#d00c6b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting…" : "Complete Application"}
        </button>
      </div>
    </div>
  );
}
