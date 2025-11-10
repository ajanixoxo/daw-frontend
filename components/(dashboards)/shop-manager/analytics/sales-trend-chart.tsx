"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", value: 58 },
  { month: "Feb", value: 66 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 80 },
  { month: "May", value: 72 },
  { month: "June", value: 38 },
]

export default function SalesTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f10e7c" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f10e7c" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f10e7c"
              strokeWidth={2}
              fill="url(#colorValue)"
              dot={{ fill: "#f10e7c", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
