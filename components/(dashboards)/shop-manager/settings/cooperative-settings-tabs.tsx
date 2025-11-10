"use client"

import { cn } from "@/lib/utils"

interface CooperativeSettingsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "data-privacy", label: "Data & Privacy" },
]

export function CooperativeSettingsTabs({ activeTab, onTabChange }: CooperativeSettingsTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap",
            activeTab === tab.id ? "bg-[#f10e7c] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
