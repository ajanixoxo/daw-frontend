"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { useProfile } from "@/hooks/useProfile";
import { FileText } from "lucide-react";
import Link from "next/link";

export function CooperativeSignupStep1() {
  const { formData, prefilledFields, hasSellerDocuments, updatePersonalInfo, setStep } =
    useCooperativeSignupStore();
  const { data: profile } = useProfile();
  const { personalInfo } = formData;
  const isLoggedIn = !!profile;
  /** 5-step flow: buyer or guest (no shop yet). Business/Shop name is in Shop step, not here. */
  const isBuyerOrGuestFlow = !profile || (profile && (!profile.shop || (Array.isArray(profile.shop) && profile.shop.length === 0)));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleNext = () => {
    // Add validation logic here if needed
    setStep(2);
  };

  const inputClass = (name: keyof typeof prefilledFields) =>
    `w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none ${prefilledFields[name] ? "cursor-not-allowed bg-gray-100 opacity-90" : ""}`;

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">
          Personal Information
        </h1>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={personalInfo.firstName}
              onChange={handleChange}
              disabled={!!prefilledFields.firstName}
              className={inputClass("firstName")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={personalInfo.lastName}
              onChange={handleChange}
              disabled={!!prefilledFields.lastName}
              className={inputClass("lastName")}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter Number"
              value={personalInfo.phoneNumber}
              onChange={handleChange}
              disabled={!!prefilledFields.phoneNumber}
              className={inputClass("phoneNumber")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="hello@example.com"
              value={personalInfo.email}
              onChange={handleChange}
              disabled={!!prefilledFields.email}
              className={inputClass("email")}
            />
          </div>
        </div>

        {/* Business Name – only in 3-step flow (sellers); in 5-step flow it's "Business/Shop name" in Shop step */}
        {!isBuyerOrGuestFlow && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              placeholder="Enter Business Name"
              value={personalInfo.businessName}
              onChange={handleChange}
              disabled={!!prefilledFields.businessName}
              className={inputClass("businessName")}
            />
          </div>
        )}

        {/* Row 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Name"
              value={personalInfo.country}
              onChange={handleChange}
              className={inputClass("country")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">Currency</label>
            <input
              type="text"
              name="currency"
              placeholder="Naira"
              value={personalInfo.currency}
              onChange={handleChange}
              className={inputClass("currency")}
            />
          </div>
        </div>

        {/* Password fields – only for guests (not logged in) */}
        {!isLoggedIn && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#222]">Password</label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                value={personalInfo.password}
                onChange={handleChange}
                className={inputClass("password")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#222]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="*******"
                value={personalInfo.confirmPassword}
                onChange={handleChange}
                className={inputClass("confirmPassword")}
              />
            </div>
          </div>
        )}

        {/* Document Upload - hidden if user already has seller documents (e.g. from seller onboarding) */}
        {!hasSellerDocuments && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">
              Upload Valid Identification Documents: e.g. NIN, International
              Passport, Driver's License, Voter's Card
            </label>
            <div className="relative">
              <input
                type="file"
                id="document-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  updatePersonalInfo({ document: file });
                }}
              />
              <label
                htmlFor="document-upload"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 py-10 transition-colors hover:bg-gray-100"
              >
                <FileText className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-[#222]">
                  {personalInfo.document
                    ? personalInfo.document.name
                    : "Upload Document"}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Link href="/" className="w-full">
            <button className="w-full rounded-full border border-gray-100 bg-gray-50 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleNext}
            className="w-full rounded-full bg-[#F10E7C] py-3 text-sm font-medium text-white transition-colors hover:bg-[#d00c6b]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
