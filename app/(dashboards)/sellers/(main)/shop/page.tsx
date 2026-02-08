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
import { useGetMyShop } from "@/hooks/useShop";
import { useProductsByShop } from "@/hooks/useProducts";

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
          <h2 className="text-xl font-semibold text-[#101828]">No Shop Found</h2>
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
      <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-2xl bg-[#f2e8ed] flex items-center justify-center overflow-hidden">
              {shop.logo_url ? (
                <Image
                  src={shop.logo_url}
                  alt="Shop Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Store className="w-12 h-12 text-[#f10e7c]" />
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full pt-1">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold text-[#101828]">
                    {shop.name}
                  </h2>
                  {shop.status === "active" && (
                    <Badge
                      variant="secondary"
                      className="bg-[#ECFDF3] text-[#027A48] hover:bg-[#ECFDF3] border-none font-medium px-2.5 py-0.5 rounded-full text-xs"
                    >
                      Active
                    </Badge>
                  )}
                  {shop.is_member_shop && (
                    <Badge
                      variant="secondary"
                      className="bg-[#fcebf5] text-[#f10e7c] hover:bg-[#fcebf5] border-none font-medium px-2.5 py-0.5 rounded-full text-xs"
                    >
                      DAW Member
                    </Badge>
                  )}
                </div>

                <p className="text-[#475467] text-[15px]">
                  {shop.description || "No description provided"}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#475467]">
                  {shop.category && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#FDB022] fill-[#FDB022]" />
                      <span className="font-medium text-[#101828]">{shop.category}</span>
                    </div>
                  )}
                  {shop.business_address && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#98A2B3]" />
                      <span>{shop.business_address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#98A2B3]" />
                    <span>Member since {memberSince}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#f10e7c]" />
                    <span className="font-bold text-[#101828]">{productCount}</span>
                    <span className="text-[#475467] text-sm">Products</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Right Aligned on Desktop */}
              <div className="flex items-center gap-2 mt-1 self-start">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#667085] hover:text-[#f10e7c] hover:bg-[#fff5f9] rounded-full h-10 w-10"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#667085] hover:text-[#f10e7c] hover:bg-[#fff5f9] rounded-full h-10 w-10"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={Wallet}
          title="Total Revenue"
          value="$75,000"
          subtitle="10% More than last month"
          trend="up"
          iconColor="#f10e7c"
        />
        <StatCard
          icon={Users}
          title="Visitors"
          value="2,840"
          subtitle="10% More than last month"
          trend="up"
          iconColor="#f10e7c"
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value="3.2%"
          subtitle="10% More than last month"
          trend="up"
          iconColor="#f10e7c"
        />
        <StatCard
          icon={DollarSign}
          title="Avg Order Value"
          value="$85.5"
          subtitle="10% More than last month"
          trend="up"
          iconColor="#f10e7c"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-[#EAECF0] overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#101828]">
              Top Products
            </h2>
          </div>
          <div className="divide-y divide-[#EAECF0]">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F2F4F7] text-xs font-medium text-[#475467] group-hover:bg-white group-hover:shadow-sm transition-all">
                      #{index + 1}
                    </div>
                    {product.images?.[0] && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F2F4F7] flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-[#101828] leading-tight">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#667085] mt-1">
                        {product.quantity} in stock
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#344054]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <Package className="w-8 h-8 text-[#98A2B3] mx-auto mb-2" />
                <p className="text-sm text-[#667085]">No products yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Regions */}
        <div className="bg-white rounded-xl border border-[#EAECF0] overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-[#EAECF0] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#101828]">
              Top Regions
            </h2>
          </div>
          <div className="divide-y divide-[#EAECF0]">
            {topRegions.map((region) => (
              <div
                key={region.rank}
                className="flex items-center justify-between px-6 py-4 hover:bg-[#F9FAFB] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F2F4F7] text-xs font-medium text-[#475467] group-hover:bg-white group-hover:shadow-sm transition-all">
                    #{region.rank}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101828] leading-tight">
                      {region.name}
                    </p>
                    <p className="text-xs text-[#667085] mt-1">
                      {region.sales}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#98A2B3] uppercase tracking-wide font-medium">
                    Revenue
                  </p>
                  <p className="text-sm font-medium text-[#344054]">
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
