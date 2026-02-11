"use client";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
  { id: "data-privacy", label: "Data & Privacy" },
];

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="mt-8 bg-white p-2 rounded-xl shadow-[0px_1px_2px_rgba(16,24,40,0.05)] border border-[#F2F4F7] w-full max-w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between w-full min-w-[800px] md:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2.5 font-bold text-[14px] transition-all whitespace-nowrap rounded-lg ${
              activeTab === tab.id
                ? "bg-[#E6007A] text-white shadow-sm"
                : "text-[#667185] hover:text-[#101828] hover:bg-[#F9FAFB]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
