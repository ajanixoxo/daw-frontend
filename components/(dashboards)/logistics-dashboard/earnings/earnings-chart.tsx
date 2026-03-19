"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { useLogisticsEarnings } from "@/hooks/useLogistics"

export function EarningsChart() {
  const { data: earningsData, isLoading } = useLogisticsEarnings()
  
  // Transform the dynamic backend array -> recharts structure 
  const data = earningsData?.data?.monthlyChart?.map((item: any) => ({
    month: item.month,
    revenue: item.amount || 0
  })) || [
    { month: "No data", revenue: 0 }
  ];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">TOTAL REVENUE</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                ₦{earningsData?.data?.totalEarnings?.toLocaleString() || 0}
              </span>
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
