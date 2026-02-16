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
      icon: "💰",
      label: "Total Contributions",
      value: loading ? "..." : `$${(stats?.totalContributions ?? 0).toLocaleString()}`,
      change: loading ? "" : "All time",
      changeType: "positive" as const,
    },
    {
      icon: "👥",
      label: "Active Members",
      value: loading ? "..." : String(stats?.activeMembers ?? 0),
      change: "Contributing regularly",
      changeType: "neutral" as const,
    },
    {
      icon: "💲",
      label: "Loan Eligible",
      value: loading ? "..." : String(stats?.loanEligible ?? 0),
      change: stats?.activeMembers
        ? `${Math.round(((stats?.loanEligible ?? 0) / stats.activeMembers) * 100)}% of active members`
        : "0% of active members",
      changeType: "positive" as const,
    },
    {
      icon: "⏰",
      label: "Overdue Contributions",
      value: loading ? "..." : String(stats?.overdueContributions ?? 0),
      change: loading ? "" : `$${(stats?.overdueAmount ?? 0).toLocaleString()}`,
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className={`bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20 ${loading ? "animate-pulse" : ""}`}>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#E6007A12" }}
            >
              <span className="text-sm">{stat.icon}</span>
            </div>
            <span className="text-[13px] font-medium text-[#667185] tracking-tight">{stat.label}</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">{stat.value}</h3>
            <div className="flex items-center gap-1">
              {stat.changeType === "positive" && (
                <TrendingUp
                  className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
                  strokeWidth={2.5}
                />
              )}
              <p className="text-[10px] font-medium">
                <span className={stat.changeType === "positive" ? "text-[#12B76A]" : "text-[#98A2B3]"}>
                  {stat.change}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
