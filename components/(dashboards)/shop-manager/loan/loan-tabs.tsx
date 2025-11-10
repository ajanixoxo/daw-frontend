"use client"

interface LoanTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function LoanTabs({ activeTab, onTabChange }: LoanTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "contribution-tiers", label: "Contribution Tiers" },
    { id: "loan-history", label: "Loan History" },
    { id: "apply", label: "Apply for Loan" },
  ]

  return (
    <div className="grid grid-cols-1 gap-2 rounded-xl bg-gray-100 p-2 sm:grid-cols-2 lg:grid-cols-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`rounded-lg px-6 py-3 font-medium transition-all ${
            activeTab === tab.id ? "bg-[#f10e7c] text-white shadow-md" : "text-gray-600 hover:bg-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
