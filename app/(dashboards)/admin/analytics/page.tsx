"use client"

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AnalyticsStatCard } from "@/components/(dashboards)/admin-dashboard/analytics/AnalyticsStatCard";
import { PlatformGrowthChart } from "@/components/(dashboards)/admin-dashboard/analytics/PlatformGrowthChart";
import { MonthlySalesChart } from "@/components/(dashboards)/admin-dashboard/analytics/MonthlySalesChart";
import { TopCooperativeItem } from "@/components/(dashboards)/admin-dashboard/analytics/TopCooperativeItem";
import { TopProductItem } from "@/components/(dashboards)/admin-dashboard/analytics/TopProductItem";
import { mockRootProps } from "@/components/(dashboards)/admin-dashboard/analytics/analyticsMockData";
import { formatPercentageChange } from "@/components/(dashboards)/admin-dashboard/analytics/formatters";
import { TabType } from "@/components/(dashboards)/admin-dashboard/analytics/enums";
import DocumentTextAnalyticsIcon from "@/components/icons/DocumentTextAnalyticsIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CardsAnalyticsIcon from "@/components/icons/CardsAnalyticsIcon";
import ListDocumentIcon from "@/components/icons/ListDocumentIcon";

export default function AnalyticsPage() {
  const { stats, platformGrowth, monthlySales, topCooperatives, topProducts } = mockRootProps;
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);

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
        <AnalyticsStatCard
          icon={<DocumentTextAnalyticsIcon width={13} height={13} color="#f10e7c" />}
          label="Active Users"
          value={stats.activeUsers.value}
          subtitle={
            <div className="flex items-center gap-1 text-stat-increase-color">
              <ArrowUpIcon width={12} height={12} color="#009a49" />
              <span>{formatPercentageChange(stats.activeUsers.percentageChange)}</span>
            </div>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Cooperatives"
          value={stats.cooperatives.value}
          subtitle={
            <div className="flex items-center gap-1 text-stat-increase-color">
              <ArrowUpIcon width={12} height={12} color="#009a49" />
              <span className="text-analytics-stat-text">{stats.cooperatives.subtitle}</span>
            </div>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Total Products"
          value={stats.totalProducts.value}
          subtitle={
            <span className="text-analytics-stat-text">{stats.totalProducts.subtitle}</span>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Pending Approvals"
          value={stats.pendingApprovals.value}
          subtitle={
            <span className="text-analytics-stat-text">{stats.pendingApprovals.subtitle}</span>
          }
        />
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
          {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_445px] gap-5"> */}
            {/* Left Column - Charts */}
            <div className="space-y-5">
              <PlatformGrowthChart data={platformGrowth} />
              <MonthlySalesChart data={monthlySales} />
            {/* </div> */}

            {/* Right Column - Rankings */}
            <div className="space-y-5">
              {/* Top Cooperatives */}
              {/* <Card className="p-6 rounded-xl border-none" style={{
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
                  {topCooperatives.map((cooperative) => (
                    <TopCooperativeItem key={cooperative.id} cooperative={cooperative} />
                  ))}
                </div>
              </Card> */}

              {/* Top Products */}
              {/* <Card className="p-6 rounded-xl border-none" style={{
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
                  {topProducts.map((product) => (
                    <TopProductItem key={product.id} product={product} />
                  ))}
                </div>
              </Card> */}
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