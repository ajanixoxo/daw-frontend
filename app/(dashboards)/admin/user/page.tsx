"use client"

import { useState } from "react";
import { UserStatCard } from "@/components/(dashboards)/admin-dashboard/user/UserStatCard";
import { UsersTable } from "@/components/(dashboards)/admin-dashboard/user/UsersTable";
import { AddUserDrawer } from "@/components/(dashboards)/admin-dashboard/user/AddUserDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useDebounce } from "@/hooks/useDebounce";

const ROLES = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "cooperative_admin", label: "Coop Admin" },
  { value: "logistics_provider", label: "Logistics" },
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "invited", label: "Invited" },
];

const PAGE_SIZE = 10;

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data: usersData, isLoading: isLoadingUsers } = useAdminUsers({
    page: currentPage,
    limit: PAGE_SIZE,
    search: debouncedSearch,
    role: roleFilter,
    status: statusFilter,
  });
  const { data: statsData, isLoading: isLoadingStats } = useDashboardStats();

  const users = usersData?.data || [];
  const pagination = usersData?.pagination || { total: 0, page: 1, pages: 1 };

  const hasActiveFilters = roleFilter !== "" || statusFilter !== "";

  const handleClearFilters = () => {
    setRoleFilter("");
    setStatusFilter("");
    setCurrentPage(1);
    setFilterOpen(false);
  };

  // Reset page when search or filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

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
              value={formatNaira(statsData?.activeUsers.value || 0)}
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
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 user-mgmt-search-text border-user-mgmt-search-border placeholder:text-user-mgmt-search-placeholder"
              />
            </div>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`gap-2 border-user-mgmt-search-border relative ${hasActiveFilters ? "border-[#f10e7c]" : ""}`}
                >
                  <FilterUserIcon width={13} height={12} color="#344054" />
                  <span className="user-mgmt-filter-text text-user-mgmt-filter-text">Filter</span>
                  {hasActiveFilters && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#f10e7c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {(roleFilter ? 1 : 0) + (statusFilter ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 space-y-4 p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <Select
                    value={roleFilter}
                    onValueChange={(value) => {
                      setRoleFilter(value === "all" ? "" : value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full h-9 text-sm">
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      {ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value === "all" ? "" : value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-full h-9 text-sm">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      {STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-[#f10e7c] hover:text-[#d60c6e] hover:bg-[#f10e7c]/5"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active filter badges */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {roleFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F9F5FF] text-[#6941C6]">
                Role: {ROLES.find(r => r.value === roleFilter)?.label}
                <button onClick={() => { setRoleFilter(""); setCurrentPage(1); }} className="hover:opacity-70">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
                Status: {STATUSES.find(s => s.value === statusFilter)?.label}
                <button onClick={() => { setStatusFilter(""); setCurrentPage(1); }} className="hover:opacity-70">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </span>
            )}
          </div>
        )}

        {/* Users Table */}
        {isLoadingUsers ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-[10px] border border-user-mgmt-table-border p-12 text-center">
            <p className="text-gray-500 text-sm">
              {debouncedSearch || hasActiveFilters
                ? "No users found matching your criteria."
                : "No users yet."}
            </p>
          </div>
        ) : (
          <UsersTable users={users} />
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-500">
              Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, pagination.total)} of {pagination.total} users
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="h-8 px-3 text-sm"
              >
                Previous
              </Button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and neighbors
                  if (page === 1 || page === pagination.pages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .reduce<(number | string)[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                    acc.push("...");
                  }
                  acc.push(page);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-400">...</span>
                  ) : (
                    <Button
                      key={item}
                      variant={currentPage === item ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(item as number)}
                      className={`h-8 w-8 p-0 text-sm ${currentPage === item ? "bg-[#f10e7c] hover:bg-[#d60c6e] text-white" : ""}`}
                    >
                      {item}
                    </Button>
                  )
                )}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === pagination.pages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-8 px-3 text-sm"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
