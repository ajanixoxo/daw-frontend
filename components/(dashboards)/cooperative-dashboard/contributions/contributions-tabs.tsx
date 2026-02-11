"use client"

const tabs = ["All Contributions", "Contribution Types", "Loan Eligibility"]

interface ContributionsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function ContributionsTabs({ activeTab, onTabChange }: ContributionsTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === tab ? "bg-[#f10e7c] text-white" : "bg-white text-[#838794] hover:bg-[#f5f5f5]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
