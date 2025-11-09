import { TrendingUp, Users, Percent, AlertCircle } from "lucide-react"

const stats = [
  {
    icon: Users,
    label: "Total Loans",
    value: "$12,500,000",
    change: "10% from last month",
    changeType: "positive" as const,
  },
  {
    icon: Users,
    label: "Active Loans",
    value: "24",
    change: "3 new this week",
    changeType: "neutral" as const,
  },
  {
    icon: Percent,
    label: "Repayment Rate",
    value: "94.2%",
    change: "10% from last month",
    changeType: "positive" as const,
  },
  {
    icon: AlertCircle,
    label: "Overdue Loans",
    value: "3",
    change: "$650,000",
    changeType: "neutral" as const,
  },
]

export function LoansStats() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
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
