"use client"

import { useState } from "react"
import SettingsHeader from "@/components/cooperative-dashboard/settings/settings-header"
import SettingsTabs from "@/components/cooperative-dashboard/settings/settings-tabs"
import GeneralSettings from "@/components/cooperative-dashboard/settings/general-settings"
import MembersSettings from "@/components/cooperative-dashboard/settings/members-settings"
import NotificationsSettings from "@/components/cooperative-dashboard/settings/notifications-settings"
import BillingSettings from "@/components/cooperative-dashboard/settings/billing-settings"
import SecuritySettings from "@/components/cooperative-dashboard/settings/security-settings"
import AdvancedSettings from "@/components/cooperative-dashboard/settings/advanced-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <SettingsHeader />
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "members" && <MembersSettings />}
          {activeTab === "notifications" && <NotificationsSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "advanced" && <AdvancedSettings />}
        </div>
      </div>
    </div>
  )
}
