"use client";

import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { FileText } from "lucide-react";
import Link from "next/link";

export function CooperativeSignupStep1() {
  const { formData, updatePersonalInfo, setStep } = useCooperativeSignupStore();
  const { personalInfo } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleNext = () => {
    // Add validation logic here if needed
    setStep(2);
  };

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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
            />
          </div>
        </div>

        {/* Business Name */}
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
            className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
          />
        </div>

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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#222]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              value={personalInfo.password}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
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
              className="w-full rounded-full border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#F10E7C] focus:outline-none"
            />
          </div>
        </div>

        {/* Document Upload */}
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
