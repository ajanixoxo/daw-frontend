"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Upload } from "lucide-react"

export function ProfileTab() {
  const [formData, setFormData] = useState({
    firstName: "Princewill",
    lastName: "Favour",
    email: "princewillfavour17@gmail.com",
    phone: "+234 90322353555",
    dawId: "DAW-2025-001",
    bio: "Passionate entrepreneur specializing in authentic African crafts and textiles. Member of Lagos Women's Cooperative since 2023.",
    businessName: "Faye's Complex",
    businessType: "Clothing & Jewellery",
    cooperative: "Lagos Women's Cooperatives",
    businessAddress: "123 Market Street, Victoria Island, Lagos, Nigeria",
  })

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
      {/* Left Column */}
      <div className="space-y-8">
        {/* Cooperative Profile */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Cooperative Profile</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dawId">DAW ID</Label>
              <Input
                id="dawId"
                value={formData.dawId}
                onChange={(e) => setFormData({ ...formData, dawId: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Business Information</h2>

          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cooperative">Cooperative</Label>
              <Input
                id="cooperative"
                value={formData.cooperative}
                onChange={(e) => setFormData({ ...formData, cooperative: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Textarea
              id="businessAddress"
              rows={3}
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Profile Photo */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Photo</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32 rounded-full bg-muted" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Account Status</h2>
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Verification</span>
              <span className="text-sm font-medium">Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Membership</span>
              <span className="text-sm font-medium">Premium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tier</span>
              <span className="text-sm font-medium">Silver</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button className="flex-1 bg-[#f10e7c] hover:bg-[#d00c6a]">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
