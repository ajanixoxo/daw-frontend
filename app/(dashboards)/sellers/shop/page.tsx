"use client"

import { useRouter } from "next/navigation" 
import { Wallet, Users, TrendingUp, DollarSign, Share2, Edit } from "lucide-react"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"
import { Button } from "@/components/ui/button"

const topProducts = [
  { rank: 1, name: "Turtle Neck", sales: 45, price: "$17.84" },
  { rank: 2, name: "Turtle Neck", sales: 45, price: "$17.84" },
  { rank: 3, name: "Turtle Neck", sales: 45, price: "$17.84" },
  { rank: 4, name: "Turtle Neck", sales: 45, price: "$17.84" },
  { rank: 5, name: "Turtle Neck", sales: 45, price: "$17.84" },
]

const topRegions = [
  { rank: 1, name: "Nigeria", sales: 45, revenue: "$1700.84" },
  { rank: 2, name: "Belgium", sales: 45, revenue: "$1700.84" },
  { rank: 3, name: "Canada", sales: 45, revenue: "$1700.84" },
  { rank: 4, name: "South Africa", sales: 45, revenue: "$1700.84" },
  { rank: 5, name: "Mars", sales: 45, revenue: "$1700.84" },
]

export default function ShopPage() {
  const router = useRouter()

  return (
    <main className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-[28px] lg:text-[32px] font-bold text-[#000000] leading-tight mb-1">
                Store Management
              </h1>
              <p className="text-[14px] text-[#667185] leading-relaxed">Setup and manage your online store</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="outline"
                className="border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-11 px-5 rounded-lg font-medium text-[14px] bg-white"
              >
                <Share2 className="h-[18px] w-[18px] mr-2" />
                Share Shop
              </Button>
              <Button
                onClick={() => router.push("/shop/edit")}
                className="bg-[#000000] text-white hover:bg-[#1a1a1a] h-11 px-5 rounded-lg font-medium text-[14px]"
              >
                <Edit className="h-[18px] w-[18px] mr-2" />
                Edit Shop
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              icon={Wallet}
              title="Total Revenue"
              value="$75,000"
              subtitle="10% More than last month"
              trend="up"
              iconColor="#f10e7c"
            />
            <StatCard
              icon={Users}
              title="Visitors"
              value="2,840"
              subtitle="10% More than last month"
              trend="up"
              iconColor="#f10e7c"
            />
            <StatCard
              icon={TrendingUp}
              title="Conversion Rate"
              value="3.2%"
              subtitle="10% More than last month"
              trend="up"
              iconColor="#f10e7c"
            />
            <StatCard
              icon={DollarSign}
              title="Avg Order Value"
              value="$85.5"
              subtitle="10% More than last month"
              trend="up"
              iconColor="#f10e7c"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl border border-[#e7e8e9] overflow-hidden">
              <div className="px-6 py-5">
                <h2 className="text-[18px] font-semibold text-[#1d1d2a]">Top Products</h2>
              </div>
              <div className="divide-y divide-[#f0f2f5]">
                {topProducts.map((product) => (
                  <div
                    key={product.rank}
                    className="flex items-center justify-between px-6 py-4 hover:bg-[#fafafa] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f9f9f9]">
                        <span className="text-[14px] font-semibold text-[#1d1d2a]">#{product.rank}</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-[#1d1d2a] leading-tight">{product.name}</p>
                        <p className="text-[13px] text-[#667185] mt-1">{product.sales} sales</p>
                      </div>
                    </div>
                    <span className="text-[15px] font-medium text-[#1d1d2a]">{product.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Regions */}
            <div className="bg-white rounded-xl border border-[#e7e8e9] overflow-hidden">
              <div className="px-6 py-5">
                <h2 className="text-[18px] font-semibold text-[#1d1d2a]">Top Regions</h2>
              </div>
              <div className="divide-y divide-[#f0f2f5]">
                {topRegions.map((region) => (
                  <div
                    key={region.rank}
                    className="flex items-center justify-between px-6 py-4 hover:bg-[#fafafa] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f9f9f9]">
                        <span className="text-[14px] font-semibold text-[#1d1d2a]">#{region.rank}</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-[#1d1d2a] leading-tight">{region.name}</p>
                        <p className="text-[13px] text-[#667185] mt-1">{region.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-[#667185] leading-tight">Revenue</p>
                      <p className="text-[15px] font-medium text-[#1d1d2a] mt-1">{region.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
  )
}
