import { ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-[#e4e7ec] bg-white">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffedf6]">
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-xs text-[#838794]">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-[#1d1d2a]">{stat.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {stat.trend === "up" && <ArrowUp className="h-3 w-3 text-[#009a49]" />}
              <p className={`text-xs ${stat.trend === "up" ? "text-[#009a49]" : "text-[#838794]"}`}>{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
