"use client"

import { useState } from "react"
import { ArrowLeft, Share2, Globe, Edit, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditShopPage() {
  const router = useRouter()
  const [storeName, setStoreName] = useState("Faye's Complex")
  const [storeSlug, setStoreSlug] = useState("fayes-complex")
  const [description, setDescription] = useState(
    "Authentic African handcrafted items including clothings, jewelry, and home décor. Empowering women artisans across Nigeria.",
  )
  const [phone, setPhone] = useState("+234 90322353555")
  const [email, setEmail] = useState("princewillfavour1@gmail.com")
  const [copied, setCopied] = useState(false)

  const storeUrl = `https://daw.app/${storeSlug}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <h1 className="text-[28px] lg:text-[32px] font-bold text-[#000000] leading-tight">Faye&apos;s Complex</h1>
            <p className="text-[14px] text-[#667185] leading-relaxed">Manage your store settings and information</p>
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
              {/* Store Name & URL */}
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
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Store URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#667185] whitespace-nowrap">daw.app/</span>
                    <Input
                      value={storeSlug}
                      onChange={(e) => setStoreSlug(e.target.value)}
                      className="h-11 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
                    />
                  </div>
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

              {/* Phone & Email */}
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
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#e4baca]">

                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-jGgLZj9vmgNyqApIPPBE0FtK9ciuuq.png"
                      alt="Store Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="mt-3 text-[14px] text-[#344054] hover:text-[#f10e7c] font-medium transition-colors">
                    Upload New Logo
                  </button>
                </div>
              </div>

              {/* Store Banner */}
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-3">Store Banner</label>
                <div className="w-full aspect-square rounded-lg bg-[#e4baca] flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="bg-white border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 px-5 rounded-lg font-medium text-[14px]"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Shop Status & Profile Photo */}
        <div className="space-y-8">
          {/* Shop Status */}
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Shop Status</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Status</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">Active</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Products</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">12</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Total Orders</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">45</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#667185]">Store Views</span>
                <span className="text-[15px] font-medium text-[#1d1d2a]">1,234</span>
              </div>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-6">
            <h2 className="text-[18px] font-semibold text-[#1d1d2a] mb-6">Profile Photo</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">Store URL</label>
                <div className="flex items-center gap-2">
                  <Input value={storeUrl} readOnly className="h-11 border-[#d0d5dd] bg-[#f9fafb] text-[#667185]" />
                  <button
                    onClick={handleCopyUrl}
                    className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#d0d5dd] hover:bg-[#f9fafb] transition-colors flex-shrink-0"
                  >
                    <Copy className="h-[18px] w-[18px] text-[#667185]" />
                  </button>
                </div>
                {copied && <p className="text-[12px] text-[#10b981] mt-1">Copied to clipboard!</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  className="border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px] bg-transparent"
                >
                  <Globe className="h-[18px] w-[18px] mr-2" />
                  Visit
                </Button>
                <Button
                  variant="outline"
                  className="border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px] bg-transparent"
                >
                  <Edit className="h-[18px] w-[18px] mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 rounded-lg font-medium text-[14px]"
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a] h-11 rounded-lg font-medium text-[14px]">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
