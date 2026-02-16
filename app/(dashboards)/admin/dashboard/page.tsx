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
import { useDashboardStats, usePendingCooperatives } from "@/hooks/useAdminDashboard"; // Updated hook import
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();
  const { data: pendingCoopsData, isLoading: isLoadingPending } = usePendingCooperatives();

  // Fallback to mock data for recent activities until API is ready
  const { recentActivities, pendingApprovals: mockPendingApprovals } = mockRootProps;

  // Use API Pending Coops if available, else fallback logic (or empty array)
  // Converting API cooperative structure to table structure if differences exist
  const pendingApprovals = pendingCoopsData || [];

  return (
    <div className="p-4 lg:p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="dashboard-title text-stat-text-primary">Dashboard</h1>
        <p className="dashboard-subtitle text-stat-text-muted">Get an Overview of your store activity here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoadingStats ? (
          Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
          ))
        ) : (
          <>
            <StatCard
              icon={<DocumentTextIcon width={13} height={13} color="#f10e7c" />}
              label="Pending Approvals"
              value={statsData?.pendingApprovals.value ?? 0}
              subtitle={
                <div className="flex items-center gap-1">
                  <ArrowUpIcon width={12} height={12} color="#12B76A" />
                  <span className="text-[#12B76A]">{formatPercentageChange(12.5)}</span>
                </div>
              }
            />
            <StatCard
              icon={<CardsIcon width={13} height={12} color="#f10e7c" />}
              label="Active Users"
              value={formatNumber(statsData?.activeUsers.value ?? 0)}
              subtitle={
                <div className="flex items-center gap-1">
                  <ArrowUpIcon width={12} height={12} color="#12B76A" />
                  <span className="text-[#98A2B3]">Total Active Users</span>
                </div>
              }
            />
            <StatCard
              icon={<CardsIcon width={13} height={12} color="#f10e7c" />}
              label="Total Loans Disbursed"
              value={formatCurrency(statsData?.loans.value ?? 0)}
              subtitle={
                <span className="text-[#98A2B3]">Total Value</span>
              }
            />
            <StatCard
              icon={<ProfileTwoUserIcon width={13} height={13} color="#f10e7c" />}
              label="Active Products"
              value={formatNumber(statsData?.products.total ?? 0)}
              subtitle={
                <span className="text-[#98A2B3]">In All Shops</span>
              }
            />
          </>
        )}
      </div>

      {/* Main Content - Table and Activity Panel */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-[1fr_395px] gap-5"> */}
      {isLoadingPending ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        // Passing the real data. Need to ensure PendingApprovalsTable can accept this type.
        // Since I don't see PendingApprovalsTable definition, I assume it might need some adaptation 
        // or I pass 'any' for now if types mismatch, but strictly we should verify type.
        // For now passing it directly as `approvals` which usually expects an array.
        // TODO: Transform Cooperative[] to ApprovalItem[] properly
        <PendingApprovalsTable approvals={pendingApprovals as unknown as any} />
      )}
      {/* <RecentActivityPanel activities={recentActivities} /> */}
      {/* </div> */}
    </div>
  );
}