"use client"

import { useState } from "react";
import { UserStatCard } from "@/components/(dashboards)/admin-dashboard/user/UserStatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentTextUserIcon from "@/components/icons/DocumentTextUserIcon";
import CardsSellersIcon from "@/components/icons/CardsSellersIcon";
import CardsCategoriesIcon from "@/components/icons/CardsCategoriesIcon";
import SearchUserIcon from "@/components/icons/SearchUserIcon";
import FilterUserIcon from "@/components/icons/FilterUserIcon";
import { useAllCooperatives, useCooperativeAnalytics } from "@/hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { CooperativesTable } from "@/components/(dashboards)/admin-dashboard/cooperative/CooperativesTable";

const STATUSES = [
  { value: "approved", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
];

export default function CooperativePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data: cooperatives, isLoading: isLoadingCoops } = useAllCooperatives();
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useCooperativeAnalytics();

  const filteredCooperatives = cooperatives?.filter(coop => {
    const matchesSearch = (coop.name || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (coop.adminId?.email || "").toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === "" || coop.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleClearFilters = () => {
    setStatusFilter("");
    setFilterOpen(false);
  };

  const getStatValue = (status: string) => {
    if (status === "approved") {
      const approvedCount = analyticsData?.statusBreakdown.find((s: any) => s._id === "approved")?.count || 0;
      const activeCount = analyticsData?.statusBreakdown.find((s: any) => s._id === "active")?.count || 0;
      return approvedCount + activeCount;
    }
    return analyticsData?.statusBreakdown.find((s: any) => s._id === status)?.count || 0;
  };
 console.log(cooperatives)
  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Cooperative</h1>
        <p className="text-gray-500">
          Get an Overview of all cooperative activities here
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoadingAnalytics ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-xl" />)
        ) : (
          <>
            <UserStatCard
              icon={<DocumentTextUserIcon width={13} height={13} color="#f10e7c" />}
              label="Total Cooperatives"
              value={analyticsData?.summary.totalCooperatives || 0}
              subtitle={<span className="text-[#12B76A]">10% More than Previous</span>}
            />
            <UserStatCard
              icon={<CardsSellersIcon width={13} height={12} color="#f10e7c" />}
              label="Active Cooperatives"
              value={getStatValue("approved")}
              subtitle={<span className="text-[#98A2B3]">Cards Issued</span>}
            />
            <UserStatCard
              icon={<CardsCategoriesIcon width={13} height={12} color="#f10e7c" />}
              label="Pending Cooperatives"
              value={getStatValue("pending")}
              subtitle={<span className="text-[#F10E7C]">Requires Attention</span>}
            />
            <UserStatCard
              icon={<CardsCategoriesIcon width={13} height={12} color="#f10e7c" />}
              label="Suspended Cooperatives"
              value={getStatValue("suspended")}
              subtitle={<span className="text-[#F10E7C]">Requires Attention</span>}
            />
          </>
        )}
      </div>

      {/* Main Content Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">All Cooperatives</h2>
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
                className="pl-10 h-10 rounded-lg border-gray-200"
              />
            </div>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`gap-2 border-gray-200 ${statusFilter ? "border-[#f10e7c]" : ""}`}
                >
                  <FilterUserIcon width={13} height={12} color="#344054" />
                  <span>Filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}
                  >
                    <SelectTrigger>
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
                {statusFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-[#f10e7c]"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {isLoadingCoops ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : filteredCooperatives.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 italic">No cooperatives found.</p>
          </div>
        ) : (
          <CooperativesTable cooperatives={filteredCooperatives} />
        )}
      </div>
    </div>
  );
}
