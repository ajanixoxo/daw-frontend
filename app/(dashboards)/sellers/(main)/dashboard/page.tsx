"use client"

import { useState, useEffect } from "react"
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card"
import { RevenueChart } from "@/components/(dashboards)/sellers-dashboard/revenue-chart"
import { RecentOrdersCard } from "@/components/(dashboards)/sellers-dashboard/recent-orders-card"
import { RecentOrdersTable } from "@/components/(dashboards)/sellers-dashboard/recent-orders-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, ShoppingCart, Package, Wallet } from "lucide-react"
import { useSellerProducts } from "@/hooks/useSellerProducts"
import { useSellerOrders } from "@/hooks/useSellerOrders"

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { data: productsData, isLoading: productsLoading } = useSellerProducts()
  const { data: ordersData, isLoading: ordersLoading } = useSellerOrders()
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const products = productsData?.products || []
  const orders = ordersData?.orders || []

  // Calculate statistics
  const totalProducts = products.length
  const totalOrders = orders.length
  
  // Calculate total sales (sum of all order amounts)
  const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
  
  // Calculate total earnings (sales minus discounts)
  const totalEarnings = orders.reduce((sum, order) => {
    const amount = order.total_amount || 0
    const discount = order.discount || 0
    return sum + (amount - discount)
  }, 0)

  // Get recent orders (last 5)
  const recentOrders = orders.slice(0, 5)

  return (
    <main className="p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-[32px] font-bold text-[#1d1d2a] leading-tight">Dashboard</h1>
              <p className="text-sm text-[#667185] mt-1">Get an Overview of your store activity here</p>
            </div>
            <Select defaultValue="jan-jul">
              <SelectTrigger className="w-full sm:w-[300px] h-10 border-[#e7e8e9]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-jul">Compare to: Jan. 04 - Jul. 04, 2025</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatCard
              icon={ShoppingBag}
              title="Sales"
              value={`₦${totalSales.toLocaleString()}`}
              subtitle={totalOrders > 0 ? `${totalOrders} orders` : "No orders yet"}
              trend={totalOrders > 0 ? "up" : undefined}
              iconColor="#f10e7c"
            />
            <StatCard 
              icon={ShoppingCart} 
              title="Total Orders" 
              value={totalOrders.toString()} 
              subtitle={isMounted && ordersLoading ? "Loading..." : "All time orders"} 
              iconColor="#f10e7c" 
            />
            <StatCard
              icon={Package}
              title="Total Products"
              value={totalProducts.toString()}
              subtitle={isMounted && productsLoading ? "Loading..." : "Active products"}
              iconColor="#f10e7c"
            />
            <StatCard
              icon={Wallet}
              title="Total Earnings"
              value={`₦${totalEarnings.toLocaleString()}`}
              subtitle="After discounts"
              iconColor="#f10e7c"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6 lg:mb-8">
            <div className="xl:col-span-2 h-[520px]">
              <RevenueChart orders={orders} />
            </div>
            <div className="xl:col-span-1 h-[520px]">
              <RecentOrdersCard orders={recentOrders} isLoading={ordersLoading} />
            </div>
          </div>

          {/* Recent Orders Table */}
          <RecentOrdersTable orders={orders} isLoading={ordersLoading} />
        </main>
  )
}
