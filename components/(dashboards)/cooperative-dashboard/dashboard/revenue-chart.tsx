"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getRevenueChartData } from "@/app/actions/cooperative-dashboard";

interface RevenueData {
  month: string;
  revenue: number;
}

export function RevenueChart() {
  const [chartData, setChartData] = useState<RevenueData[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const result = await getRevenueChartData();
        
        if (result.success && result.data) {
          setChartData(result.data);
          // Calculate total revenue
          const total = result.data.reduce((sum: number, item: RevenueData) => sum + item.revenue, 0);
          setTotalRevenue(total);
        } else {
          throw new Error(result.error || "Failed to fetch revenue data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (error) {
    return (
      <Card className="border-[#e4e7ec] bg-white">
        <CardContent className="p-6">
          <p className="text-sm text-red-600">Error loading revenue data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="flex flex-col gap-4 space-y-0 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#838794]">TOTAL REVENUE</p>
          <p className="mt-1 text-2xl font-bold text-[#1d1d2a]">
            {loading ? "..." : `₦${totalRevenue.toLocaleString()}`}
          </p>
          <p className="mt-1 text-xs text-[#f10e7c]">(+6%) than last Year</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#1d1d2a] px-4 py-1.5 text-xs text-white">Expenses</div>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[140px] border-[#e4e7ec]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-sm text-[#838794]">Loading chart data...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-sm text-[#838794]">No revenue data available</p>
          </div>
        ) : (
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "#f10e7c",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#838794", fontSize: 12 }}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#838794", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#f10e7c" radius={[8, 8, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
