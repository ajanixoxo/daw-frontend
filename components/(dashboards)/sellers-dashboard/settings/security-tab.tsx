"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Smartphone } from "lucide-react"

export function SecurityTab() {
  const [smsAuth, setSmsAuth] = useState(true)
  const [emailAuth, setEmailAuth] = useState(false)

  return (
    <div className="space-y-8">
      {/* Password & Authentication */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Password & Authentication</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="text-sm font-medium text-gray-700">
              Current Password
            </Label>
            <Input id="current-password" type="password" className="mt-1.5" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <Input id="new-password" type="password" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <Input id="confirm-password" type="password" className="mt-1.5" />
            </div>
          </div>
          <Button className="bg-[#f10e7c] hover:bg-[#d00c6a] text-white px-6">Update Password</Button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Two-Factor Authentication</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">SMS Authentication</h3>
              <p className="text-sm text-gray-500 mt-0.5">Receive codes via SMS</p>
            </div>
            <Switch checked={smsAuth} onCheckedChange={setSmsAuth} className="data-[state=checked]:bg-[#f10e7c]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Email Authentication</h3>
              <p className="text-sm text-gray-500 mt-0.5">Receive codes via email</p>
            </div>
            <Switch checked={emailAuth} onCheckedChange={setEmailAuth} className="data-[state=checked]:bg-[#f10e7c]" />
          </div>
        </div>
      </section>

      {/* Active Sessions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Sessions</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Mobile App - iOS</h3>
                <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#f10e7c] text-white text-xs font-medium rounded-full">Current</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Chrome Browser</h3>
                <p className="text-sm text-gray-500">Lagos, Nigeria - 1 day ago</p>
              </div>
            </div>
            <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
              Revoke
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
