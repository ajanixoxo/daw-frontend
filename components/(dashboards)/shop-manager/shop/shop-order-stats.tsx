import { Package, Clock, Truck, CheckCircle } from "lucide-react"
import { ArrowUp } from "lucide-react"

export function ShopOrderStats() {
  const stats = [
    {
      icon: Package,
      label: "Track Orders",
      value: "45",
      trend: "+10%",
      trendLabel: "from last week",
      color: "text-[#f10e7c]",
      bg: "bg-[#fccfe5]",
    },
    {
      icon: Clock,
      label: "Pending Orders",
      value: "3",
      subtitle: "Needs processing",
      color: "text-[#f10e7c]",
      bg: "bg-[#fccfe5]",
    },
    {
      icon: Truck,
      label: "Shipped",
      value: "7",
      subtitle: "On the way",
      color: "text-[#f10e7c]",
      bg: "bg-[#fccfe5]",
    },
    {
      icon: CheckCircle,
      label: "Delivered",
      value: "35",
      subtitle: "Completed orders",
      color: "text-[#f10e7c]",
      bg: "bg-[#fccfe5]",
    },
  ]

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-[#e4e7ec] bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className={`rounded-lg ${stat.bg} p-2`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <span className="text-sm text-[#667185]">{stat.label}</span>
          </div>
          <div className="mb-2 text-3xl font-bold text-[#1c1c1c]">{stat.value}</div>
          {stat.trend && (
            <div className="flex items-center gap-1 text-sm text-[#009a49]">
              <ArrowUp className="h-4 w-4" />
              <span className="font-medium">{stat.trend}</span>
              <span className="text-[#667185]">{stat.trendLabel}</span>
            </div>
          )}
          {stat.subtitle && <div className="text-sm text-[#667185]">{stat.subtitle}</div>}
        </div>
      ))}
    </div>
  )
}
