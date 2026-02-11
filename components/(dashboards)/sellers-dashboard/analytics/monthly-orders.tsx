"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MonthlyOrdersProps {
  data: { label: string; revenue: number; orders: number }[]
}

export function MonthlyOrders({ data }: MonthlyOrdersProps) {
  // Format chart data — order count per month
  const chartData = data.map((d) => ({
    month: d.label,
    orders: d.orders,
  }))

  // Ensure Y-axis always has a sensible range even with zero data
  const maxOrders = Math.max(...chartData.map((d) => d.orders), 0)
  const yMax = maxOrders > 0 ? Math.ceil(maxOrders * 1.2) : 10

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            orders: {
              label: "Orders",
              color: "#f10e7c",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e8e9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#676767", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#676767", fontSize: 12 }}
                domain={[0, yMax]}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="orders" fill="#f10e7c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
