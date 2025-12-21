"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", growth: 220000 },
  { month: "February", growth: 310000 },
  { month: "March", growth: 190000 },
  { month: "April", growth: 270000 },
  { month: "May", growth: 195000 },
  { month: "June", growth: 0 },
  { month: "July", growth: 260000 },
  { month: "August", growth: 295000 },
  { month: "September", growth: 330000 },
]

export function PlatformGrowthChart() {
  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="flex flex-col gap-4 space-y-0 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#1d1d2a]">Platform Growth</h3>
          <p className="mt-1 text-sm text-[#838794]">Users and cooperatives growth over time</p>
        </div>
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
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer
          config={{
            growth: {
              label: "Growth",
              color: "#f10e7c",
            },
          }}
          className="h-[350px] w-full"
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
              <Bar dataKey="growth" fill="#f10e7c" radius={[8, 8, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
