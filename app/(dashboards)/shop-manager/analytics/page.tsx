"use client"

import { Calendar, Download } from "lucide-react"
import AnalyticsStatsCard from "@/components/(dashboards)/shop-manager/analytics/analytics-stats-card"
import SalesTrendChart from "@/components/(dashboards)/shop-manager/analytics/sales-trend-chart"
import MonthlyOrdersChart from "@/components/(dashboards)/shop-manager/analytics/monthly-orders-chart"
import SalesByCategoryChart from "@/components/(dashboards)/shop-manager/analytics/sales-by-category-chart"
import TrafficSources from "@/components/(dashboards)/shop-manager/analytics/traffic-sources"
import TopPerformingMembers from "@/components/(dashboards)/shop-manager/analytics/top-performing-members"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="mt-1 text-muted-foreground">
              Comprehensive insights into platform performance and user activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">
              <Calendar className="h-4 w-4" />
              Last 30 days
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsStatsCard title="Total Revenue" value="$328,000" subtitle="10% from last month" trend="up" />
          <AnalyticsStatsCard title="Total Order" value="96" subtitle="Monthly growth" trend="neutral" />
          <AnalyticsStatsCard title="Store Visitors" value="2,800" subtitle="10% this month" trend="up" />
          <AnalyticsStatsCard title="Conversion Rate" value="3.4%" subtitle="This month" trend="neutral" />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SalesTrendChart />
          <MonthlyOrdersChart />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SalesByCategoryChart />
          <TrafficSources />
        </div>

        {/* Top Performing Members */}
        <TopPerformingMembers />
      </div>
    </div>
  )
}
