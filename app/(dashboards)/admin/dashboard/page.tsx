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
import { useDashboardStats, usePendingLoans } from "@/hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { getLedger } from "@/app/actions/wallet";
import { ILedgerEntry } from "@/types/wallet.types";
import { ActivityStatus } from "@/components/(dashboards)/admin-dashboard/dashboard/enums";
import { ActivityItem as ActivityItemType, ApprovalItem } from "@/components/(dashboards)/admin-dashboard/dashboard/schema";

export default function AdminDashboardPage() {
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();
  const { data: pendingLoansData, isLoading: isLoadingPending } = usePendingLoans();
  const [ledger, setLedger] = useState<ILedgerEntry[]>([]);
  const [isLoadingLedger, setIsLoadingLedger] = useState(true);

  useEffect(() => {
    async function fetchLedger() {
      try {
        const result = await getLedger();
        if (result.success && result.data) {
          setLedger(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch ledger for dashboard:", error);
      } finally {
        setIsLoadingLedger(false);
      }
    }
    fetchLedger();
  }, []);

  // Use API Pending Loans if available, else empty array
  const pendingApprovals = pendingLoansData || [];

  const mappedApprovals: ApprovalItem[] = pendingApprovals.map((loan) => ({
    id: loan._id,
    type: "Loan" as any, 
    name: loan.userId ? `${loan.userId.firstName} ${loan.userId.lastName}` : "Unknown User",
    submittedBy: loan.cooperativeId ? loan.cooperativeId.name : "Independent",
    orderDate: new Date(loan.createdAt),
    description: `Loan Purpose: ${loan.purpose || loan.amount}`,
  }));

  // Map ledger entries to activity items
  const recentActivities: ActivityItemType[] = ledger.slice(0, 5).map(item => ({
    id: item._id,
    description: item.narration || `${item.type} of ${item.amount}`,
    status: ActivityStatus.PENDING, // Mapping all to pending as status enum is limited
    timestamp: new Date(item.transactionDate),
  }));

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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_395px] gap-5">
        <div className="space-y-6">
          {isLoadingPending ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <PendingApprovalsTable approvals={mappedApprovals} />
          )}
        </div>

        <div className="space-y-6">
          {isLoadingLedger ? (
            <Skeleton className="h-[400px] w-full rounded-xl" />
          ) : (
            <RecentActivityPanel activities={recentActivities} />
          )}
        </div>
      </div>
    </div>
  );
}
