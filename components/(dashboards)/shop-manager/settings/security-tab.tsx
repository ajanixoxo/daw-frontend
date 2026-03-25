"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bell, Smartphone } from "lucide-react"
import { updateUserProfile } from "@/app/actions/profile"
import { useProfile } from "@/hooks/useProfile"
import { toast } from "sonner"

export function SecurityTab() {
  const { data: user, refetch } = useProfile()
  const [isUpdating2FA, setIsUpdating2FA] = useState(false)

  const handleEmailAuthChange = async (checked: boolean) => {
    setIsUpdating2FA(true)
    try {
      const result = await updateUserProfile({ isLoginOtpEnabled: checked })
      if (result.success) {
        toast.success(checked ? "Email Authentication enabled" : "Email Authentication disabled")
        refetch()
      } else {
        toast.error(result.error || "Failed to update 2FA settings")
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setIsUpdating2FA(false)
    }
  }

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

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <div className="font-medium">Email Authentication</div>
            <div className="text-sm text-muted-foreground">Receive login OTP codes securely via your email</div>
          </div>
          <Switch 
            disabled={isUpdating2FA}
            checked={user?.isLoginOtpEnabled || false} 
            onCheckedChange={handleEmailAuthChange} 
            className="data-[state=checked]:bg-[#E6007A]"
          />
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
