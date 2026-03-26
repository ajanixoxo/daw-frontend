"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, Pie, PieChart } from "recharts";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AnalyticsStatCard } from "./AnalyticsStatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAnalytics } from "@/hooks/useAdminDashboard";
import DocumentTextAnalyticsIcon from "@/components/icons/DocumentTextAnalyticsIcon";
import CardsAnalyticsIcon from "@/components/icons/CardsAnalyticsIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ListDocumentIcon from "@/components/icons/ListDocumentIcon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ROLE_COLORS: Record<string, string> = {
  buyer: "#f10e7c",
  seller: "#6941C6",
  admin: "#B42318",
  cooperative: "#175CD3",
  member: "#027A48",
  logistics_provider: "#B54708",
  cooperative_admin: "#C11574",
};

const KYC_COLORS: Record<string, string> = {
  verified: "#027A48",
  pending: "#B54708",
  rejected: "#B42318",
};

const getMonthName = (m: number) =>
  new Date(0, m - 1).toLocaleString("default", { month: "short" });

function getInitials(first: string, last: string) {
  return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function UsersAnalyticsTab() {
  const { data, isLoading } = useUserAnalytics();

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

  const { summary, roleBreakdown, kycBreakdown, registrationTrend, recentUsers } = data;

  const registrationChartData = registrationTrend.map(d => ({
    month: getMonthName(d._id.month),
    value: d.count,
  }));

  const roleChartData = roleBreakdown.map(r => ({
    name: r._id,
    value: r.count,
    fill: ROLE_COLORS[r._id] || "#8884d8",
  }));

  const kycChartData = kycBreakdown.map(k => ({
    name: k._id || "unknown",
    value: k.count,
    fill: KYC_COLORS[k._id] || "#8884d8",
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsStatCard
          icon={<DocumentTextAnalyticsIcon width={13} height={13} color="#f10e7c" />}
          label="Total Users"
          value={summary.totalUsers}
          subtitle={
            <div className="flex items-center gap-1">
              <ArrowUpIcon width={12} height={12} color={summary.growthRate >= 0 ? "#12B76A" : "#B42318"} />
              <span className={summary.growthRate >= 0 ? "text-[#12B76A]" : "text-[#B42318]"}>
                {Math.abs(summary.growthRate)}% vs last month
              </span>
            </div>
          }
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Verified Users"
          value={summary.verifiedUsers}
          subtitle={<span className="text-[#98A2B3]">Email verified</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="This Month"
          value={summary.thisMonthRegistrations}
          subtitle={<span className="text-[#98A2B3]">New registrations</span>}
        />
        <AnalyticsStatCard
          icon={<CardsAnalyticsIcon width={13} height={12} color="#f10e7c" />}
          label="Unverified"
          value={summary.unverifiedUsers}
          subtitle={<span className="text-[#98A2B3]">Pending verification</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_445px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Registration Trend Chart */}
          <Card className="p-6 rounded-2xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="analytics-chart-title text-analytics-chart-title">User Registrations</h3>
                <p className="analytics-chart-subtitle text-analytics-chart-subtitle">
                  New user sign-ups over the last 6 months
                </p>
              </div>
              <ChartContainer config={{ value: { label: "Users", color: "#f10e7c" } }} className="h-[350px] w-full">
                <BarChart data={registrationChartData} margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
                  <CartesianGrid strokeDasharray="0" stroke="transparent" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#b4b4b5", fontSize: 14, fontWeight: 700 }}
                    allowDecimals={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#f10e7c" radius={[8, 8, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ChartContainer>
            </div>
          </Card>

          {/* Recent Users Table */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Recent Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2.5 px-2 text-[#667185] font-medium">Name</th>
                    <th className="text-left py-2.5 px-2 text-[#667185] font-medium">Email</th>
                    <th className="text-left py-2.5 px-2 text-[#667185] font-medium">Role</th>
                    <th className="text-left py-2.5 px-2 text-[#667185] font-medium">Status</th>
                    <th className="text-left py-2.5 px-2 text-[#667185] font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user._id} className="border-b border-gray-50">
                      <td className="py-2.5 px-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px] bg-[#F9F5FF] text-[#6941C6]">
                              {getInitials(user.firstName, user.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[#101828] font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[#667185]">{user.email}</td>
                      <td className="py-2.5 px-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F9F5FF] text-[#6941C6]">
                          {user.roles[0]}
                        </span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-[#ECFDF3] text-[#027A48]"
                            : user.status === "suspended"
                            ? "bg-[#FEF3F2] text-[#B42318]"
                            : "bg-[#FFFAEB] text-[#B54708]"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-[#667185]">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column - Breakdowns */}
        <div className="space-y-5">
          {/* Role Breakdown */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">Roles Distribution</h3>
            </div>
            <ChartContainer config={{ value: { label: "Count" } }} className="h-[200px] w-full">
              <PieChart>
                <Pie data={roleChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {roleChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {roleChartData.map((r) => (
                <div key={r.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.fill }} />
                  <span className="text-[#667185] capitalize">{r.name}</span>
                  <span className="text-[#101828] font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* KYC Breakdown */}
          <Card className="p-6 rounded-xl border-none" style={{
            background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
            boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
          }}>
            <div className="flex items-center gap-2 mb-4">
              <ListDocumentIcon width={20} height={20} color="#1d283a" />
              <h3 className="analytics-list-title text-analytics-list-title">KYC Status</h3>
            </div>
            <ChartContainer config={{ value: { label: "Count" } }} className="h-[200px] w-full">
              <PieChart>
                <Pie data={kycChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {kycChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {kycChartData.map((k) => (
                <div key={k.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: k.fill }} />
                  <span className="text-[#667185] capitalize">{k.name}</span>
                  <span className="text-[#101828] font-semibold">{k.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
