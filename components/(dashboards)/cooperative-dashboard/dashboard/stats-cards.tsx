import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Members",
    value: "284",
    change: "10% More than Previous",
    icon: Users,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
  {
    title: "Active Product",
    value: "65",
    change: "10% More than Previous",
    icon: ShoppingBag,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
  {
    title: "Total Orders",
    value: "12",
    change: "10% More than Previous",
    icon: ShoppingCart,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
  {
    title: "Revenue",
    value: "₦500",
    change: "10% More than Previous",
    icon: DollarSign,
    iconBg: "#ffedf6",
    iconColor: "#f10e7c",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-[#e4e7ec] bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-[#838794]">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-[#1d1d2a]">{stat.value}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#009a49]">
                  <TrendingUp className="h-3 w-3" />
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
