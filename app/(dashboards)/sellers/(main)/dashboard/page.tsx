"use client";

import { useMemo } from "react";
import { StatCard } from "@/components/(dashboards)/sellers-dashboard/stat-card";
import { RevenueChart } from "@/components/(dashboards)/sellers-dashboard/revenue-chart";
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
  const { data: productsData } = useSellerProducts();
  const { data: ordersData, isLoading: ordersLoading } = useSellerOrders();

  const products = productsData?.products || [];
  const orders = ordersData?.orders || [];

  const stats = useMemo(() => {
    const totalSales = orders.reduce(
      (sum, order) => sum + (order.total_amount || 0),
      0,
    );
    return {
      totalSales,
      totalOrders: orders.length,
      totalProducts: products.length,
      totalEarnings: totalSales,
    };
  }, [orders, products]);

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

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
          value={formatCurrency(stats.totalSales)}
          subtitleHighlight={`${stats.totalOrders}`}
          subtitle="Total Orders"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Copy}
          title="Total Orders"
          value={String(stats.totalOrders)}
          subtitle="Orders Placed"
          trend="up"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Box}
          title="Total Products"
          value={String(stats.totalProducts)}
          subtitle="Listed Products"
          iconColor="#E6007A"
        />
        <StatCard
          icon={Users}
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          subtitle="Revenue Earned"
          iconColor="#E6007A"
        />
      </div>

      {/* Revenue Chart - Full Width */}
      <div className="min-h-[480px]">
        <RevenueChart orders={orders} />
      </div>

      {/* Recent Orders Table */}
      <div className="pt-2">
        <RecentOrdersTable orders={orders} isLoading={ordersLoading} />
      </div>
    </main>
  );
}
