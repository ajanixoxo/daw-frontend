"use client"

import { useState } from "react"

const tabs = ["Overview", "Revenue", "Members", "Products"]

export function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab ? "bg-[#f10e7c] text-white" : "bg-white text-[#676767] hover:bg-[#f7f7f7]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
