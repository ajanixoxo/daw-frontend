import { Package, TrendingUp, Users, Store } from "lucide-react"
import { ShopStatsCard } from "@/components/(dashboards)/shop-manager/shop/shop-stats-card"
import { ShopCard } from "@/components/(dashboards)/shop-manager/shop/shop-card"
import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const shops = [
    {
      id: "fayes-complex",
      name: "Faye's Complex",
      url: "daw.app/fayes-complex",
      products: 28,
      orders: 89,
      revenue: 35000,
      status: "active" as const,
    },
    {
      id: "fayes-complex-2",
      name: "Faye's Complex",
      url: "daw.app/fayes-complex",
      products: 28,
      orders: 89,
      revenue: 35000,
      status: "active" as const,
    },
    {
      id: "fayes-complex-3",
      name: "Faye's Complex",
      url: "daw.app/fayes-complex",
      products: 28,
      orders: 89,
      revenue: 35000,
      status: "active" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1c1c1c] md:text-4xl">Shop Management</h1>
            <p className="mt-2 text-[#667185]">Setup and manage your online store</p>
          </div>
          <Button className="bg-[#1c1c1c] text-white hover:bg-[#292d32]">
            <span className="mr-2 text-xl">+</span>
            Add New Shop
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ShopStatsCard
            icon={Package}
            label="Total Revenue"
            value="₦75,000"
            trend="+10%"
            trendLabel="More than last month"
          />
          <ShopStatsCard icon={Users} label="Visitors" value="2,840" trend="+10%" trendLabel="More than last month" />
          <ShopStatsCard
            icon={TrendingUp}
            label="Conversion Rate"
            value="3.2%"
            trend="+10%"
            trendLabel="More than last month"
          />
          <ShopStatsCard
            icon={Store}
            label="Top Store"
            value="Faye's Complex"
            subtitle="Average of 40% of your sales"
            showTrend={false}
          />
        </div>

        {/* All Stores Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1c1c1c]">All Store</h2>
          <p className="mt-1 text-[#667185]">View and manage all stores</p>
        </div>

        {/* Shop Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}
