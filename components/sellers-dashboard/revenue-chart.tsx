"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "January", value: 200000 },
  { month: "February", value: 280000 },
  { month: "March", value: 160000 },
  { month: "April", value: 240000 },
  { month: "May", value: 150000 },
  { month: "July", value: 240000 },
  { month: "August", value: 270000 },
  { month: "Septem", value: 310000 },
]

export function RevenueChart() {
  return (
    <Card className="border-[#e7e8e9] shadow-sm bg-white flex flex-col h-full">
      <CardHeader className="pb-3 px-6 pt-6 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[11px] text-[#98a2b3] uppercase tracking-wider font-medium mb-2">TOTAL REVENUE</p>
            <p className="text-[28px] font-bold text-[#1d1d2a] leading-none mb-2">$0</p>
            <p className="text-xs text-[#ff5d61] font-medium">(+4.3%) than last Year</p>
          </div>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[140px] h-9 text-sm border-[#e7e8e9]">
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
      <CardContent className="px-6 pb-6 pt-4 flex-1 min-h-0">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f7" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#98a2b3", fontSize: 13 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#98a2b3", fontSize: 13 }}
                tickFormatter={(value) => `${value / 1000}k`}
                ticks={[0, 50000, 100000, 150000, 200000, 250000, 300000]}
              />
              <Bar dataKey="value" fill="#f10e7c" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
