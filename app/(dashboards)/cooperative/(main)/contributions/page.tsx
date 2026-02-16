"use client"

import { useState } from "react"
import { ContributionsHeader } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-header"
import { ContributionsStats } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-stats"
import { ContributionsTabs } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-tabs"
import { ContributionsList } from "@/components/(dashboards)/cooperative-dashboard/contributions/contributions-list"
import { ContributionTypesList } from "@/components/(dashboards)/cooperative-dashboard/contributions/contribution-types-list"
import { LoanEligibilityList } from "@/components/(dashboards)/cooperative-dashboard/contributions/loan-eligibility-list"

export default function ContributionsPage() {
  const [activeTab, setActiveTab] = useState("All Contributions")

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <ContributionsHeader />
        <ContributionsStats />
        <ContributionsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "All Contributions" && <ContributionsList />}
        {activeTab === "Contribution Types" && <ContributionTypesList />}
        {activeTab === "Loan Eligibility" && <LoanEligibilityList />}
      </div>
    </div>
  )
}
