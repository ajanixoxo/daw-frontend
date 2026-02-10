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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function computeMonthlyRevenue(orders: IOrder[]) {
  const now = new Date();
  const months: { month: string; value: number }[] = [];

  for (let i = 7; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: MONTH_NAMES[d.getMonth()],
      value: 0,
    });
  }

  for (const order of orders) {
    const orderDate = new Date(order.createdAt);
    const entry = months.find((m) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 7, 1);
      for (let i = 0; i < 8; i++) {
        const check = new Date(d.getFullYear(), d.getMonth() + i, 1);
        if (
          check.getMonth() === orderDate.getMonth() &&
          check.getFullYear() === orderDate.getFullYear() &&
          MONTH_NAMES[check.getMonth()] === m.month
        ) {
          return true;
        }
      }
      return false;
    });
    if (entry) {
      entry.value += order.total_amount || 0;
    }
  }

  return months;
}

function computeYAxisTicks(maxValue: number): number[] {
  if (maxValue === 0) return [0, 50000, 100000, 150000, 200000, 250000];
  const step = Math.ceil(maxValue / 5 / 1000) * 1000;
  const ticks: number[] = [];
  for (let i = 0; i <= 5; i++) {
    ticks.push(step * i);
  }
  return ticks;
}

export function RevenueChart({ orders }: RevenueChartProps) {
  const chartData = useMemo(() => computeMonthlyRevenue(orders), [orders]);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.total_amount || 0), 0),
    [orders],
  );

  const yTicks = useMemo(() => {
    const maxVal = Math.max(...chartData.map((d) => d.value), 0);
    return computeYAxisTicks(maxVal);
  }, [chartData]);

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  return (
    <Card className="border border-[#f0f0f0] shadow-none bg-white flex flex-col h-full rounded-lg">
      <CardHeader className="pb-4 px-6 pt-5 shrink-0 border-b border-[#f9fafb]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[10px] text-[#98a2b3] uppercase tracking-[0.5px] font-medium mb-2 leading-none">
              TOTAL REVENUE
            </p>
            <p className="text-[32px] font-bold text-[#101828] leading-none mb-2.5">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <Select defaultValue="this-year">
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
        <div className="w-full min-h-[350px] h-full">
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
                tickFormatter={(value) =>
                  value >= 1000 ? `${value / 1000}k` : `${value}`
                }
                ticks={yTicks}
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
