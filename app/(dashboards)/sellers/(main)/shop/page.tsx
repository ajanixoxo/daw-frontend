"use client";

import { useRouter } from "next/navigation";
import {
  Wallet,
  Users,
  TrendingUp,
  DollarSign,
  Share2,
  Edit,
  MapPin,
  Calendar,
  Heart,
  Star,
  Package,
  Loader2,
  Store,
} from "lucide-react";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useGetMyShop, useShopStats } from "@/hooks/useShop";
import { useProductsByShop } from "@/hooks/useProducts";
import { useSellerOrders } from "@/hooks/useSellerOrders";

const topRegions = [
  { rank: 1, name: "Nigeria", sales: "45 sales", revenue: "$1700.84" },
  { rank: 2, name: "Belgium", sales: "45 sales", revenue: "$1700.84" },
  { rank: 3, name: "Canada", sales: "45 sales", revenue: "$1700.84" },
  { rank: 4, name: "South Africa", sales: "45 sales", revenue: "$1700.84" },
  { rank: 5, name: "Mars", sales: "45 sales", revenue: "$1700.84" },
];

export default function ShopPage() {
  const router = useRouter();
  const { data: shopData, isLoading, error } = useGetMyShop();
  const shop = shopData?.shop;
  const productCount = shopData?.productCount ?? 0;

  const { data: products } = useProductsByShop(shop?._id);
  const topProducts = (products ?? []).slice(0, 5);

  const { data: ordersData } = useSellerOrders();
  const orders = ordersData?.orders ?? [];

  const { data: statsData } = useShopStats(shop?._id);
  const viewCount = statsData?.viewCount ?? 0;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  if (isLoading) {
    return (
      <main className="p-6 lg:p-8 bg-[#f9fafb] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
          <p className="text-sm text-[#667085]">Loading shop...</p>
        </div>
      </main>
    );
  }

  if (error || !shop) {
    return (
      <main className="p-6 lg:p-8 bg-[#f9fafb] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <Store className="w-12 h-12 text-[#98A2B3]" />
          <h2 className="text-xl font-semibold text-[#101828]">
            No Shop Found
          </h2>
          <p className="text-sm text-[#667085] max-w-md">
            You haven&apos;t created a shop yet. Create one to start selling.
          </p>
          <Button
            onClick={() => router.push("/sellers/shop/create")}
            className="bg-[#f10e7c] text-white hover:bg-[#d90d6a]"
          >
            Create Shop
          </Button>
        </div>
      </main>
    );
  }

  const memberSince = new Date(shop.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <main className="p-6 lg:p-8 space-y-8 bg-[#f9fafb] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101828]">Shop Management</h1>
          <p className="text-sm text-[#667085] mt-1">
            Setup and manage your online store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-white border-[#D0D5DD] text-[#344054] h-10 px-4 rounded-lg font-medium text-sm hover:bg-[#F9FAFB]"
          >
            <Users className="w-4 h-4 mr-2" />
            Request Shop Manager
          </Button>
          <Button
            variant="outline"
            className="bg-white border-[#D0D5DD] text-[#344054] h-10 px-4 rounded-lg font-medium text-sm hover:bg-[#F9FAFB]"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Shop
          </Button>
          <Button
            onClick={() => router.push("/sellers/shop/edit")}
            className="bg-[#000000] text-white h-10 px-4 rounded-lg font-medium text-sm hover:bg-[#1a1a1a]"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Shop
          </Button>
        </div>
      </div>

      {/* Banner Section */}
      <div className="relative h-[200px] w-full rounded-2xl overflow-hidden shadow-sm bg-[#f2e8ed]">
        {shop.banner_url ? (
          <Image
            src={shop.banner_url}
            alt="Shop Banner"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#f10e7c]/20 to-[#f10e7c]/5 flex items-center justify-center">
            <p className="text-[#98A2B3] text-sm">No banner uploaded</p>
          </div>
        )}
      </div>

      {/* Shop Profile Card */}
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_3px_rgba(16,24,40,0.05)]">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Logo */}
          <div className="relative group">
            <div className="h-32 w-32 rounded-2xl bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md">
              {shop.logo_url ? (
                <Image
                  src={shop.logo_url}
                  alt="Shop Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Store className="w-12 h-12 text-[#E6007A]" />
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-[28px] font-bold text-[#101828] leading-tight tracking-tight">
                    {shop.name}
                  </h2>
                  <div className="flex gap-2">
                    {shop.status === "active" && (
                      <span className="bg-[#ECFDF3] text-[#027A48] font-semibold px-3 py-1 rounded-full text-[12px]">
                        Active
                      </span>
                    )}
                    {shop.is_member_shop && (
                      <span className="bg-[#FEEBF6] text-[#E6007A] font-semibold px-3 py-1 rounded-full text-[12px]">
                        DAW Member
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[#475467] text-[16px] leading-relaxed max-w-2xl">
                  {shop.description || "No description provided."}
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px] text-[#667185]">
                  {shop.category && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#FDB022] fill-[#FDB022]" />
                      <span className="font-semibold text-[#101828]">
                        {shop.category}
                      </span>
                    </div>
                  )}
                  {shop.business_address && (
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4" />
                      <span>{shop.business_address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Package className="w-4 h-4" />
                    <span className="text-[#101828] font-bold">
                      {productCount}
                    </span>
                    <span>Products</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white border border-[#F2F4F7] text-[#667185] hover:text-[#E6007A] hover:bg-[#FEEBF6] rounded-xl h-11 w-11 shadow-sm transition-all"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white border border-[#F2F4F7] text-[#667185] hover:text-[#E6007A] hover:bg-[#FEEBF6] rounded-xl h-11 w-11 shadow-sm transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Wallet}
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle={`From ${totalOrders} order${totalOrders !== 1 ? "s" : ""}`}
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Users}
          title="Visitors"
          value={viewCount.toLocaleString()}
          subtitle="Total shop views"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={TrendingUp}
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          subtitle="All time orders"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={DollarSign}
          title="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
          subtitle={totalOrders > 0 ? "Per order average" : "No orders yet"}
          trend="up"
          iconColor="#E6007A"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-7 shadow-[0px_2px_4px_rgba(16,24,40,0.04)] border border-[#F2F4F7]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[20px] font-bold text-[#101828] tracking-tight">
              Top Products
            </h2>
            <Button
              variant="ghost"
              className="text-[13px] font-semibold text-[#E6007A] hover:bg-[#FEEBF6]"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl group transition-all duration-300 hover:bg-white hover:shadow-[0px_4px_12px_rgba(16,24,40,0.06)] hover:translate-x-1"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#F2F4F7] shadow-sm shrink-0 transition-transform group-hover:scale-110">
                      <span className="text-[14px] font-black text-[#101828]">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#1D2939] leading-tight group-hover:text-[#E6007A] transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[12px] font-semibold text-[#667185] mt-1">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold text-[#667185] tracking-tight">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-12 text-center bg-[#F9FAFB] rounded-2xl border border-dashed border-[#EAECF0]">
                <Package className="w-10 h-10 text-[#98A2B3] mx-auto mb-3" />
                <p className="text-[14px] font-medium text-[#667085]">
                  No products yet in your catalog
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Top Regions */}
        <div className="bg-white rounded-2xl p-7 shadow-[0px_2px_4px_rgba(16,24,40,0.04)] border border-[#F2F4F7]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[20px] font-bold text-[#101828] tracking-tight">
              Top Regions
            </h2>
            <Button
              variant="ghost"
              className="text-[13px] font-semibold text-[#E6007A] hover:bg-[#FEEBF6]"
            >
              Details
            </Button>
          </div>
          <div className="space-y-4">
            {topRegions.map((region) => (
              <div
                key={region.rank}
                className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0px_4px_12px_rgba(16,24,40,0.06)]"
              >
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#F2F4F7] shadow-sm shrink-0">
                    <span className="text-[14px] font-black text-[#101828]">
                      #{region.rank}
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#1D2939] leading-tight">
                      {region.name}
                    </p>
                    <p className="text-[12px] font-semibold text-[#667185] mt-1">
                      {region.sales}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#98A2B3] uppercase tracking-[0.05em] font-bold leading-tight">
                    Revenue
                  </p>
                  <p className="text-[15px] font-black text-[#101828] mt-1">
                    {region.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
