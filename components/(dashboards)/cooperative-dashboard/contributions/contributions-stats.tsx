"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { getContributionStats, ContributionStats } from "@/app/actions/contributions"

export function ContributionsStats() {
  const [stats, setStats] = useState<ContributionStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const result = await getContributionStats()
        if (result.success && result.data) {
          setStats(result.data)
        }
      } catch (err) {
        console.error("Failed to load contribution stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      label: "Total Contributions",
      value: loading ? "..." : `$${(stats?.totalContributions ?? 0).toLocaleString()}`,
      change: loading ? "" : "All time",
      changeType: "positive" as const,
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      label: "Active Members",
      value: loading ? "..." : String(stats?.activeMembers ?? 0),
      change: "Contributing regularly",
      changeType: "neutral" as "positive" | "negative" | "neutral",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
        </svg>
      ),
      label: "Loan Eligible",
      value: loading ? "..." : String(stats?.loanEligible ?? 0),
      change: stats?.activeMembers
        ? `${Math.round(((stats?.loanEligible ?? 0) / stats.activeMembers) * 100)}% of active members`
        : "0% of active members",
      changeType: "positive" as const,
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      ),
      label: "Overdue Contributions",
      value: loading ? "..." : String(stats?.overdueContributions ?? 0),
      change: loading ? "" : `$${(stats?.overdueAmount ?? 0).toLocaleString()}`,
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <div key={index} className={`rounded-lg bg-white p-6 shadow-sm ${loading ? "animate-pulse" : ""}`}>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffedf6] text-[#f10e7c]">
              {stat.icon}
            </div>
            <span className="text-sm text-[#676767]">{stat.label}</span>
          </div>
          <div className="mb-2 text-2xl font-bold text-[#000000] sm:text-3xl">{stat.value}</div>
          <div
            className={`flex items-center gap-1 text-sm ${
              stat.changeType === "positive"
                ? "text-[#009a49]"
                : stat.changeType === "negative"
                  ? "text-[#ff383c]"
                  : "text-[#676767]"
            }`}
          >
            {stat.changeType === "positive" && <TrendingUp className="h-4 w-4" />}
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
