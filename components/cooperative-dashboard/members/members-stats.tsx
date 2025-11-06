import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Members",
    value: "₦100",
    change: "10% More than Previous",
    changeType: "positive",
    icon: Users,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
  {
    title: "Active Sellers",
    value: "12",
    change: "Cards Issued",
    changeType: "positive",
    icon: ShoppingBag,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
  {
    title: "Pending Invites",
    value: "65",
    change: "Requires Attention",
    changeType: "neutral",
    icon: Clock,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
]

export function MembersStats() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-[#e4e7ec] bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-[#838794]">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-[#1d1d2a]">{stat.value}</p>
                <div
                  className={`mt-3 flex items-center gap-1 text-xs ${
                    stat.changeType === "positive" ? "text-[#009a49]" : "text-[#838794]"
                  }`}
                >
                  {stat.changeType === "positive" && <TrendingUp className="h-3 w-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: stat.iconBg }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.iconColor }} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
