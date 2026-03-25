"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { MapPin, Calendar } from "lucide-react"
import { updateUserProfile } from "@/app/actions/profile"
import { useProfile } from "@/hooks/useProfile"
import { toast } from "sonner"

export default function SecuritySettings() {
  const { data: user, refetch } = useProfile()
  const [isUpdating2FA, setIsUpdating2FA] = useState(false)

  const [loginNotifications, setLoginNotifications] = useState(true)
  const [ipRestrictions, setIpRestrictions] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("24 hours")

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
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Authentication</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Email Authentication (2FA)</h3>
              <p className="text-sm text-gray-600">Receive login OTP codes securely via your email</p>
            </div>
            <Switch 
              disabled={isUpdating2FA}
              checked={user?.isLoginOtpEnabled || false} 
              onCheckedChange={handleEmailAuthChange} 
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Login Notifications</h3>
              <p className="text-sm text-gray-600">Get notified of new login attempts</p>
            </div>
            <Switch checked={loginNotifications} onCheckedChange={setLoginNotifications} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Access Control</h2>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Session Timeout</label>
            <Input value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">IP Restrictions</h3>
              <p className="text-sm text-gray-600">Limit access to specific IP addresses</p>
            </div>
            <Switch checked={ipRestrictions} onCheckedChange={setIpRestrictions} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Account Activity</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <h3 className="font-medium text-gray-900">Last Login</h3>
              <p className="text-sm text-gray-600">February 22, 2024 at 2:30 PM EST</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>New York, NY (IP: 192.168.1.100)</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <h3 className="font-medium text-gray-900">Account Created</h3>
              <p className="text-sm text-gray-600">January 15, 2024</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>38 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Update Security</Button>
      </div>
    </div>
  )
}
