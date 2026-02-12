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
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className={`bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20 ${loading ? "animate-pulse" : ""}`}>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#E6007A12" }}
            >
              <stat.icon className="h-3.5 w-3.5 text-[#E6007A]" />
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
