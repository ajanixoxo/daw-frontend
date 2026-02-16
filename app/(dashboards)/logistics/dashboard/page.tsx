import { Package, Star, AlertCircle } from "lucide-react"
import { StatsCard } from "@/components/(dashboards)/logistics-dashboard/dashboard/stats-card"
import { PerformanceChart } from "@/components/(dashboards)/logistics-dashboard/dashboard/performance-chart"
import { RecentActivities } from "@/components/(dashboards)/logistics-dashboard/dashboard/recent-activities"
import { RecentsTable } from "@/components/(dashboards)/logistics-dashboard/dashboard/recents-table"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Get an Overview of your store activity here</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Shipment" value="5300" change="+12% from last month" trend="up" icon={Package} />
          <StatsCard title="Active Shipment" value="1300" change="Cards issued" trend="neutral" icon={Package} />
          <StatsCard title="Rating" value="4.8" change="Based on 85 reviews" trend="neutral" icon={Star} />
          <StatsCard
            title="Pending Requests"
            value="21"
            change="Requires Attention"
            trend="neutral"
            icon={AlertCircle}
          />
        </div>

        {/* Charts and Activities Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <RecentActivities />
          </div>
        </div>

        {/* Recents Table */}
        <RecentsTable />
      </div>
    </div>
  )
}
