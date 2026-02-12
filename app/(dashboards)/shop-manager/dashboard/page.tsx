import { Package, ShoppingCart, Box, DollarSign } from "lucide-react"
import { ShopStatsCard } from "@/components/(dashboards)/shop-manager/dashboard/shop-stats-card"
import { RevenueChart } from "@/components/(dashboards)/shop-manager/dashboard/revenue-chart"
import { RecentOrdersList } from "@/components/(dashboards)/shop-manager/dashboard/recent-orders-list"
import { OrdersTable } from "@/components/(dashboards)/shop-manager/dashboard/orders-table"

export default function ShopManagerPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header with Date Range */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Get an Overview of your store activity here</p>
          </div>
          <select className="rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Compare to: Jan. 04 - Jul. 04, 2025</option>
            <option>Compare to: Last 30 days</option>
            <option>Compare to: Last 90 days</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ShopStatsCard title="Sales" value="₦100" change="+10% More than Previous" trend="up" icon={DollarSign} />
          <ShopStatsCard title="Total Orders" value="12" change="Cards issued" trend="neutral" icon={ShoppingCart} />
          <ShopStatsCard title="Total Product" value="65" change="Requires Attention" trend="warning" icon={Box} />
          <ShopStatsCard
            title="Total Earning"
            value="$500"
            change="With access to Cards"
            trend="neutral"
            icon={Package}
          />
        </div>

        {/* Revenue Chart and Recent Orders Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <RevenueChart />
          <RecentOrdersList />
        </div>

        {/* Orders Table */}
        <OrdersTable />
      </div>
    </div>
  )
}
