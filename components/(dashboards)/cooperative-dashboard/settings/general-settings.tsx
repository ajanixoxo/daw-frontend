"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    cooperativeName: "Digital African Women",
    registrationNumber: "DAW-COOP-2025-001",
    description: "A cooperative dedicated to empowering African women through digital commerce and entrepreneurship.",
    email: "admin@daw-cooperative.com",
    phone: "+234 9032353555",
    address: "123 Innovation Street, Lagos, Nigeria",
    timezone: "Africa/Lagos (WAT)",
    currency: "USD - US Dollar",
  })

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Cooperative Profile</h2>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Cooperative Name</label>
              <Input
                value={formData.cooperativeName}
                onChange={(e) => setFormData({ ...formData, cooperativeName: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Registration Number</label>
              <Input
                value={formData.registrationNumber}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] w-full"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Primary Contact Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Phone Number</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Time Zone</label>
              <Input
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Currency</label>
              <Input
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="px-6 bg-transparent">
          Reset to Default
        </Button>
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Save Changes</Button>
      </div>
    </div>
  )
}
