"use client"

import { useState } from "react"

const tabs = ["All Members", "Active", "Pending", "Suspended"]

export function MembersTabs() {
  const [activeTab, setActiveTab] = useState("All Members")

  return (
    <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
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
