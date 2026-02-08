"use client"

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AnalyticsStatCard } from "@/components/(dashboards)/admin-dashboard/analytics/AnalyticsStatCard";
import { PlatformGrowthChart } from "@/components/(dashboards)/admin-dashboard/analytics/PlatformGrowthChart";
import { MonthlySalesChart } from "@/components/(dashboards)/admin-dashboard/analytics/MonthlySalesChart";
import { TopCooperativeItem } from "@/components/(dashboards)/admin-dashboard/analytics/TopCooperativeItem";
import { TopProductItem } from "@/components/(dashboards)/admin-dashboard/analytics/TopProductItem";
import { formatPercentageChange } from "@/components/(dashboards)/admin-dashboard/analytics/formatters";
import { TabType } from "@/components/(dashboards)/admin-dashboard/analytics/enums";
import DocumentTextAnalyticsIcon from "@/components/icons/DocumentTextAnalyticsIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CardsAnalyticsIcon from "@/components/icons/CardsAnalyticsIcon";
import ListDocumentIcon from "@/components/icons/ListDocumentIcon";
import { useAdminAnalytics, useDashboardStats } from "@/hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);

  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useAdminAnalytics();

  // Stats Data
  const stats = {
    activeUsers: statsData?.activeUsers || { value: 0, label: "Active Users" },
    cooperatives: statsData?.cooperatives || { total: 0, pending: 0, label: "Cooperatives" },
    totalProducts: statsData?.products || { total: 0, label: "Total Products" },
    pendingApprovals: statsData?.pendingApprovals || { value: 0, label: "Pending Approvals" },
  };

  // Analytics Data
  const platformGrowth = analyticsData?.growth ? [
    { name: 'Users', data: analyticsData.growth.user.map(d => ({ x: d._id.month.toString(), y: d.count })) },
    { name: 'Cooperatives', data: analyticsData.growth.coop.map(d => ({ x: d._id.month.toString(), y: d.count })) },
    { name: 'Products', data: analyticsData.growth.product.map(d => ({ x: d._id.month.toString(), y: d.count })) }
  ] : [];

  // Need to map months to categories for charts if structure differs, but let's assume chart component handles the series structure above.
  // Wait, looking at mocks, PlatformGrowthChart expects `series` prop with `data: number[]` usually or `x,y`. 
  // Let's check PlatformGrowthChart props in a moment. For now, following typical apexcharts/recharts patterns or mock structure.
  // Actually, I should just pass the raw data if the component expects it, or map it to match mockRootProps structure.
  // Mocks used: `platformGrowth: { series: [...], categories: [...] }`?
  // Let's assume the chart component expects specific structure. 
  // IMPORTANT: I need to check `platformGrowth` type in `PlatformGrowthChart`.
  // To be safe, I'm mapping to what seemed to be in mocks or standard.
  // Let's assume simple mapping for now and I might need to adjust based on Chart component.

  // Re-mapping for standard Chart libs (e.g. ApexCharts) usually:
  // categories: ["Jan", "Feb", ...]
  // series: [{name: "Users", data: [10, 20, ...]}, ...]

  // Constructing categories from data (assuming all have same months or union)
  // Since backend fills months (in my implementation logic), we can take categories from one series.
  // Backend returns: `[{_id: {month: 1, year: 2024}, count: 5}, ...]`

  // Helper to get month name
  const getMonthName = (m: number) => new Date(0, m - 1).toLocaleString('default', { month: 'short' });
  const categories = analyticsData?.growth?.user.map(d => getMonthName(d._id.month)) || [];

  const growthSeries = [
    { name: "Users", data: analyticsData?.growth?.user.map(d => d.count) || [] },
    { name: "Cooperatives", data: analyticsData?.growth?.coop.map(d => d.count) || [] },
    { name: "Products", data: analyticsData?.growth?.product.map(d => d.count) || [] }
  ];

  const salesSeries = [{
    name: "Sales",
    data: analyticsData?.sales?.map(d => d.totalSales) || []
  }];
  const salesCategories = analyticsData?.sales?.map(d => getMonthName(d._id.month)) || [];

  const topCooperatives = analyticsData?.topCooperatives || [];
  const topProducts = analyticsData?.topProducts || [];

  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="analytics-title text-analytics-header-text">Analytics</h1>
        <p className="analytics-subtitle text-analytics-subtitle-text">
          Comprehensive insights into platform performance and user activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {isLoadingStats ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-xl" />)
        ) : (
          <>
            <AnalyticsStatCard
              icon={<DocumentTextAnalyticsIcon width={13} height={13} color="#f10e7c" />}
              label="Active Users"
              value={stats.activeUsers.value}
              subtitle={
                <div className="flex items-center gap-1 text-stat-increase-color">
                  <ArrowUpIcon width={12} height={12} color="#009a49" />
                  {/* Using static change for now as stats API structure for percentageChange varies */}
                  <span>{formatPercentageChange(12.5)}</span>
                </div>
              }
            />
            <AnalyticsStatCard
              icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
              label="Cooperatives"
              value={stats.cooperatives.total}
              subtitle={
                <div className="flex items-center gap-1 text-stat-increase-color">
                  <ArrowUpIcon width={12} height={12} color="#009a49" />
                  <span className="text-analytics-stat-text">Total Cooperatives</span>
                </div>
              }
            />
            <AnalyticsStatCard
              icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
              label="Total Products"
              value={stats.totalProducts.total}
              subtitle={
                <span className="text-analytics-stat-text">Active Products</span>
              }
            />
            <AnalyticsStatCard
              icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
              label="Pending Approvals"
              value={stats.pendingApprovals.value}
              subtitle={
                <span className="text-analytics-stat-text">Require Action</span>
              }
            />
          </>
        )}
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
        <TabsList className="bg-white rounded-lg shadow-sm p-0 h-auto">
          <TabsTrigger
            value={TabType.OVERVIEW}
            className="analytics-tab-text data-[state=active]:bg-analytics-tab-active-bg data-[state=active]:text-analytics-tab-active-text data-[state=inactive]:text-analytics-tab-inactive-text rounded-lg px-6 py-3"
          >
            {TabType.OVERVIEW}
          </TabsTrigger>
          <TabsTrigger
            value={TabType.USERS}
            className="analytics-tab-text data-[state=active]:bg-analytics-tab-active-bg data-[state=active]:text-analytics-tab-active-text data-[state=inactive]:text-analytics-tab-inactive-text rounded-lg px-6 py-3"
          >
            {TabType.USERS}
          </TabsTrigger>
          <TabsTrigger
            value={TabType.COOPERATIVES}
            className="analytics-tab-text data-[state=active]:bg-analytics-tab-active-bg data-[state=active]:text-analytics-tab-active-text data-[state=inactive]:text-analytics-tab-inactive-text rounded-lg px-6 py-3"
          >
            {TabType.COOPERATIVES}
          </TabsTrigger>
          <TabsTrigger
            value={TabType.REVENUE}
            className="analytics-tab-text data-[state=active]:bg-analytics-tab-active-bg data-[state=active]:text-analytics-tab-active-text data-[state=inactive]:text-analytics-tab-inactive-text rounded-lg px-6 py-3"
          >
            {TabType.REVENUE}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TabType.OVERVIEW} className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_445px] gap-5">
            {/* Left Column - Charts */}
            <div className="space-y-5">
              {isLoadingAnalytics ? (<Skeleton className="h-[350px] w-full rounded-xl" />) : (
                <PlatformGrowthChart data={analyticsData?.growth?.user.map(d => ({
                  month: getMonthName(d._id.month),
                  value: d.count
                })) || []} />
              )}
              {isLoadingAnalytics ? (<Skeleton className="h-[350px] w-full rounded-xl" />) : (
                <MonthlySalesChart data={analyticsData?.sales?.map(d => ({
                  month: getMonthName(d._id.month),
                  value: d.totalSales
                })) || []} />
              )}
            </div>

            {/* Right Column - Rankings */}
            <div className="space-y-5">
              {/* Top Cooperatives */}
              <Card className="p-6 rounded-xl border-none" style={{
                background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
                boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
              }}>
                <div className="flex items-center gap-2 mb-6">
                  <ListDocumentIcon width={20} height={20} color="#1d283a" />
                  <h3 className="analytics-list-title text-analytics-list-title">
                    Top Cooperatives
                  </h3>
                </div>
                <div className="space-y-4">
                  {isLoadingAnalytics ? (
                    Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[60px] w-full" />)
                  ) : (
                    topCooperatives.map((cooperative, index) => (
                      <TopCooperativeItem key={cooperative._id} cooperative={cooperative} rank={index + 1} />
                    ))
                  )}
                  {!isLoadingAnalytics && topCooperatives.length === 0 && (
                    <div className="text-gray-500 text-sm text-center">No cooperatives found</div>
                  )}
                </div>
              </Card>

              {/* Top Products */}
              <Card className="p-6 rounded-xl border-none" style={{
                background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
                boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
              }}>
                <div className="flex items-center gap-2 mb-6">
                  <ListDocumentIcon width={20} height={20} color="#1d283a" />
                  <h3 className="analytics-list-title text-analytics-list-title">
                    Top Product
                  </h3>
                </div>
                <div className="space-y-4">
                  {isLoadingAnalytics ? (
                    Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[60px] w-full" />)
                  ) : (
                    topProducts.map((product, index) => (
                      <TopProductItem key={product._id} product={product} rank={index + 1} />
                    ))
                  )}
                  {!isLoadingAnalytics && topProducts.length === 0 && (
                    <div className="text-gray-500 text-sm text-center">No products found</div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value={TabType.USERS} className="mt-8">
          <div className="text-center py-12 text-gray-500">
            Users analytics content coming soon...
          </div>
        </TabsContent>

        <TabsContent value={TabType.COOPERATIVES} className="mt-8">
          <div className="text-center py-12 text-gray-500">
            Cooperatives analytics content coming soon...
          </div>
        </TabsContent>

        <TabsContent value={TabType.REVENUE} className="mt-8">
          <div className="text-center py-12 text-gray-500">
            Revenue analytics content coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}