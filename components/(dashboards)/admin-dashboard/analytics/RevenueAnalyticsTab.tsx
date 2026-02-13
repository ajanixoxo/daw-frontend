"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Cell, Pie, PieChart } from "recharts";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AnalyticsStatCard } from "./AnalyticsStatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRevenueAnalytics } from "@/hooks/useAdminDashboard";
import DocumentTextAnalyticsIcon from "@/components/icons/DocumentTextAnalyticsIcon";
import CardsAnalyticsIcon from "@/components/icons/CardsAnalyticsIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ListDocumentIcon from "@/components/icons/ListDocumentIcon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ESCROW_COLORS: Record<string, string> = {
  pending: "#B54708",
  held: "#175CD3",
  released: "#027A48",
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "#B54708",
  processing: "#175CD3",
  in_transit: "#6941C6",
  delivered: "#027A48",
  disputed: "#B42318",
};

const getMonthName = (m: number) =>
  new Date(0, m - 1).toLocaleString("default", { month: "short" });

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = ["#F9F5FF", "#EFF8FF", "#FEF3F2", "#FFFAEB", "#ECFDF3", "#FDF2FA"];
  const textColors = ["#6941C6", "#175CD3", "#B42318", "#B54708", "#027A48", "#C11574"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const index = Math.abs(hash) % colors.length;
  return { bg: colors[index], text: textColors[index] };
}

export function RevenueAnalyticsTab() {
  const { data, isLoading } = useRevenueAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-xl" />)}
        </div>
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  const { summary, revenueTrend, escrowBreakdown, orderStats, topShopsByRevenue } = data;

  const revenueChartData = revenueTrend.map(d => ({
    month: getMonthName(d._id.month),
    value: d.total,
  }));

  const escrowChartData = escrowBreakdown.map(e => ({
    name: e._id || "unknown",
    value: e.count,
    fill: ESCROW_COLORS[e._id] || "#8884d8",
  }));

  const orderChartData = orderStats.map(o => ({
    name: o._id,
    value: o.count,
    fill: ORDER_STATUS_COLORS[o._id] || "#8884d8",
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsStatCard
          icon={<DocumentTextAnalyticsIcon width={13} height={13} color="#f10e7c" />}
          label="Total Revenue"
          value={formatNaira(summary.totalCombinedRevenue)}
          subtitle={
            <div className="flex items-center gap-1">
              <ArrowUpIcon width={12} height={12} color={summary.revenueGrowthRate >= 0 ? "#12B76A" : "#B42318"} />
              <span className={summary.revenueGrowthRate >= 0 ? "text-[#12B76A]" : "text-[#B42318]"}>
                {Math.abs(summary.revenueGrowthRate)}% vs last month
              </span>
            </div>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Marketplace"
          value={formatNaira(summary.totalMarketplaceRevenue)}
          subtitle={<span className="text-[#98A2B3]">{summary.totalOrders} orders</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Contributions"
          value={formatNaira(summary.totalContributionRevenue)}
          subtitle={<span className="text-[#98A2B3]">Cooperative revenue</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Avg Order Value"
          value={formatNaira(summary.avgOrderValue)}
          subtitle={
            <span className="text-[#98A2B3]">This month: {formatNaira(summary.thisMonthRevenue)}</span>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_445px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Revenue Trend */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="analytics-chart-title text-analytics-chart-title">Revenue Trend</h3>
                <p className="analytics-chart-subtitle text-analytics-chart-subtitle">
                  Marketplace revenue over the last 6 months
                </p>
              </div>
              <ChartContainer config={{ value: { label: "Revenue", color: "#f10e7c" } }} className="h-[350px] w-full">
                <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, bottom: 10, left: 30 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f10e7c" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f10e7c" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.25)" horizontal vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }}
                    tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke="#f10e7c" strokeWidth={2} fill="url(#revenueGradient)" dot={{ fill: "#f10e7c", r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ChartContainer>
            </div>
          </Card>

          {/* Top Shops by Revenue */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Top Shops by Revenue</h3>
            </div>
            <div className="space-y-3">
              {topShopsByRevenue.length === 0 && (
                <div className="text-gray-500 text-sm text-center">No shop data yet</div>
              )}
              {topShopsByRevenue.map((shop, index) => {
                const { bg, text } = getAvatarColor(shop.name);
                return (
                  <div key={shop._id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">{index + 1}</span>
                      <Avatar className="h-9 w-9 flex-shrink-0" style={{ backgroundColor: bg }}>
                        <AvatarFallback className="bg-transparent text-xs" style={{ color: text }}>
                          {getInitials(shop.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-[#101828] truncate">{shop.name}</div>
                        <div className="text-xs text-[#667185]">{shop.orderCount} orders</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#101828] flex-shrink-0">
                      {formatNaira(shop.totalRevenue)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Escrow Breakdown */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Escrow Status</h3>
            </div>
            <ChartContainer config={{ value: { label: "Count" } }} className="h-[180px] w-full">
              <PieChart>
                <Pie data={escrowChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                  {escrowChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {escrowChartData.map((e) => (
                <div key={e.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />
                  <span className="text-[#667185] capitalize">{e.name}</span>
                  <span className="text-[#101828] font-semibold">{e.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Order Status Breakdown */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Order Status</h3>
            </div>
            <ChartContainer config={{ value: { label: "Count" } }} className="h-[180px] w-full">
              <PieChart>
                <Pie data={orderChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                  {orderChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {orderChartData.map((o) => (
                <div key={o.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: o.fill }} />
                  <span className="text-[#667185] capitalize">{o.name.replace("_", " ")}</span>
                  <span className="text-[#101828] font-semibold">{o.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Summary Card */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Revenue Breakdown</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f10e7c]" />
                  <span className="text-sm text-[#667185]">Marketplace Sales</span>
                </div>
                <span className="text-sm font-semibold text-[#101828]">{formatNaira(summary.totalMarketplaceRevenue)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#027A48]" />
                  <span className="text-sm text-[#667185]">Cooperative Contributions</span>
                </div>
                <span className="text-sm font-semibold text-[#101828]">{formatNaira(summary.totalContributionRevenue)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6941C6]" />
                  <span className="text-sm font-medium text-[#101828]">Total Combined</span>
                </div>
                <span className="text-sm font-bold text-[#101828]">{formatNaira(summary.totalCombinedRevenue)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
