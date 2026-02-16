"use client"

import { useMemo } from "react"
import { AnalyticsHeader } from "@/components/(dashboards)/sellers-dashboard/analytics/analytics-header"
import { StatsGrid } from "@/components/(dashboards)/sellers-dashboard/analytics/stats-grid"
import { SalesTrend } from "@/components/(dashboards)/sellers-dashboard/analytics/sales-trend"
import { MonthlyOrders } from "@/components/(dashboards)/sellers-dashboard/analytics/monthly-orders"
import { SalesByCategory } from "@/components/(dashboards)/sellers-dashboard/analytics/sales-by-category"
import { TopPerformingProducts } from "@/components/(dashboards)/sellers-dashboard/analytics/top-performing-products"
import { useSellerOrders } from "@/hooks/useSellerOrders"
import { useSellerProducts } from "@/hooks/useSellerProducts"
import { useGetMyShop, useShopStats } from "@/hooks/useShop"
import { IOrder } from "@/types/product.types"

/** Aggregate orders into monthly buckets for the last 6 months */
function aggregateMonthly(orders: IOrder[]) {
  const now = new Date()
  const months: { key: string; label: string; revenue: number; orders: number }[] = []

  // Build last 6 months in chronological order
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("default", { month: "short" }),
      revenue: 0,
      orders: 0,
    })
  }

  // Bucket each order into its month
  orders.forEach((order) => {
    const d = new Date(order.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const bucket = months.find((m) => m.key === key)
    if (bucket) {
      bucket.revenue += order.total_amount || 0
      bucket.orders += 1
    }
  })

  return months
}

export default function AnalyticsPage() {
  const { data: shopData } = useGetMyShop()
  const shop = shopData?.shop

  const { data: ordersData } = useSellerOrders()
  const orders = ordersData?.orders ?? []

  const { data: productsData } = useSellerProducts()
  const products = productsData?.products ?? []

  const { data: statsData } = useShopStats(shop?._id)
  const viewCount = statsData?.viewCount ?? 0

  // Compute stats from real data
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
    const totalOrders = orders.length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    return { totalRevenue, totalOrders, avgOrderValue }
  }, [orders])

  // Monthly aggregation for charts
  const monthlyData = useMemo(() => aggregateMonthly(orders), [orders])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <AnalyticsHeader />

        <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
          <StatsGrid
            totalRevenue={stats.totalRevenue}
            totalOrders={stats.totalOrders}
            viewCount={viewCount}
            avgOrderValue={stats.avgOrderValue}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <SalesTrend data={monthlyData} />
            <MonthlyOrders data={monthlyData} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SalesByCategory products={products} />
            <TopPerformingProducts products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
