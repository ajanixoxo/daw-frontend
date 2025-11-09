"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileDown } from "lucide-react"
import { cn } from "@/lib/utils"

const tableOrders = [
  {
    orderId: "1",
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    orderId: "2",
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Cancelled",
  },
  {
    orderId: "3",
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Pending",
  },
  {
    orderId: "4",
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
  {
    orderId: "",
    orderItemId: "96003321",
    userName: "Apr 12, 2023 | 09:24AM",
    orderDate: "$120,000.00",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "Apr 12, 2023 | 0",
    status: "Label",
    avatar: "M",
  },
]

const statusColors = {
  Shipped: "text-[#34c759] bg-[#34c759]/10",
  Pending: "text-[#ff8d28] bg-[#ff8d28]/10",
  Cancelled: "text-[#ff5d61] bg-[#ff5d61]/10",
  Label: "text-[#667185] bg-[#f9f9f9]",
}

export function RecentOrdersTable() {
  return (
    <Card className="border-[#e7e8e9]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-[#1d1d2a]">Recent Orders</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e8e9]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Order Item ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">User Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Order Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Store</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Item</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Amount</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#98a2b3] bg-[#f9f9f9]">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableOrders.map((order, index) => (
                <tr key={index} className="border-b border-[#e7e8e9] last:border-0">
                  <td className="py-4 px-4">
                    {order.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#f10e7c]/10 text-[#f10e7c] text-xs font-medium">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <span className="text-sm text-[#1d1d2a]">{order.orderId}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.orderItemId}</td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.userName}</td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.orderDate}</td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.store}</td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.item}</td>
                  <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5",
                        statusColors[order.status as keyof typeof statusColors],
                      )}
                    >
                      {order.status !== "Label" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
