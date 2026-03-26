"use client"

import { useState } from "react";
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
import SearchUserIcon from "@/components/icons/SearchUserIcon";
import FilterUserIcon from "@/components/icons/FilterUserIcon";
import { useAllProducts } from "@/hooks/useAdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { ListingsTable } from "@/components/(dashboards)/admin-dashboard/listings/ListingsTable";
import { Download } from "lucide-react";

const CATEGORIES = [
  { value: "Fashion", label: "Fashion" },
  { value: "Electronics", label: "Electronics" },
  { value: "Home", label: "Home" },
];

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data: productsData, isLoading } = useAllProducts();
  const products = productsData?.products || [];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      product.seller_name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleClearFilters = () => {
    setCategoryFilter("");
    setFilterOpen(false);
  };

  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Listing Management</h1>
          <p className="text-gray-500">
            Manage product Listings and approvals
          </p>
        </div>
        <Button className="bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90 gap-2 h-11 px-6 rounded-lg">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Main Content Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">All Listings</h2>
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
                  className={`gap-2 border-gray-200 ${categoryFilter ? "border-[#f10e7c]" : ""}`}
                >
                  <FilterUserIcon width={13} height={12} color="#344054" />
                  <span>Filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) => setCategoryFilter(value === "all" ? "" : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {categoryFilter && (
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

        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 italic">No listings found.</p>
          </div>
        ) : (
          <ListingsTable products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
