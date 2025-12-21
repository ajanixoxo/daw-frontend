"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "January", revenue: 195000 },
  { month: "February", revenue: 280000 },
  { month: "March", revenue: 290000 },
  { month: "April", revenue: 160000 },
  { month: "May", revenue: 240000 },
  { month: "June", revenue: 155000 },
  { month: "July", revenue: 235000 },
  { month: "August", revenue: 285000 },
  { month: "September", revenue: 310000 },
  { month: "October", revenue: 305000 },
  { month: "November", revenue: 275000 },
  { month: "December", revenue: 340000 },
]

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">TOTAL REVENUE</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-sm text-destructive">(+42.6%) than last Year</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].payload.month}
                          </span>
                          <span className="font-bold text-primary">₦{payload[0].value?.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="revenue" fill="#f10e7c" radius={[8, 8, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
