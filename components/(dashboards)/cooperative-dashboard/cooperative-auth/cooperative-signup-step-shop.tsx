"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import type { CooperativeShopInfo } from "@/zustand/cooperative-signup-store";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const DEFAULT_SHOP_INFO: CooperativeShopInfo = {
  shopName: "",
  description: "",
  category: "",
  contactNumber: "",
  businessAddress: "",
  shopLogo: null,
  shopBanner: null,
};

export function CooperativeSignupStepShop() {
  const { formData, updateShopInfo, setStep } = useCooperativeSignupStore();
  const shopInfo: CooperativeShopInfo = {
    ...DEFAULT_SHOP_INFO,
    ...formData.shopInfo,
  };
  const [errors, setErrors] = useState<
    Partial<Record<keyof CooperativeShopInfo, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateShopInfo({ [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    updateShopInfo({ category: value });
  };

  const handlePhoneChange = (value: string) => {
    updateShopInfo({ contactNumber: value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "shopLogo" | "shopBanner",
  ) => {
    if (e.target.files?.[0]) {
      updateShopInfo({ [field]: e.target.files[0] });
    }
  };

  const handleClearFile = (
    e: React.MouseEvent,
    field: "shopLogo" | "shopBanner",
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updateShopInfo({ [field]: null });
    const input = document.getElementById(field) as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof CooperativeShopInfo, string>> = {};
    if (!shopInfo.shopName) newErrors.shopName = "Shop name is required";
    if (!shopInfo.description)
      newErrors.description = "Description is required";
    if (!shopInfo.category) newErrors.category = "Category is required";
    if (!shopInfo.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!shopInfo.businessAddress)
      newErrors.businessAddress = "Business address is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(3);
  };

  const handleBack = () => setStep(1);

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h2
          className="text-2xl font-medium text-[#1a1a1a] mb-2"
          style={{ letterSpacing: "-0.96px" }}
        >
          Shop Information
        </h2>
        <p className="text-sm text-[#6b6b6b]">
          Provide details about your shop and products
        </p>
      </div>

      <form onSubmit={handleNext} className="flex flex-col gap-5">
        {/* Shop Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="shopName" className="auth-label text-text-dark">
            Shop Name
          </Label>
          <Input
            id="shopName"
            name="shopName"
            type="text"
            placeholder="e.g., Amina's Fashion Boutique"
            value={shopInfo.shopName}
            onChange={handleChange}
            className="h-12 rounded-lg border border-input-border bg-white px-4 text-sm placeholder:text-input-placeholder"
            aria-invalid={!!errors.shopName}
          />
          {errors.shopName && (
            <span className="text-xs text-destructive">{errors.shopName}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="auth-label text-text-dark">
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you sell and what makes your shop Unique"
            value={shopInfo.description}
            onChange={handleChange}
            className="min-h-[100px] rounded-lg border border-input-border bg-[#F9F9FB] px-4 py-3 text-sm placeholder:text-input-placeholder resize-none focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink"
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <span className="text-xs text-destructive">
              {errors.description}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="category" className="auth-label text-text-dark">
            Category
          </Label>
          <Select
            value={shopInfo.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger
              id="category"
              className="h-12 rounded-lg border border-input-border bg-white px-4 text-sm w-full"
              aria-invalid={!!errors.category}
            >
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Clothing</SelectItem>
              <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
              <SelectItem value="crafts">Arts & Crafts</SelectItem>
              <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="home">Home & Decor</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-xs text-destructive">{errors.category}</span>
          )}
        </div>

        {/* Contact Number & Business Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="contactNumber"
              className="auth-label text-text-dark"
            >
              Contact Number
            </Label>
            <PhoneInput
              country={"ng"}
              value={shopInfo.contactNumber}
              onChange={handlePhoneChange}
              containerClass="w-full"
              inputClass="!w-full !h-12 !rounded-lg !border !border-input-border !bg-white !px-4 !pl-12 !text-sm !placeholder:text-input-placeholder"
              buttonClass="!border-none !bg-transparent !pl-3"
              dropdownClass="!rounded-xl !shadow-lg text-sm"
              placeholder="Enter contact number"
            />
            {errors.contactNumber && (
              <span className="text-xs text-destructive">
                {errors.contactNumber}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="businessAddress"
              className="auth-label text-text-dark"
            >
              Business Address
            </Label>
            <Input
              id="businessAddress"
              name="businessAddress"
              type="text"
              placeholder="City, State"
              value={shopInfo.businessAddress}
              onChange={handleChange}
              className="h-12 rounded-lg border border-input-border bg-white px-4 text-sm placeholder:text-input-placeholder"
              aria-invalid={!!errors.businessAddress}
            />
            {errors.businessAddress && (
              <span className="text-xs text-destructive">
                {errors.businessAddress}
              </span>
            )}
          </div>
        </div>

        {/* Shop Branding (Optional) */}
        <div>
          <p className="text-sm font-medium text-[#1a1a1a] mb-4">
            Shop Branding (Optional)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shop Logo */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="shopLogo" className="text-xs text-[#6b6b6b]">
                Shop Logo
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="shopLogo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "shopLogo")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`h-32 rounded-lg border border-dashed ${shopInfo.shopLogo ? "border-green-500 bg-green-50/50" : "border-input-border"} bg-[#f9f9f9] flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors relative`}
                >
                  {shopInfo.shopLogo && (
                    <button
                      type="button"
                      onClick={(e) => handleClearFile(e, "shopLogo")}
                      className="absolute top-2 right-2 z-20 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <Upload
                    className={`w-6 h-6 ${shopInfo.shopLogo ? "text-green-500" : "text-[#b6b8c0]"}`}
                  />
                  <p
                    className={`text-xs ${shopInfo.shopLogo ? "text-green-600 font-medium" : "text-[#1a1a1a]"}`}
                  >
                    {shopInfo.shopLogo ? shopInfo.shopLogo.name : "Upload Logo"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shop Banner */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="shopBanner" className="text-xs text-[#6b6b6b]">
                Shop Banner
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="shopBanner"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "shopBanner")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`h-32 rounded-lg border border-dashed ${shopInfo.shopBanner ? "border-green-500 bg-green-50/50" : "border-input-border"} bg-[#f9f9f9] flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors relative`}
                >
                  {shopInfo.shopBanner && (
                    <button
                      type="button"
                      onClick={(e) => handleClearFile(e, "shopBanner")}
                      className="absolute top-2 right-2 z-20 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <Upload
                    className={`w-6 h-6 ${shopInfo.shopBanner ? "text-green-500" : "text-[#b6b8c0]"}`}
                  />
                  <p
                    className={`text-xs ${shopInfo.shopBanner ? "text-green-600 font-medium" : "text-[#1a1a1a]"}`}
                  >
                    {shopInfo.shopBanner
                      ? shopInfo.shopBanner.name
                      : "Upload Banner"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12 rounded-[40px] border-2 border-gray-100 bg-white text-[#b6b8c0] font-semibold text-base hover:bg-gray-50"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-[40px] bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold text-base"
            style={{ letterSpacing: "-0.64px" }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
