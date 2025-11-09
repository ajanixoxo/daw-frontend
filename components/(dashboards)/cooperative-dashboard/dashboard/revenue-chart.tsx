"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", revenue: 200000 },
  { month: "February", revenue: 280000 },
  { month: "March", revenue: 160000 },
  { month: "April", revenue: 240000 },
  { month: "May", revenue: 150000 },
  { month: "June", revenue: 0 },
  { month: "July", revenue: 250000 },
  { month: "August", revenue: 280000 },
  { month: "September", revenue: 300000 },
]

export function RevenueChart() {
  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="flex flex-col gap-4 space-y-0 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#838794]">TOTAL REVENUE</p>
          <p className="mt-1 text-2xl font-bold text-[#1d1d2a]">$0</p>
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
      </CardContent>
    </Card>
  )
}
