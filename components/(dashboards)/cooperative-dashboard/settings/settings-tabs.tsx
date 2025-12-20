"use client"

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: "general", label: "General" },
    { id: "members", label: "Members" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
    { id: "security", label: "Security" },
    { id: "advanced", label: "Advanced" },
  ]

  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id ? "bg-[#f10e7c] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
