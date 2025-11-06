"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { MonthlySalesData } from "./schema";

interface MonthlySalesChartProps {
  data: MonthlySalesData[];
}

export function MonthlySalesChart({ data }: MonthlySalesChartProps) {
  const chartConfig = {
    value: {
      label: "Sales",
      color: "#f10e7c",
    },
  };

  return (
    <Card className="p-6 rounded-xl border-none" style={{
      background: "linear-gradient(145.52deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)",
      boxShadow: "0px 2px 4px rgba(29, 40, 58, 0.06), 0px 4px 6px rgba(29, 40, 58, 0.10)"
    }}>
      <div className="space-y-4">
        <h3 className="analytics-chart-title text-analytics-chart-title">Monthly Sales</h3>

        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 30 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f10e7c" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f10e7c" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.25)"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="analytics-chart-axis text-analytics-chart-axis-text"
              tick={{ fill: "#b4b4b5", fontSize: 16, fontWeight: 700 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="analytics-chart-axis text-analytics-chart-axis-text"
              tick={{ fill: "#b4b4b5", fontSize: 16, fontWeight: 700 }}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f10e7c"
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={{ fill: "#f10e7c", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}