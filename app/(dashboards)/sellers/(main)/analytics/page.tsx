import { AnalyticsHeader } from "@/components/(dashboards)/sellers-dashboard/analytics/analytics-header"
import { StatsGrid } from "@/components/(dashboards)/sellers-dashboard/analytics/stats-grid"
import { SalesTrend } from "@/components/(dashboards)/sellers-dashboard/analytics/sales-trend"
import { MonthlyOrders } from "@/components/(dashboards)/sellers-dashboard/analytics/monthly-orders"
import { SalesByCategory } from "@/components/(dashboards)/sellers-dashboard/analytics/sales-by-category"
import { TrafficSources } from "@/components/(dashboards)/sellers-dashboard/analytics/traffic-sources"
import { TopPerformingMembers } from "@/components/(dashboards)/sellers-dashboard/analytics/top-performing-members"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <AnalyticsHeader />

        <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
          <StatsGrid />

          <div className="grid gap-6 lg:grid-cols-2">
            <SalesTrend />
            <MonthlyOrders />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SalesByCategory />
            <TrafficSources />
          </div>

          <TopPerformingMembers />
        </div>
      </div>
    </div>
  )
}
