"use client"

import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { PlatformGrowthData } from "./schema";
import { TimeFilter } from "./enums";

interface PlatformGrowthChartProps {
  data: PlatformGrowthData[];
}

export function PlatformGrowthChart({ data }: PlatformGrowthChartProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.THIS_MONTH);

  const chartConfig = {
    value: {
      label: "Growth",
      color: "#f10e7c",
    },
  };

  return (
    <Card className="p-6 rounded-2xl border-none" style={{
      background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
      boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
    }}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="analytics-chart-title text-analytics-chart-title">Platform Growth</h3>
            <p className="analytics-chart-subtitle text-analytics-chart-subtitle">
              Users and cooperatives growth over time
            </p>
          </div>
          <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
            <SelectTrigger className="w-32 analytics-dropdown-text text-analytics-subtitle-text border-analytics-dropdown-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TimeFilter.THIS_MONTH}>{TimeFilter.THIS_MONTH}</SelectItem>
              <SelectItem value={TimeFilter.LAST_MONTH}>{TimeFilter.LAST_MONTH}</SelectItem>
              <SelectItem value={TimeFilter.THIS_QUARTER}>{TimeFilter.THIS_QUARTER}</SelectItem>
              <SelectItem value={TimeFilter.THIS_YEAR}>{TimeFilter.THIS_YEAR}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
            <CartesianGrid strokeDasharray="0" stroke="transparent" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="analytics-chart-label text-analytics-chart-axis-text"
              tick={{ fill: "#b4b4b5", fontSize: 16, fontWeight: 700, letterSpacing: "-0.50px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="analytics-chart-axis text-analytics-chart-axis-text"
              tick={{ fill: "#b4b4b5", fontSize: 16, fontWeight: 700 }}
              tickFormatter={(value) => {
                if (value >= 1000) return `${value / 1000}k`;
                return value;
              }}
              ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              fill="#f10e7c"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
}