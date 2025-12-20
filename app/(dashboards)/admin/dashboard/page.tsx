"use client"

import { StatCard } from "@/components/(dashboards)/admin-dashboard/dashboard/StatCard";
import { PendingApprovalsTable } from "@/components/(dashboards)/admin-dashboard/dashboard/PendingApprovalsTable";
import { RecentActivityPanel } from "@/components/(dashboards)/admin-dashboard/dashboard/RecentActivityPanel";
import { mockRootProps } from "@/components/(dashboards)/admin-dashboard/dashboard/dashboardMockData";
import { formatNumber, formatCurrency, formatPercentageChange } from "@/components/(dashboards)/admin-dashboard/dashboard/formatters";
import DocumentTextIcon from "@/components/icons/DocumentTextIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CardsIcon from "@/components/icons/CardsIcon";
import ProfileTwoUserIcon from "@/components/icons/ProfileTwoUserIcon";

export default function AdminDashboardPage() {
  const { stats, pendingApprovals, recentActivities } = mockRootProps;

  return (
    <div className="p-4 lg:p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="dashboard-title text-stat-text-primary">Dashboard</h1>
        <p className="dashboard-subtitle text-stat-text-muted">Get an Overview of your store activity here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <StatCard
          icon={<DocumentTextIcon width={13} height={13} color="#f10e7c" />}
          label="Pending Approvals"
          value={stats.pendingApprovals.value}
          subtitle={
            <div className="flex items-center gap-1 text-stat-increase-color">
              <ArrowUpIcon width={12} height={12} color="#009a49" />
              <span>{formatPercentageChange(stats.pendingApprovals.percentageChange)}</span>
            </div>
          }
        />
        <StatCard
          icon={<CardsIcon width={13} height={12} color="#f10e7c" />}
          label="Active Users"
          value={formatNumber(stats.activeUsers.value)}
          subtitle={
            <div className="flex items-center gap-1 text-stat-increase-color">
              <ArrowUpIcon width={12} height={12} color="#009a49" />
              <span className="text-stat-text-secondary">{stats.activeUsers.subtitle}</span>
            </div>
          }
        />
        <StatCard
          icon={<CardsIcon width={13} height={12} color="#f10e7c" />}
          label="Total Loans Disbursed"
          value={formatCurrency(stats.totalLoans.value)}
          subtitle={
            <span className="text-stat-text-secondary">{stats.totalLoans.subtitle}</span>
          }
        />
        <StatCard
          icon={<ProfileTwoUserIcon width={13} height={13} color="#f10e7c" />}
          label="Active Products"
          value={formatNumber(stats.activeProducts.value)}
          subtitle={
            <span className="text-stat-text-secondary">{stats.activeProducts.subtitle}</span>
          }
        />
      </div>

      {/* Main Content - Table and Activity Panel */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_395px] gap-5"> */}
        <PendingApprovalsTable approvals={pendingApprovals} />
        {/* <RecentActivityPanel activities={recentActivities} /> */}
      {/* </div> */}
    </div>
  );
}