"use client"

import { useState } from "react"
import { CooperativeSettingsTabs } from "@/components/(dashboards)/shop-manager/settings/cooperative-settings-tabs"
import { ProfileTab } from "@/components/(dashboards)/shop-manager/settings/profile-tab"
import { SecurityTab } from "@/components/(dashboards)/shop-manager/settings/security-tab"
import { NotificationsTab } from "@/components/(dashboards)/shop-manager/settings/notifications-tab"
import { BillingTab } from "@/components/(dashboards)/shop-manager/settings/ billing-tab"
import { DataPrivacyTab } from "@/components/(dashboards)/shop-manager/settings/data-privacy-tab"

export default function CooperativeSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your cooperative settings and preferences</p>
        </div>

        <CooperativeSettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "billing" && <BillingTab />}
          {activeTab === "data-privacy" && <DataPrivacyTab />}
        </div>
      </div>
    </div>
  )
}
