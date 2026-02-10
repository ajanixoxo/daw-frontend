"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { IOrder } from "@/types/product.types";
import { useMemo } from "react";

interface RevenueChartProps {
  orders: IOrder[];
}

const DEMO_DATA = [
  { month: "January", value: 200000 },
  { month: "February", value: 280000 },
  { month: "March", value: 160000 },
  { month: "April", value: 240000 },
  { month: "May", value: 160000 },
  { month: "July", value: 240000 },
  { month: "August", value: 280000 },
  { month: "September", value: 320000 },
];

export function RevenueChart({ orders }: RevenueChartProps) {
  const chartData = useMemo(() => {
    if (orders.length === 0) return DEMO_DATA;
    return DEMO_DATA;
  }, [orders]);

  return (
    <Card className="border border-[#f0f0f0] shadow-none bg-white flex flex-col h-full rounded-lg">
      <CardHeader className="pb-4 px-6 pt-5 shrink-0 border-b border-[#f9fafb]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] text-[#98a2b3] uppercase tracking-[0.5px] font-medium mb-2 leading-none">
              TOTAL REVENUE
            </p>
            <p className="text-[32px] font-bold text-[#101828] leading-none mb-2.5">
              $0
            </p>
            <p className="text-[11px] text-[#f04438] font-normal">
              (+43%) than last Year
            </p>
          </div>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[115px] h-8 text-[11px] border-[#e4e7ec] rounded-md bg-white font-normal text-[#344054]">
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
      <CardContent className="px-4 pb-5 pt-6 flex-1 min-h-0">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 10, left: -30, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#f2f4f7"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#98a2b3", fontSize: 11, fontWeight: 400 }}
                dy={12}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#98a2b3", fontSize: 11, fontWeight: 400 }}
                tickFormatter={(value) => `${value / 1000}k`}
                ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
                dx={-5}
              />
              <Bar
                dataKey="value"
                fill="#E6007A"
                radius={[100, 100, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
