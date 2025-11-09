"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", value1: 200000, value2: 100000 },
  { day: "Tues", value1: 180000, value2: 250000 },
  { day: "Wed", value1: 190000, value2: 280000 },
  { day: "Thurs", value1: 280000, value2: 300000 },
  { day: "FRI", value1: 190000, value2: 350000 },
  { day: "Sat", value1: 180000, value2: 400000 },
  { day: "Sun", value1: 260000, value2: 500000 },
]

export function PerformanceChart() {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">Monthly Performance</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Shipments completed in the past 30 days
            </CardDescription>
          </div>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#8e8e8e", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8e8e8e", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Bar dataKey="value1" fill="#f10e7c" radius={[8, 8, 0, 0]} maxBarSize={40} />
              <Bar dataKey="value2" fill="#ffc0e0" radius={[8, 8, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
