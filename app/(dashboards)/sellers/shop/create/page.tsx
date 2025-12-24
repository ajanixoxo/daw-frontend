"use client"

import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useCreateShop } from "@/hooks/useShop"
import { useUpgradeToSeller } from "@/hooks/useUser"
import { useProfile } from "@/hooks/useProfile"
import { useLogout } from "@/hooks/useAuth"
import { toast } from "sonner"

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Personal Care",
  "Food & Beverages",
  "Arts & Crafts",
  "Books & Media",
  "Sports & Outdoors",
  "Health & Wellness",
  "Other"
]

export default function CreateShopPage() {
  const router = useRouter()
  const { mutate: createShop, isPending } = useCreateShop()
  const { mutate: upgradeToSeller, isPending: isUpgrading } = useUpgradeToSeller()
  const { data: user } = useProfile()
  const { logout } = useLogout()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    logo_url: "",
    banner_url: "",
    is_member_shop: false,
    cooperative_id: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Shop name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (formData.logo_url && !isValidUrl(formData.logo_url)) {
      newErrors.logo_url = "Please enter a valid URL"
    }

    if (formData.banner_url && !isValidUrl(formData.banner_url)) {
      newErrors.banner_url = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      logo_url: formData.logo_url.trim() || undefined,
      banner_url: formData.banner_url.trim() || undefined,
      is_member_shop: formData.is_member_shop,
      cooperative_id: formData.cooperative_id.trim() || null,
    }

    createShop(payload, {
      onSuccess: (response) => {
        // Check which flow: Flow 1 (direct seller signup) or Flow 2 (buyer to seller)
        // Flow 1: User registered directly as seller (only seller role, came from OTP → KYC flow)
        // Flow 2: User was buyer, upgraded to seller on KYC page, then created shop
        // We detect Flow 1 by checking if user has seller role but came from direct signup
        // We can use sessionStorage to track if they came from seller signup flow
        const cameFromSellerSignup = typeof window !== "undefined" && sessionStorage.getItem("signupRole") === "seller"
        
        // Also check if user already has seller role (Flow 2 - already upgraded)
        const alreadyHasSellerRole = user?.roles?.includes("seller")
        
        if (cameFromSellerSignup || (!alreadyHasSellerRole && user?.roles?.length === 1 && user?.roles[0] === "seller")) {
          // Flow 1: Direct seller registration - logout and redirect to login
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("signupRole")
          }
          toast.success("Shop created successfully! Please log in to access your seller dashboard.")
          setTimeout(async () => {
            await logout()
            router.push("/login")
          }, 1500)
        } else {
          // Flow 2: Buyer to seller conversion - upgrade role and go to dashboard
          toast.success("Shop created successfully! Upgrading your account...")
          upgradeToSeller(undefined, {
            onSuccess: () => {
              toast.success("Welcome to your seller dashboard!")
              // Redirect to seller dashboard
              setTimeout(() => {
                router.push("/sellers/dashboard")
              }, 1000)
            },
            onError: (error) => {
              console.error("Error upgrading role:", error)
              // Still redirect even if upgrade fails (user can retry later)
              toast.error("Shop created but role upgrade failed. Please contact support.")
              setTimeout(() => {
                router.push("/sellers/dashboard")
              }, 2000)
            },
          })
        }
      },
      onError: (error) => {
        console.error("Error creating shop:", error)
      },
    })
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <main className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#f0f2f5] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#1d1d2a]" />
          </Button>
          <div>
            <h1 className="text-[28px] lg:text-[32px] font-bold text-[#000000] leading-tight">Create New Shop</h1>
            <p className="text-[14px] text-[#667185] leading-relaxed">Set up your new online store</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shop Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
              <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Basic Information</h2>

              <div className="space-y-5">
                {/* Shop Name */}
                <div>
                  <Label htmlFor="name" className="text-[14px] font-medium text-[#344054] mb-2">
                    Shop Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter shop name"
                    className={`h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-[14px] font-medium text-[#344054] mb-2">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full h-11 px-3 rounded-md border ${
                      errors.category ? "border-red-500" : "border-[#d0d5dd]"
                    } focus:border-[#f10e7c] focus:ring-[#f10e7c] focus:outline-none text-[14px] bg-white`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-[12px] text-red-500 mt-1">{errors.category}</p>}
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-[14px] font-medium text-[#344054] mb-2">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe your shop and what you offer"
                    rows={5}
                    className={`border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] resize-none ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  {errors.description && <p className="text-[12px] text-red-500 mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
              <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Branding</h2>

              <div className="space-y-5">
                {/* Logo URL */}
                <div>
                  <Label htmlFor="logo_url" className="text-[14px] font-medium text-[#344054] mb-2">
                    Logo URL (Optional)
                  </Label>
                  <Input
                    id="logo_url"
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => handleChange("logo_url", e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className={`h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] ${
                      errors.logo_url ? "border-red-500" : ""
                    }`}
                  />
                  {errors.logo_url && <p className="text-[12px] text-red-500 mt-1">{errors.logo_url}</p>}
                  <p className="text-[12px] text-[#667185] mt-1">Enter a URL to your shop logo image</p>
                </div>

                {/* Banner URL */}
                <div>
                  <Label htmlFor="banner_url" className="text-[14px] font-medium text-[#344054] mb-2">
                    Banner URL (Optional)
                  </Label>
                  <Input
                    id="banner_url"
                    type="url"
                    value={formData.banner_url}
                    onChange={(e) => handleChange("banner_url", e.target.value)}
                    placeholder="https://example.com/banner.png"
                    className={`h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] ${
                      errors.banner_url ? "border-red-500" : ""
                    }`}
                  />
                  {errors.banner_url && <p className="text-[12px] text-red-500 mt-1">{errors.banner_url}</p>}
                  <p className="text-[12px] text-[#667185] mt-1">Enter a URL to your shop banner image</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-8">
            {/* Shop Settings */}
            <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
              <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Shop Settings</h2>

              <div className="space-y-6">
                {/* Member Shop Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="is_member_shop" className="text-[14px] font-medium text-[#344054]">
                      Member Shop
                    </Label>
                    <p className="text-[12px] text-[#667185] mt-1">
                      Enable if this shop is part of a cooperative
                    </p>
                  </div>
                  <Switch
                    id="is_member_shop"
                    checked={formData.is_member_shop}
                    onCheckedChange={(checked) => handleChange("is_member_shop", checked)}
                  />
                </div>

                {/* Cooperative ID */}
                {formData.is_member_shop && (
                  <div>
                    <Label htmlFor="cooperative_id" className="text-[14px] font-medium text-[#344054] mb-2">
                      Cooperative ID (Optional)
                    </Label>
                    <Input
                      id="cooperative_id"
                      value={formData.cooperative_id}
                      onChange={(e) => handleChange("cooperative_id", e.target.value)}
                      placeholder="Enter cooperative ID"
                      className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                    />
                    <p className="text-[12px] text-[#667185] mt-1">
                      Leave empty if not associated with a cooperative
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={isPending || isUpgrading}
                className="w-full bg-[#f10e7c] text-white hover:bg-[#d90d6a] h-11 rounded-lg font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isUpgrading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isPending ? "Creating..." : "Upgrading Account..."}
                  </>
                ) : (
                  "Create Shop"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
                className="w-full border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

