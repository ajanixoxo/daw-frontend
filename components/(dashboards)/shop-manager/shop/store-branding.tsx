"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export function StoreBranding() {
  const [logoPreview, setLogoPreview] = useState<string>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-g2ZH1TCR0w2qHtHJjUxx9ztGx463ER.png",
  )
  const [bannerPreview, setBannerPreview] = useState<string>("")

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold text-[#1c1c1c]">Store Branding</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Store Logo */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#1c1c1c]">Store Logo</Label>
          <div className="space-y-3">
            <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border border-[#e4e7ec]">
              {logoPreview ? (
                <img src={logoPreview || "/placeholder.svg"} alt="Store logo" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#f9f9f9] text-[#667185]">
                  No logo
                </div>
              )}
            </div>
            <label htmlFor="logoUpload">
              <div className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#1c1c1c] hover:text-[#f10e7c]">
                <Upload className="h-4 w-4" />
                Upload New Logo
              </div>
              <input id="logoUpload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            </label>
          </div>
        </div>

        {/* Store Banner */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#1c1c1c]">Store Banner</Label>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#e4e7ec]">
            {bannerPreview ? (
              <img
                src={bannerPreview || "/placeholder.svg"}
                alt="Store banner"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#e4baca]">
                <label htmlFor="bannerUpload">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white"
                    onClick={() => document.getElementById("bannerUpload")?.click()}
                  >
                    Choose File
                  </Button>
                  <input
                    id="bannerUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerChange}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
