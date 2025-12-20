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
    <div className="space-y-12">
      {/* Password & Authentication */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Password & Authentication</h2>

        <div className="max-w-2xl space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>

          <Button className="bg-[#f10e7c] hover:bg-[#d00c6a]">Update Password</Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="font-medium">SMS Authentication</div>
              <div className="text-sm text-muted-foreground">Receive codes via SMS</div>
            </div>
            <Switch checked={smsAuth} onCheckedChange={setSmsAuth} />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="font-medium">Email Authentication</div>
              <div className="text-sm text-muted-foreground">Receive codes via email</div>
            </div>
            <Switch checked={emailAuth} onCheckedChange={setEmailAuth} />
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Active Sessions</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Mobile App - iOS</div>
                <div className="text-sm text-muted-foreground">Last active: 2 hours ago</div>
              </div>
            </div>
            <span className="text-sm font-medium text-[#f10e7c]">Current</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Chrome Browser</div>
                <div className="text-sm text-muted-foreground">Lagos, Nigeria - 1 day ago</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
