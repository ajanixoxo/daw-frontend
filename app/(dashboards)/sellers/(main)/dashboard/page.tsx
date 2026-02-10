"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { RevenueChart } from "@/components/(dashboards)/sellers-dashboard/revenue-chart";
import { RecentOrdersCard } from "@/components/(dashboards)/sellers-dashboard/recent-orders-card";
import { RecentOrdersTable } from "@/components/(dashboards)/sellers-dashboard/recent-orders-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Copy, Box, Users } from "lucide-react";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import { useSellerOrders } from "@/hooks/useSellerOrders";

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: productsData, isLoading: productsLoading } =
    useSellerProducts();
  const { data: ordersData, isLoading: ordersLoading } = useSellerOrders();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const products = productsData?.products || [];
  const orders = ordersData?.orders || [];

  return (
    <main className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 bg-[#fafafa]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-[24px] font-bold text-[#101828] leading-tight">
            Dashboard
          </h1>
          <p className="text-[13px] text-[#667085] mt-1 font-normal">
            Get an Overview of your store activity here
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Select defaultValue="jan-jul">
            <SelectTrigger className="w-full sm:w-[260px] h-9 border-[#e4e7ec] bg-white rounded-md text-[#344054] font-normal text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan-jul">
                Compare to: Jan. 04 - Jul. 04, 2025
              </SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FileText}
          title="Sales"
          value="$500"
          subtitleHighlight="10%"
          subtitle="More than Previous"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Copy}
          title="Total Orders"
          value="12"
          subtitle="Cards Issued"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Box}
          title="Total Product"
          value="65"
          subtitle="Requires Attention"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Users}
          title="Total Earning"
          value="$500"
          subtitle="With access to Cards"
          iconColor="#E6007A"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
        <div className="xl:col-span-2 min-h-[480px]">
          <RevenueChart orders={orders} />
        </div>
        <div className="xl:col-span-1 min-h-[480px]">
          <RecentOrdersCard
            orders={orders.slice(0, 6)}
            isLoading={ordersLoading}
          />
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="pt-2">
        <RecentOrdersTable orders={orders} isLoading={ordersLoading} />
      </div>
    </main>
  );
}
