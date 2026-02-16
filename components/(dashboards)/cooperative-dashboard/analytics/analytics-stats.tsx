import { TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Monthly Revenue",
    value: "$7,200",
    change: "10% from last month",
    trend: "up",
    icon: "💰",
  },
  {
    label: "Growth Rate",
    value: "18.5%",
    change: "Monthly growth",
    trend: "neutral",
    icon: "📈",
  },
  {
    label: "Active Members",
    value: "26",
    change: "10% this month",
    trend: "up",
    icon: "👥",
  },
  {
    label: "Product Sold",
    value: "190",
    change: "This month",
    trend: "neutral",
    icon: "🛍️",
  },
  {
    label: "Goal Progress",
    value: "72%",
    change: "Requires Attention",
    trend: "neutral",
    icon: "🎯",
  },
]

export function AnalyticsStats() {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
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
              {stat.trend === "up" && (
                <TrendingUp
                  className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
                  strokeWidth={2.5}
                />
              )}
              <p className="text-[10px] font-medium">
                <span className={stat.trend === "up" ? "text-[#12B76A]" : "text-[#98A2B3]"}>
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
