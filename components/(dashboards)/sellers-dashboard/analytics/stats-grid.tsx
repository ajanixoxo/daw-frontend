import { Wallet, ShoppingCart, Users, DollarSign } from "lucide-react"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"

interface StatsGridProps {
  totalRevenue: number
  totalOrders: number
  viewCount: number
  avgOrderValue: number
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

export function StatsGrid({ totalRevenue, totalOrders, viewCount, avgOrderValue }: StatsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Wallet}
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        subtitleHighlight={`${totalOrders}`}
        subtitle="Total Orders"
        trend="up"
        iconColor="#E6007A"
      />
      <StatCard
        icon={ShoppingCart}
        title="Total Orders"
        value={String(totalOrders)}
        subtitle="Orders Placed"
        trend="up"
        iconColor="#E6007A"
      />
      <StatCard
        icon={Users}
        title="Store Visitors"
        value={viewCount.toLocaleString()}
        subtitle="Unique Visitors"
        trend="up"
        iconColor="#E6007A"
      />
      <StatCard
        icon={DollarSign}
        title="Avg Order Value"
        value={formatCurrency(avgOrderValue)}
        subtitle="Per Order"
        iconColor="#E6007A"
      />
    </div>
  )
}
