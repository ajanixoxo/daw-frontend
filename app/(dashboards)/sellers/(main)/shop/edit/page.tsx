"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share2, Upload, Loader2, Store, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetMyShop, useEditShop } from "@/hooks/useShop";
import Image from "next/image";

export default function EditShopPage() {
  const router = useRouter();
  const { data: shopData, isLoading } = useGetMyShop();
  const shop = shopData?.shop;
  const productCount = shopData?.productCount ?? 0;
  const editShopMutation = useEditShop();

  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  // File upload state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Populate form with existing shop data
  useEffect(() => {
    if (shop) {
      setStoreName(shop.name || "");
      setDescription(shop.description || "");
      setCategory(shop.category || "");
      setPhone(shop.contact_number || "");
      setBusinessAddress(shop.business_address || "");
      if (shop.logo_url) setLogoPreview(shop.logo_url);
      if (shop.banner_url) setBannerPreview(shop.banner_url);
    }
  }, [shop]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!shop?._id) return;

    const formData = new FormData();
    if (storeName !== shop.name) formData.append("name", storeName);
    if (description !== shop.description) formData.append("description", description);
    if (category !== shop.category) formData.append("category", category);
    if (phone !== (shop.contact_number || "")) formData.append("contact_number", phone);
    if (businessAddress !== (shop.business_address || "")) formData.append("business_address", businessAddress);
    if (logoFile) formData.append("shopLogo", logoFile);
    if (bannerFile) formData.append("shopBanner", bannerFile);

    editShopMutation.mutate(
      { shopId: shop._id, formData },
      {
        onSuccess: () => {
          router.push("/sellers/shop");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <main className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
          <p className="text-sm text-[#667085]">Loading shop details...</p>
        </div>
      </main>
    );
  }

  if (!shop) {
    return (
      <main className="p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 text-center">
          <Store className="w-12 h-12 text-[#98A2B3]" />
          <h2 className="text-xl font-semibold text-[#101828]">No Shop Found</h2>
          <p className="text-sm text-[#667085]">Create a shop first before editing.</p>
          <Button
            onClick={() => router.push("/sellers/shop/create")}
            className="bg-[#f10e7c] text-white hover:bg-[#d90d6a]"
          >
            Create Shop
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#f0f2f5] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#1d1d2a]" />
          </Button>
          <div>
            <h1 className="text-[28px] lg:text-[32px] font-bold text-[#000000] leading-tight">
              {shop.name}
            </h1>
            <p className="text-[14px] text-[#667185] leading-relaxed">
              Manage your store settings and information
            </p>
          </div>
        </div>
        <Button className="bg-[#000000] text-white hover:bg-[#1a1a1a] h-11 px-5 rounded-lg font-medium text-[14px] flex-shrink-0">
          <Share2 className="h-[18px] w-[18px] mr-2" />
          Share Shop
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Shop Information & Branding */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shop Information */}
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Shop Information</h2>

            <div className="space-y-5">
              {/* Store Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Store Name</label>
                  <Input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>
              </div>

              {/* Shop Description */}
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">Shop Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] resize-none"
                />
              </div>

              {/* Phone & Business Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Phone Number</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Business Address</label>
                  <Input
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Store Branding */}
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Store Branding</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Logo */}
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-3">Store Logo</label>
                <div className="relative">
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#f2e8ed] flex items-center justify-center">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Store Logo"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Store className="w-12 h-12 text-[#c4a0b3]" />
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="mt-3 flex items-center gap-2 text-[14px] text-[#344054] hover:text-[#f10e7c] font-medium transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New Logo
                  </button>
                </div>
              </div>

              {/* Store Banner */}
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-3">Store Banner</label>
                <div className="w-full aspect-square rounded-lg bg-[#f2e8ed] flex items-center justify-center overflow-hidden relative">
                  {bannerPreview ? (
                    <Image
                      src={bannerPreview}
                      alt="Store Banner"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-[#c4a0b3]" />
                  )}
                </div>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
                <button
                  onClick={() => bannerInputRef.current?.click()}
                  className="mt-3 flex items-center gap-2 text-[14px] text-[#344054] hover:text-[#f10e7c] font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Banner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Shop Status & Actions */}
        <div className="space-y-8">
          {/* Shop Status */}
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Shop Status</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Status</span>
                <span className="text-[15px] font-medium text-[#1d1d2a] capitalize">{shop.status}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Products</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">{productCount}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Category</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">{shop.category || "N/A"}</span>
              </div>
              {shop.is_member_shop && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-[14px] text-[#667185]">Member Shop</span>
                  <span className="text-[15px] font-medium text-[#f10e7c]">DAW Cooperative</span>
                </div>
              )}
            </div>
          </div>

          {/* Store URL - Commented out as requested */}
          {/* <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Store URL</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">Store URL</label>
                <div className="flex items-center gap-2">
                  <Input value={storeUrl} readOnly className="h-11 border-[#d0d5dd] bg-[#f9fafb] text-[#667185]" />
                  <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#d0d5dd] hover:bg-[#f9fafb] transition-colors flex-shrink-0">
                    <Copy className="h-[18px] w-[18px] text-[#667185]" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" className="border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px] bg-transparent">
                  <Globe className="h-[18px] w-[18px] mr-2" />
                  Visit
                </Button>
                <Button variant="outline" className="border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px] bg-transparent">
                  <Edit className="h-[18px] w-[18px] mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={editShopMutation.isPending}
              className="flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a] h-11 rounded-lg font-medium text-[14px]"
            >
              {editShopMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
