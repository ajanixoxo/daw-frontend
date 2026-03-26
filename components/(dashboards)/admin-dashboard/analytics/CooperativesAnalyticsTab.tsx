"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Area, AreaChart, Cell, Pie, PieChart } from "recharts";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AnalyticsStatCard } from "./AnalyticsStatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCooperativeAnalytics } from "@/hooks/useAdminDashboard";
import DocumentTextAnalyticsIcon from "@/components/icons/DocumentTextAnalyticsIcon";
import CardsAnalyticsIcon from "@/components/icons/CardsAnalyticsIcon";
import ListDocumentIcon from "@/components/icons/ListDocumentIcon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const STATUS_COLORS: Record<string, string> = {
  approved: "#027A48",
  pending: "#B54708",
  rejected: "#B42318",
  suspended: "#667185",
};

const LOAN_COLORS: Record<string, string> = {
  pending: "#B54708",
  approved: "#175CD3",
  rejected: "#B42318",
  disbursed: "#6941C6",
  repaid: "#027A48",
};

const getMonthName = (m: number) =>
  new Date(0, m - 1).toLocaleString("default", { month: "short" });

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

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);
}

export function CooperativesAnalyticsTab() {
  const { data, isLoading } = useCooperativeAnalytics();

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

  const { summary, statusBreakdown, coopGrowthTrend, contributionTrend, loanStats, topCoopsByContributions, topCoopsByMembers } = data;

  const growthChartData = coopGrowthTrend.map(d => ({
    month: getMonthName(d._id.month),
    value: d.count,
  }));

  const contributionChartData = contributionTrend.map(d => ({
    month: getMonthName(d._id.month),
    value: d.total,
  }));

  const statusChartData = statusBreakdown.map(s => ({
    name: s._id || "unknown",
    value: s.count,
    fill: STATUS_COLORS[s._id] || "#8884d8",
  }));

  const loanChartData = loanStats.map(l => ({
    name: l._id,
    value: l.count,
    fill: LOAN_COLORS[l._id] || "#8884d8",
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsStatCard
          icon={<DocumentTextAnalyticsIcon width={13} height={13} color="#f10e7c" />}
          label="Total Cooperatives"
          value={summary.totalCooperatives}
          subtitle={<span className="text-[#98A2B3]">All cooperatives</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Total Members"
          value={summary.totalMembers}
          subtitle={
            <span className="text-[#98A2B3]">{summary.activeMembers} active</span>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Avg Members/Coop"
          value={summary.avgMembersPerCoop}
          subtitle={<span className="text-[#98A2B3]">Per cooperative</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Contributions"
          value={formatNaira(summary.totalContributions)}
          subtitle={
            <span className="text-[#98A2B3]">{summary.totalContributionCount} payments</span>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_445px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Cooperative Growth */}
          <Card className="p-6 rounded-2xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="analytics-chart-title text-analytics-chart-title">Cooperative Growth</h3>
                <p className="analytics-chart-subtitle text-analytics-chart-subtitle">
                  New cooperatives created over the last 6 months
                </p>
              </div>
              <ChartContainer config={{ value: { label: "Cooperatives", color: "#6941C6" } }} className="h-[300px] w-full">
                <BarChart data={growthChartData} margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
                  <CartesianGrid strokeDasharray="0" stroke="transparent" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#6941C6" radius={[8, 8, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ChartContainer>
            </div>
          </Card>

          {/* Contribution Trend */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="space-y-4">
              <h3 className="analytics-chart-title text-analytics-chart-title">Contribution Revenue</h3>
              <ChartContainer config={{ value: { label: "Revenue", color: "#027A48" } }} className="h-[300px] w-full">
                <AreaChart data={contributionChartData} margin={{ top: 10, right: 10, bottom: 10, left: 30 }}>
                  <defs>
                    <linearGradient id="contribGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#027A48" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#027A48" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.25)" horizontal vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="value" stroke="#027A48" strokeWidth={2} fill="url(#contribGradient)" dot={{ fill: "#027A48", r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ChartContainer>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Status Breakdown */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Status Breakdown</h3>
            </div>
            <ChartContainer config={{ value: { label: "Count" } }} className="h-[180px] w-full">
              <PieChart>
                <Pie data={statusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                  {statusChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {statusChartData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
                  <span className="text-[#667185] capitalize">{s.name}</span>
                  <span className="text-[#101828] font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Loan Stats */}
          {loanChartData.length > 0 && (
            <Card className="p-6 rounded-xl border-none" style={{
              background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
              boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
            }}>
              <div className="flex items-center gap-2 mb-4">
                <ListDocumentIcon width={20} height={20} color="#1d283a" />
                <h3 className="analytics-list-title text-analytics-list-title">Loan Status</h3>
              </div>
              <ChartContainer config={{ value: { label: "Count" } }} className="h-[180px] w-full">
                <PieChart>
                  <Pie data={loanChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                    {loanChartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex flex-wrap gap-3 mt-3">
                {loanChartData.map((l) => (
                  <div key={l.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.fill }} />
                    <span className="text-[#667185] capitalize">{l.name}</span>
                    <span className="text-[#101828] font-semibold">{l.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Top Cooperatives by Contributions */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Top by Contributions</h3>
            </div>
            <div className="space-y-3">
              {topCoopsByContributions.length === 0 && (
                <div className="text-gray-500 text-sm text-center">No data yet</div>
              )}
              {topCoopsByContributions.map((coop, index) => {
                const { bg, text } = getAvatarColor(coop.name);
                return (
                  <div key={coop._id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">{index + 1}</span>
                      <Avatar className="h-9 w-9 flex-shrink-0" style={{ backgroundColor: bg }}>
                        <AvatarFallback className="bg-transparent text-xs" style={{ color: text }}>
                          {getInitials(coop.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-[#101828] truncate">{coop.name}</div>
                        <div className="text-xs text-[#667185]">{coop.count} contributions</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#101828] flex-shrink-0">
                      {formatNaira(coop.totalContributions)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
