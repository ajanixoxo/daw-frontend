"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Loader2 } from "lucide-react"
import { useAuthStore } from "@/zustand/store"
import { updateUserProfile } from "@/app/actions/profile"
import { toast } from "sonner"

type TabType = "profile" | "notifications"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    timezone: "West Africa Time (WAT)",
  })

  // Sync state if user loads after mount
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "shipment",
      title: "Shipment Updates",
      description: "Receive notifications when shipment status changes",
      enabled: true,
    },
    {
      id: "delivery",
      title: "Delivery Alerts",
      description: "Get notified when deliveries are completed",
      enabled: false,
    },
    {
      id: "delay",
      title: "Delay Warnings",
      description: "Alert me when shipments are delayed",
      enabled: true,
    },
    {
      id: "system",
      title: "System Updates",
      description: "Notifications about system maintenance and updates",
      enabled: true,
    },
    {
      id: "email",
      title: "Daily Email Digest",
      description: "Receive a daily summary of all activities",
      enabled: true,
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleNotification = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif)))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const result = await updateUserProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      })

      if (result.success) {
        toast.success(result.message || "Profile updated successfully")
        // Optional: trigger a session refresh if needed
      } else {
        toast.error(result.error || "Failed to update profile")
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully")
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            {activeTab === "profile"
              ? "Manage your account and system preferences"
              : "Comprehensive insights into platform performance and user activity"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`rounded-xl px-6 py-3 text-center font-medium transition-all ${
              activeTab === "profile"
                ? "bg-[#f10e7c] text-white shadow-lg"
                : "bg-white text-muted-foreground hover:bg-muted"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`rounded-xl px-6 py-3 text-center font-medium transition-all ${
              activeTab === "notifications"
                ? "bg-[#f10e7c] text-white shadow-lg"
                : "bg-white text-muted-foreground hover:bg-muted"
            }`}
          >
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" ? (
          <div className="space-y-8">
            {/* Cooperative Profile */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-6 text-xl font-bold text-foreground">Cooperative Profile</h2>

                <div className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="h-12 bg-muted/50 cursor-not-allowed text-muted-foreground"
                    />
                  </div>

                  {/* Phone & Timezone */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input
                        id="timezone"
                        value={profileData.timezone}
                        onChange={(e) => handleInputChange("timezone", e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Activity */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-6 text-xl font-bold text-foreground">Account Activity</h2>

                <div className="space-y-4">
                  {/* Last Login */}
                  <div className="flex items-start justify-between rounded-lg border border-border bg-card p-6">
                    <div>
                      <h3 className="font-semibold text-foreground">Last Login</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {(user as any)?.lastLogin ? new Date((user as any).lastLogin).toLocaleString() : "Active Session"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{user?.country || "Location not tracked"}</span>
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="flex items-start justify-between rounded-lg border border-border bg-card p-6">
                    <div>
                      <h3 className="font-semibold text-foreground">Account Created</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Just now"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined active session</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Cancel
              </Button>
              <Button 
                size="lg" 
                className="bg-[#f10e7c] px-8 hover:bg-[#d10c69]" 
                onClick={handleSaveProfile} 
                disabled={isSaving}
              >
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Notifications Preferences */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="mb-6 text-xl font-bold text-foreground">Notifications Preferences</h2>

                <div className="space-y-6">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between border-b border-border pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch
                        checked={notification.enabled}
                        onCheckedChange={() => toggleNotification(notification.id)}
                        className="ml-4 data-[state=checked]:bg-[#f10e7c]"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Test Email Configuration
              </Button>
              <Button 
                size="lg" 
                className="bg-[#f10e7c] px-8 hover:bg-[#d10c69]"
                onClick={handleSaveNotifications}
              >
                Save Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
