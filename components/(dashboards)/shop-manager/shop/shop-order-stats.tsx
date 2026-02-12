import { Package, Clock, Truck, CheckCircle, TrendingUp } from "lucide-react"

export function ShopOrderStats() {
  const stats = [
    {
      icon: Package,
      label: "Track Orders",
      value: "45",
      trend: "+10%",
      trendLabel: "from last week",
    },
    {
      icon: Clock,
      label: "Pending Orders",
      value: "3",
      subtitle: "Needs processing",
    },
    {
      icon: Truck,
      label: "Shipped",
      value: "7",
      subtitle: "On the way",
    },
    {
      icon: CheckCircle,
      label: "Delivered",
      value: "35",
      subtitle: "Completed orders",
    },
  ]

  return (
    <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
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
              {stat.trend && (
                <TrendingUp
                  className="h-[12px] w-[12px] text-[#12B76A] shrink-0"
                  strokeWidth={2.5}
                />
              )}
              <p className="text-[10px] font-medium">
                {stat.trend && <span className="text-[#12B76A] mr-1">{stat.trend}</span>}
                <span className="text-[#98A2B3]">{stat.trendLabel || stat.subtitle}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
