"use client";

import { useState } from "react";
import { useGetAllShops } from "@/hooks/useShop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, Store, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";

export default function AllShopsPage() {
  const { data, isLoading, error } = useGetAllShops();
  const shops = data?.shops || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("best_match");
  const [priceRange, setPriceRange] = useState("all");
  const [shopType, setShopType] = useState("all");
  const [sellerType, setSellerType] = useState("all");

  // Filtering Logic
  let filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || shop.category === categoryFilter;
    const matchesSeller =
      sellerType === "all" ||
      (sellerType === "cooperative" && shop.is_member_shop) ||
      (sellerType === "sellers" && !shop.is_member_shop);
    return matchesSearch && matchesCategory && matchesSeller;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSortBy("best_match");
    setPriceRange("all");
    setShopType("all");
    setSellerType("all");
  };

  // Sorting Logic
  if (sortBy === "price") {
    // Currently sort by price is mocked since shops don't have a direct price field,
    // assuming it requires products. We could sort alphabetically instead or skip.
    // For demonstration, keep same or implement custom sort logic here.
  } else if (sortBy === "orders") {
    // Mock sort by orders
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F9FAFB] pt-24">
        {/* Page Title */}
        <div className="bg-[#F9FAFB] py-12 text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#101828]">
            African Women Marketplace Shops
          </h1>
          <p className="text-[#667085] max-w-2xl mx-auto">
            Discover authentic handcrafted products made by talented women
            entrepreneurs from across Africa.
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 lg:px-[84px] pb-20">
          {/* Filters Toolbar */}
          <div className="mb-8 space-y-4">
            {/* Top Row: Search and Cat Dropdown */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-white border-[#D0D5DD] rounded-full h-11 px-4">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 max-w-lg relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#98A2B3]" />
                <Input
                  placeholder="Search Shop..."
                  className="pl-10 h-11 bg-[#F2F4F7] border-transparent rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Bottom Row: Additional Filters & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full border-[#D0D5DD] h-9 text-sm px-4 whitespace-nowrap text-[#344054]"
                >
                  Clear Filters
                </Button>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-9 rounded-full border-[#D0D5DD] text-sm px-4 whitespace-nowrap text-[#344054] min-w-[100px] bg-transparent">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under_50">Under $50</SelectItem>
                    <SelectItem value="50_100">$50 - $100</SelectItem>
                    <SelectItem value="over_100">Over $100</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={shopType} onValueChange={setShopType}>
                  <SelectTrigger className="h-9 rounded-full border-[#D0D5DD] text-sm px-4 whitespace-nowrap text-[#344054] min-w-[100px] bg-transparent">
                    <SelectValue placeholder="Shop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Shop/Product</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sellerType} onValueChange={setSellerType}>
                  <SelectTrigger className="h-9 rounded-full border-[#D0D5DD] text-sm px-4 whitespace-nowrap text-[#344054] min-w-[130px] bg-transparent">
                    <SelectValue placeholder="Cooperative" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sellers</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                    <SelectItem value="sellers">Sellers</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-sm text-[#667085] ml-2 whitespace-nowrap hidden md:inline-block">
                  {filteredShops.length} results Found
                </span>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <span className="text-sm text-[#344054]">Sort By</span>
                <div className="flex items-center bg-white border border-[#D0D5DD] rounded-full p-1">
                  <button
                    onClick={() => setSortBy("best_match")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${sortBy === "best_match" ? "bg-[#fcebf5] text-[#f10e7c]" : "text-[#667085] hover:text-[#344054]"}`}
                  >
                    Best Match
                  </button>
                  <button
                    onClick={() => setSortBy("orders")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${sortBy === "orders" ? "bg-[#fcebf5] text-[#f10e7c]" : "text-[#667085] hover:text-[#344054]"}`}
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => setSortBy("price")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${sortBy === "price" ? "bg-[#fcebf5] text-[#f10e7c]" : "text-[#667085] hover:text-[#344054]"}`}
                  >
                    Price
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(categoryFilter !== "all" ||
              shopType !== "all" ||
              sellerType !== "all" ||
              priceRange !== "all" ||
              searchQuery !== "" ||
              sortBy === "price") && (
              <div className="flex flex-wrap items-center gap-2">
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setSearchQuery("")}
                  >
                    Search: {searchQuery}{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setCategoryFilter("all")}
                  >
                    Category: {categoryFilter}{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
                {shopType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setShopType("all")}
                  >
                    Type: {shopType}{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
                {sellerType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setSellerType("all")}
                  >
                    Seller:{" "}
                    {sellerType === "cooperative" ? "Cooperative" : "Sellers"}{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
                {priceRange !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setPriceRange("all")}
                  >
                    Price:{" "}
                    {priceRange === "under_50"
                      ? "Under $50"
                      : priceRange === "50_100"
                        ? "$50 - $100"
                        : "Over $100"}{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
                {sortBy === "price" && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer flex items-center"
                    onClick={() => setSortBy("best_match")}
                  >
                    Sort: Price <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Shops Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
            </div>
          ) : filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div
                  key={shop._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#EAECF0] group"
                >
                  {/* Banner */}
                  <div className="relative h-[200px] bg-[#f2e8ed]">
                    {shop.banner_url ? (
                      <Image
                        src={shop.banner_url}
                        alt={shop.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[#f10e7c]/10 to-[#f10e7c]/5" />
                    )}

                    {/* Logo Overlap */}
                    <div className="absolute -bottom-8 left-6">
                      <div className="h-20 w-20 rounded-2xl bg-white border-[3px] border-white shadow-sm flex items-center justify-center overflow-hidden">
                        {shop.logo_url ? (
                          <Image
                            src={shop.logo_url}
                            alt={shop.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Store className="w-8 h-8 text-[#f10e7c]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-12 px-6 pb-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-[#101828] line-clamp-1">
                        {shop.name}
                      </h3>
                      <span className="text-[#f10e7c] text-xs font-medium whitespace-nowrap">
                        {shop.productCount ?? 0} products
                      </span>
                    </div>

                    <p className="text-[#667085] text-sm mb-6 line-clamp-2 min-h-[40px]">
                      {shop.description ||
                        "Quality African fashion and accessories"}
                    </p>

                    <Link href={`/shop/${shop._id}`} className="w-full block">
                      <Button className="w-full bg-[#f10e7c] hover:bg-[#d90d6a] text-white rounded-full h-11">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Visit Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Store className="w-12 h-12 text-[#98A2B3] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#101828]">
                No shops found
              </h3>
              <p className="text-[#667085]">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
