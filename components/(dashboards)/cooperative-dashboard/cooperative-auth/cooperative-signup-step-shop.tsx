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
import { Upload } from "lucide-react";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import type { CooperativeShopInfo } from "@/zustand/cooperative-signup-store";

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
  const shopInfo: CooperativeShopInfo = { ...DEFAULT_SHOP_INFO, ...formData.shopInfo };
  const [errors, setErrors] = useState<
    Partial<Record<keyof CooperativeShopInfo, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateShopInfo({ [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    updateShopInfo({ category: value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "shopLogo" | "shopBanner"
  ) => {
    if (e.target.files?.[0]) {
      updateShopInfo({ [field]: e.target.files[0] });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof CooperativeShopInfo, string>> = {};
    if (!shopInfo.shopName) newErrors.shopName = "Business/Shop name is required";
    if (!shopInfo.description) newErrors.description = "Description is required";
    if (!shopInfo.category) newErrors.category = "Category is required";
    if (!shopInfo.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!shopInfo.businessAddress) newErrors.businessAddress = "Business address is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(3);
  };

  const handleBack = () => setStep(1);

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">Shop Information</h1>
        <p className="text-sm text-gray-500">
          Provide details about your business/shop
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="shopName" className="text-sm font-medium text-[#222]">
            Business/Shop Name
          </Label>
          <Input
            id="shopName"
            name="shopName"
            type="text"
            placeholder="e.g., Amina's Fashion Boutique"
            value={shopInfo.shopName}
            onChange={handleChange}
            className="h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm focus:border-[#F10E7C] focus:outline-none"
          />
          {errors.shopName && (
            <span className="text-xs text-red-600">{errors.shopName}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-[#222]">
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you sell and what makes your shop unique"
            value={shopInfo.description}
            onChange={handleChange}
            className="min-h-[100px] w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-[#F10E7C] focus:outline-none resize-none"
          />
          {errors.description && (
            <span className="text-xs text-red-600">{errors.description}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-[#222]">
            Category
          </Label>
          <Select value={shopInfo.category} onValueChange={handleCategoryChange}>
            <SelectTrigger
              id="category"
              className="h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm"
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
            <span className="text-xs text-red-600">{errors.category}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm font-medium text-[#222]">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="e.g. 08012345678"
              value={shopInfo.contactNumber}
              onChange={handleChange}
              className="h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm focus:border-[#F10E7C] focus:outline-none"
            />
            {errors.contactNumber && (
              <span className="text-xs text-red-600">{errors.contactNumber}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessAddress" className="text-sm font-medium text-[#222]">
              Business Address
            </Label>
            <Input
              id="businessAddress"
              name="businessAddress"
              type="text"
              placeholder="City, State"
              value={shopInfo.businessAddress}
              onChange={handleChange}
              className="h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm focus:border-[#F10E7C] focus:outline-none"
            />
            {errors.businessAddress && (
              <span className="text-xs text-red-600">{errors.businessAddress}</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-[#222] mb-4">Shop Branding (Optional)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopLogo" className="text-xs text-gray-500">Shop Logo</Label>
              <div className="relative">
                <input
                  type="file"
                  id="shopLogo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "shopLogo")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="h-32 rounded-2xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 hover:bg-gray-100">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-xs text-[#222]">
                    {shopInfo.shopLogo ? shopInfo.shopLogo.name : "Upload Logo"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopBanner" className="text-xs text-gray-500">Shop Banner</Label>
              <div className="relative">
                <input
                  type="file"
                  id="shopBanner"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "shopBanner")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="h-32 rounded-2xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 hover:bg-gray-100">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-xs text-[#222]">
                    {shopInfo.shopBanner ? shopInfo.shopBanner.name : "Upload Banner"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12 rounded-full border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-full bg-[#F10E7C] hover:bg-[#d00c6b] text-white font-medium"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
