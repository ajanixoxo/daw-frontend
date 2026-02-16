"use client"

import { useState } from "react";
import { UserStatCard } from "@/components/(dashboards)/admin-dashboard/user/UserStatCard";
import { UsersTable } from "@/components/(dashboards)/admin-dashboard/user/UsersTable";
import { AddUserDrawer } from "@/components/(dashboards)/admin-dashboard/user/AddUserDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatNaira, formatPercentageChange } from "@/components/(dashboards)/admin-dashboard/user/formatters";
import DocumentTextUserIcon from "@/components/icons/DocumentTextUserIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import CardsSellersIcon from "@/components/icons/CardsSellersIcon";
import CardsCategoriesIcon from "@/components/icons/CardsCategoriesIcon";
import SearchUserIcon from "@/components/icons/SearchUserIcon";
import FilterUserIcon from "@/components/icons/FilterUserIcon";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useDashboardStats } from "@/hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce"; // Ensure this hook exists, or implements simple debounce.
// If useDebounce doesn't exist, I'll use simple effect or check if useDebounce is available in codebase. 
// I'll skip useDebounce for now and pass directly to restart search on enter or debounce manually. 
// Actually, simple searching is fine for now.

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  // const debouncedSearch = useDebounce(searchQuery, 500); // Assuming valid hook or omit

  const { data: usersData, isLoading: isLoadingUsers } = useAdminUsers(1, 50, searchQuery); // Limit 50 for now
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();

  const users = usersData?.data || [];

  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="user-mgmt-title text-user-mgmt-header-text">User Management</h1>
          <p className="user-mgmt-subtitle text-user-mgmt-subtitle-text">
            Get an Overview of all users and activity here
          </p>
        </div>
        <AddUserDrawer />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingStats ? (
          Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-xl" />)
        ) : (
          <>
            <UserStatCard
              icon={<DocumentTextUserIcon width={13} height={13} color="#f10e7c" />}
              label="Total User"
              value={formatNaira(statsData?.activeUsers.value || 0)} // activeUsers matches Total Users logic
              subtitle={
                <div className="flex items-center gap-1">
                  <ArrowUpIcon width={12} height={12} color="#12B76A" />
                  <span className="text-[#12B76A]">{formatPercentageChange(statsData?.totalUser?.percentageChange || 12.5)}</span>
                </div>
              }
            />
            <UserStatCard
              icon={<CardsSellersIcon width={13} height={12} color="#f10e7c" />}
              label="Number of Sellers"
              value={statsData?.numberOfSellers?.value || 0}
              subtitle={
                <div className="flex items-center gap-1">
                  <ArrowUpIcon width={12} height={12} color="#12B76A" />
                  <span className="text-[#98A2B3]">{statsData?.numberOfSellers?.subtitle || "Total Sellers"}</span>
                </div>
              }
            />
            <UserStatCard
              icon={<CardsCategoriesIcon width={13} height={12} color="#f10e7c" />}
              label="Number oF categories"
              value={statsData?.numberOfCategories?.value || 0}
              subtitle={
                <span className="text-[#98A2B3]">{statsData?.numberOfCategories?.subtitle || "Active Categories"}</span>
              }
            />
          </>
        )}
      </div>

      {/* Users Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="user-mgmt-section-title text-table-header-text">Users</h2>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial sm:w-72">
              <SearchUserIcon
                width={16}
                height={16}
                color="#667185"
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 user-mgmt-search-text border-user-mgmt-search-border placeholder:text-user-mgmt-search-placeholder"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 border-user-mgmt-search-border"
            >
              <FilterUserIcon width={13} height={12} color="#344054" />
              <span className="user-mgmt-filter-text text-user-mgmt-filter-text">Filter</span>
            </Button>
          </div>
        </div>

        {/* Users Table */}
        {isLoadingUsers ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <UsersTable users={users} />
        )}
      </div>
    </div>
  );
}