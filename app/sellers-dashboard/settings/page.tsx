"use client"

import { useState } from "react"
import { SettingsHeader } from "@/components/sellers-dashboard/settings/settings-header"
import { SettingsTabs } from "@/components/sellers-dashboard/settings/settings-tabs"
import { ProfileForm } from "@/components/sellers-dashboard/settings/profile-form"
import { ProfilePhotoSection } from "@/components/sellers-dashboard/settings/profile-photo-section"
import { AccountStatusSection } from "@/components/sellers-dashboard/settings/account-status-section"
import { SecurityTab } from "@/components/sellers-dashboard/settings/security-tab"
import { NotificationsTab } from "@/components/sellers-dashboard/settings/notifications-tab"
import { BillingTab } from "@/components/sellers-dashboard/settings/billing-tab"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 max-w-7xl">
        <SettingsHeader />
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" && (
          <>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                <ProfileForm />
              </div>

              {/* Right column - Photo & Status */}
              <div className="space-y-8">
                <ProfilePhotoSection />
                <AccountStatusSection />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <div className="mt-8">
            <SecurityTab />
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="mt-8">
            <NotificationsTab />
          </div>
        )}

        {activeTab === "billing" && (
          <div className="mt-8">
            <BillingTab />
          </div>
        )}

        {activeTab === "data-privacy" && (
          <div className="mt-8">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Data & Privacy</h2>
              <p className="text-gray-500">Privacy settings coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
