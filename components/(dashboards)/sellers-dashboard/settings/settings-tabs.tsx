"use client"

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "data-privacy", label: "Data & Privacy" },
]

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="mt-6 md:mt-8 border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 font-medium text-sm md:text-base transition-all whitespace-nowrap rounded-t-lg ${
              activeTab === tab.id ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
