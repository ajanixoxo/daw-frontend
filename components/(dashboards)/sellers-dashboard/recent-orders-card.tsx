"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const orders = [
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Shipped" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Pending" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Cancelled" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Shipped" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Pending" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", price: "$17.84", status: "Cancelled" },
]

const statusColors = {
  Shipped: "text-[#34c759]",
  Pending: "text-[#ff8d28]",
  Cancelled: "text-[#ff5d61]",
}

export function RecentOrdersCard() {
  return (
    <Card className="border-[#e7e8e9] shadow-sm bg-white flex flex-col h-full">
      <CardHeader className="pb-4 px-6 pt-6 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-[#1d1d2a]">Recent Orders</CardTitle>
          <Select defaultValue="export">
            <SelectTrigger className="w-[120px] h-9 text-sm border-[#e7e8e9]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="pdf">Export PDF</SelectItem>
              <SelectItem value="csv">Export CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex-1 flex flex-col min-h-0">
        <div className="space-y-0 flex-1 overflow-y-auto">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center justify-between py-4 border-b border-[#f3f4f7] last:border-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-sm text-[#667185] font-medium flex-shrink-0">{order.id}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1d1d2a] truncate">{order.name}</p>
                  <p className="text-xs text-[#98a2b3] truncate">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={cn(
                    "text-xs font-medium flex items-center gap-1.5",
                    statusColors[order.status as keyof typeof statusColors],
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {order.status}
                </span>
                <span className="text-sm font-semibold text-[#1d1d2a] min-w-[50px] text-right">{order.price}</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-5 h-11 text-[#f10e7c] border-[#f10e7c] hover:bg-[#f10e7c]/5 bg-transparent font-medium flex-shrink-0"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
