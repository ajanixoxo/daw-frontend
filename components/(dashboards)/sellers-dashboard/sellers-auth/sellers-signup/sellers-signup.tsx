"use client";

import { useState } from "react";
import type { FC } from "react";
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

interface SellersSignupFormData {
  shopName: string;
  description: string;
  category: string;
  contactNumber: string;
  businessAddress: string;
  shopLogo: File | null;
  shopBanner: File | null;
  nin: string;
  cacNumber: string;
  cacCertificate: File | null;
}

const SellersSignup: FC = () => {
  const [formData, setFormData] = useState<SellersSignupFormData>({
    shopName: "",
    description: "",
    category: "",
    contactNumber: "",
    businessAddress: "",
    shopLogo: null,
    shopBanner: null,
    nin: "",
    cacNumber: "",
    cacCertificate: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SellersSignupFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "shopLogo" | "shopBanner" | "cacCertificate"
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof SellersSignupFormData, string>> = {};

    // Validation
    if (!formData.shopName) newErrors.shopName = "Shop name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.businessAddress)
      newErrors.businessAddress = "Business address is required";
    if (!formData.nin) newErrors.nin = "NIN is required";
    if (!formData.cacNumber) newErrors.cacNumber = "CAC number is required";
    if (!formData.cacCertificate)
      newErrors.cacCertificate = "CAC certificate is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // TODO: Implement shop creation logic
      console.log("Form submitted:", formData);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[500px]">
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Shop Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="shopName" className="auth-label text-(--text-dark)">
            Shop Name
          </Label>
          <Input
            id="shopName"
            name="shopName"
            type="text"
            placeholder="e.g., Amina's Fashion Boutique"
            value={formData.shopName}
            onChange={handleChange}
            disabled={isLoading}
            className="h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.shopName}
          />
          {errors.shopName && (
            <span className="text-xs text-destructive">{errors.shopName}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="description"
            className="auth-label text-(--text-dark)"
          >
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you sell and what makes your shop Unique"
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
            className="min-h-[100px] rounded-lg border border-(--input-border) bg-white px-4 py-3 text-base placeholder:text-(--input-placeholder) resize-none focus:outline-none focus:ring-2 focus:ring-(--brand-pink)/20 focus:border-(--brand-pink)"
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
          <Label htmlFor="category" className="auth-label text-(--text-dark)">
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
            disabled={isLoading}
          >
            <SelectTrigger
              id="category"
              className="h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base w-full"
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
              className="auth-label text-(--text-dark)"
            >
              Contact Number
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 h-12 px-3 rounded-lg border border-(--input-border) bg-[#f5f5f5]">
                <span className="text-2xl">🇺🇸</span>
                <span className="text-sm text-[#1a1a1a]">+1</span>
              </div>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="000 000 000"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={isLoading}
                className="flex-1 h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
                aria-invalid={!!errors.contactNumber}
              />
            </div>
            {errors.contactNumber && (
              <span className="text-xs text-destructive">
                {errors.contactNumber}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="businessAddress"
              className="auth-label text-(--text-dark)"
            >
              Business Address
            </Label>
            <Input
              id="businessAddress"
              name="businessAddress"
              type="text"
              placeholder="City, State"
              value={formData.businessAddress}
              onChange={handleChange}
              disabled={isLoading}
              className="h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
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
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="h-32 rounded-lg border border-dashed border-(--input-border) bg-[#f9f9f9] flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Upload className="w-6 h-6 text-[#b6b8c0]" />
                  <p className="text-xs text-[#1a1a1a]">
                    {formData.shopLogo ? formData.shopLogo.name : "Upload Logo"}
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
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="h-32 rounded-lg border border-dashed border-(--input-border) bg-[#f9f9f9] flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Upload className="w-6 h-6 text-[#b6b8c0]" />
                  <p className="text-xs text-[#1a1a1a]">
                    {formData.shopBanner
                      ? formData.shopBanner.name
                      : "Upload Banner"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KYC Information */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">
            KYC Information
          </h3>

          {/* NIN */}
          <div className="flex flex-col gap-2 mb-5">
            <Label htmlFor="nin" className="auth-label text-(--text-dark)">
              NIN (National Identification Number)
            </Label>
            <Input
              id="nin"
              name="nin"
              type="text"
              placeholder="Enter your NIN"
              value={formData.nin}
              onChange={handleChange}
              disabled={isLoading}
              className="h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
              aria-invalid={!!errors.nin}
              maxLength={11}
            />
            {errors.nin && (
              <span className="text-xs text-destructive">{errors.nin}</span>
            )}
          </div>

          {/* CAC Number */}
          <div className="flex flex-col gap-2 mb-5">
            <Label
              htmlFor="cacNumber"
              className="auth-label text-(--text-dark)"
            >
              CAC Number
            </Label>
            <Input
              id="cacNumber"
              name="cacNumber"
              type="text"
              placeholder="Enter your CAC registration number"
              value={formData.cacNumber}
              onChange={handleChange}
              disabled={isLoading}
              className="h-12 rounded-lg border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
              aria-invalid={!!errors.cacNumber}
            />
            {errors.cacNumber && (
              <span className="text-xs text-destructive">
                {errors.cacNumber}
              </span>
            )}
          </div>

          {/* CAC Certificate Upload */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="cacCertificate"
              className="auth-label text-(--text-dark)"
            >
              Upload CAC Certificate
            </Label>
            <div className="relative">
              <input
                type="file"
                id="cacCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "cacCertificate")}
                disabled={isLoading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="h-32 rounded-lg border border-dashed border-(--input-border) bg-[#f9f9f9] flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-[#b6b8c0]" />
                <p className="text-xs text-[#1a1a1a] text-center px-4">
                  {formData.cacCertificate
                    ? formData.cacCertificate.name
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-[#b6b8c0]">
                  PDF, JPG, PNG (max. 5MB)
                </p>
              </div>
            </div>
            {errors.cacCertificate && (
              <span className="text-xs text-destructive">
                {errors.cacCertificate}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="flex-1 h-12 rounded-[40px] border-2 border-gray-300 bg-white text-[#1a1a1a] font-semibold text-base hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 rounded-[40px] bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ letterSpacing: "-0.64px" }}
          >
            {isLoading ? "Creating Shop..." : "Create Shop"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SellersSignup;

