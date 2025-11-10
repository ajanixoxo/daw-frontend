"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "January", value: 180000 },
  { month: "February", value: 250000 },
  { month: "March", value: 140000 },
  { month: "April", value: 210000 },
  { month: "May", value: 150000 },
  { month: "July", value: 220000 },
]

export default function MonthlyOrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Monthly Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Bar dataKey="value" fill="#f10e7c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
