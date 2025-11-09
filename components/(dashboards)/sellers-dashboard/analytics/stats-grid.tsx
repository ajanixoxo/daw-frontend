import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/analytics/stat-card"

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$328,000"
        change="+10%"
        changeLabel="from last month"
        icon={DollarSign}
        trend="up"
      />
      <StatCard title="Total Order" value="96" changeLabel="Monthly growth" icon={ShoppingCart} />
      <StatCard title="Store Visitors" value="2,800" change="+10%" changeLabel="this month" icon={Users} trend="up" />
      <StatCard title="Conversion Rate" value="3.4%" changeLabel="This month" icon={TrendingUp} />
    </div>
  )
}
