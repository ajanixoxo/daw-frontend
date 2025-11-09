"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

type TabType = "profile" | "notifications"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [profileData, setProfileData] = useState({
    firstName: "Princewill",
    lastName: "Favour",
    email: "princewillfavour17@gmail.com",
    phone: "+234 90322353555",
    timezone: "Eastern Time (EST)",
  })

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
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-12"
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
                      <p className="mt-1 text-sm text-muted-foreground">February 22, 2024 at 2:30 PM EST</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>New York, NY (IP: 192.168.1.100)</span>
                    </div>
                  </div>

                  {/* Account Created */}
                  <div className="flex items-start justify-between rounded-lg border border-border bg-card p-6">
                    <div>
                      <h3 className="font-semibold text-foreground">Account Created</h3>
                      <p className="mt-1 text-sm text-muted-foreground">January 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>38 days ago</span>
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
              <Button size="lg" className="bg-[#f10e7c] px-8 hover:bg-[#d10c69]">
                Save Changes
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
              <Button size="lg" className="bg-[#f10e7c] px-8 hover:bg-[#d10c69]">
                Save Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
