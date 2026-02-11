"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Percent, AlertCircle } from "lucide-react"
import { getLoanStats, LoanStats } from "@/app/actions/loans"

export function LoansStats() {
  const [stats, setStats] = useState<LoanStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const result = await getLoanStats()
        if (result.success && result.data) {
          setStats(result.data)
        }
      } catch (err) {
        console.error("Failed to load loan stats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      icon: Users,
      label: "Total Loans",
      value: loading ? "..." : `$${(stats?.totalDisbursed ?? 0).toLocaleString()}`,
      change: loading ? "" : "All time disbursed",
      changeType: "positive" as const,
    },
    {
      icon: Users,
      label: "Active Loans",
      value: loading ? "..." : String(stats?.activeLoans ?? 0),
      change: "Currently active",
      changeType: "neutral" as const,
    },
    {
      icon: Percent,
      label: "Repayment Rate",
      value: loading ? "..." : `${stats?.repaymentRate ?? 0}%`,
      change: loading ? "" : "Of total loans",
      changeType: "positive" as const,
    },
    {
      icon: AlertCircle,
      label: "Overdue Loans",
      value: loading ? "..." : String(stats?.overdueLoans ?? 0),
      change: loading ? "" : `$${(stats?.overdueAmount ?? 0).toLocaleString()}`,
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <div key={index} className={`rounded-xl bg-white p-6 shadow-sm ${loading ? "animate-pulse" : ""}`}>
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-[#ffedf6] p-2">
              <stat.icon className="h-5 w-5 text-[#f10e7c]" />
            </div>
            <span className="text-sm text-[#838794]">{stat.label}</span>
          </div>
          <div className="mb-2 text-2xl font-bold text-[#222222] sm:text-3xl">{stat.value}</div>
          <div className="flex items-center gap-1 text-sm">
            {stat.changeType === "positive" && <TrendingUp className="h-4 w-4 text-[#34c759]" />}
            <span className={stat.changeType === "positive" ? "text-[#34c759]" : "text-[#838794]"}>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
