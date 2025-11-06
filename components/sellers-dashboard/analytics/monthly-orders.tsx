"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "January", orders: 180000 },
  { month: "February", orders: 260000 },
  { month: "March", orders: 140000 },
  { month: "April", orders: 210000 },
  { month: "May", orders: 150000 },
  { month: "July", orders: 220000 },
]

export function MonthlyOrders() {
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
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e8e9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#676767", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#676767", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
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
