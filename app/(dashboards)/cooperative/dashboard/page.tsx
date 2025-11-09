import { DashboardHeader } from '@/components/(dashboards)/cooperative-dashboard/dashboard/dashboard-header'
import { RecentOrders } from '@/components/(dashboards)/cooperative-dashboard/dashboard/recent-orders'
import { RevenueChart } from '@/components/(dashboards)/cooperative-dashboard/dashboard/revenue-chart'
import { StatsCards } from '@/components/(dashboards)/cooperative-dashboard/dashboard/stats-cards'
import { TopProducts } from '@/components/(dashboards)/cooperative-dashboard/dashboard/top-products'
import React from 'react'

const page = () => {
  return (
       <div className="min-h-screen bg-[#f9f9f9]">
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <DashboardHeader />
        <StatsCards />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <RevenueChart />
          <TopProducts />
        </div>
        <RecentOrders />
      </div>
    </div>
  )
}

export default page