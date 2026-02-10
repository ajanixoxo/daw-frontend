"use client"

import { useState } from "react"
import { ActiveLoansTable } from "./active-loans-table"
import { LoanApplicationsTable } from "./loan-applications-table"
import { PendingApplicationsTable } from "./pending-applications-table"
import { LoanSettings } from "./loan-settings"

const tabs = ["Pending Applications", "Loan Applications", "Active Loans", "Loan Settings"]

export function LoansTabs() {
  const [activeTab, setActiveTab] = useState("Active Loans")

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:px-6 sm:py-3 ${
              activeTab === tab ? "bg-[#f10e7c] text-white" : "bg-white text-[#838794] hover:bg-[#f5f5f5]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Active Loans" && <ActiveLoansTable />}
      {activeTab === "Loan Applications" && <LoanApplicationsTable />}
      {activeTab === "Pending Applications" && <PendingApplicationsTable />}
      {activeTab === "Loan Settings" && <LoanSettings />}
    </div>
  )
}
