"use client"

import { Package, CircleDollarSign, Briefcase, TrendingUp } from "lucide-react"
import { useState } from "react"
import LoanStatsCard from "@/components/(dashboards)/shop-manager/loan/loan-stats-card"
import LoanTabs from "@/components/(dashboards)/shop-manager/loan/loan-tabs"
import OverviewTab from "@/components/(dashboards)/shop-manager/loan/overview-tab"
import ContributionTiersTab from "@/components/(dashboards)/shop-manager/loan/contribution-tiers-tab"
import LoanHistoryTab from "@/components/(dashboards)/shop-manager/loan/loan-history-tab"
import ApplyForLoanTab from "@/components/(dashboards)/shop-manager/loan/apply-for-loan-tab"

export default function LoanPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      icon: Package,
      label: "Current Tier",
      value: "Silver",
      description: "Contribution: ₦35,000",
    },
    {
      icon: CircleDollarSign,
      label: "Available Credit",
      value: "₦75,000",
      description: "Max loan amount",
    },
    {
      icon: Briefcase,
      label: "Active Loans",
      value: "1",
      description: "₦5,000 remaining",
    },
    {
      icon: TrendingUp,
      label: "Interest Rate",
      value: "6%",
      description: "Annual percentage",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Loan Management</h1>
            <p className="mt-1 text-gray-600">Manage loan applications, approvals, and track repayments</p>
          </div>
          <button className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800">
            + Apply for Loan
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <LoanStatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Tabs */}
        <LoanTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "contribution-tiers" && <ContributionTiersTab />}
          {activeTab === "loan-history" && <LoanHistoryTab />}
          {activeTab === "apply" && <ApplyForLoanTab />}
        </div>
      </div>
    </div>
  )
}
