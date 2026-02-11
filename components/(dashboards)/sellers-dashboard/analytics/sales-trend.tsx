"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesTrendProps {
  data: { label: string; revenue: number; orders: number }[]
}

export function SalesTrend({ data }: SalesTrendProps) {
  // Format chart data — revenue per month
  const chartData = data.map((d) => ({
    month: d.label,
    value: d.revenue,
  }))

  // Compute a sensible Y-axis max (round up to nearest nice number)
  const maxValue = Math.max(...chartData.map((d) => d.value), 0)
  const yMax = maxValue > 0 ? Math.ceil(maxValue / 1000) * 1000 : 10000

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Revenue (₦)",
              color: "#f10e7c",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f10e7c" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ffedf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e8e9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#676767", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#676767", fontSize: 12 }}
                domain={[0, yMax]}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f10e7c"
                strokeWidth={2}
                fill="url(#salesGradient)"
                dot={{ fill: "#f10e7c", r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
