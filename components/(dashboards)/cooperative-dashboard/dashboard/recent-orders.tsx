"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    orderId: "1",
    orderItemId: "96003321",
    customer: "Marvin McKinney",
    item: "Turtleneck",
    amount: "$17.84",
    date: "7 Apr, 2025",
    status: "shipped",
  },
  {
    orderId: "2",
    orderItemId: "96003321",
    customer: "Marvin McKinney",
    item: "Turtleneck",
    amount: "$17.84",
    date: "7 Apr, 2025",
    status: "cancelled",
  },
  {
    orderId: "3",
    orderItemId: "96003321",
    customer: "Marvin McKinney",
    item: "Turtleneck",
    amount: "$17.84",
    date: "7 Apr, 2025",
    status: "pending",
  },
  {
    orderId: "4",
    orderItemId: "96003321",
    customer: "Marvin McKinney",
    item: "Turtleneck",
    amount: "$17.84",
    date: "7 Apr, 2025",
    status: "shipped",
  },
]

const detailedOrders = [
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
  {
    id: "96003321",
    avatar: "M",
    orderDate: "Apr 12, 2023 | 09:24AM",
    itemDate: "Apr 12, 2023 | 09:24AM",
    deliveryDate: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    label: "Label",
  },
]

const statusConfig = {
  shipped: { label: "Shipped", className: "bg-[#d4f4dd] text-[#009a49] hover:bg-[#d4f4dd]" },
  cancelled: { label: "Cancelled", className: "bg-[#ffe7e7] text-[#c11e22] hover:bg-[#ffe7e7]" },
  pending: { label: "Pending", className: "bg-[#fff4e6] text-[#f5b546] hover:bg-[#fff4e6]" },
}

export function RecentOrders() {
  return (
    <Card className="mt-6 border-[#e4e7ec] bg-white">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-lg font-bold text-[#1d1d2a]">Recent Orders</CardTitle>
        <Button variant="outline" size="sm" className="gap-2 border-[#e4e7ec] bg-transparent">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="bg-[#f7f7f7]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Order Item ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {orders.map((order) => (
                <tr key={`${order.orderId}-${order.orderItemId}`} className="hover:bg-[#f9f9f9]">
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.orderId}</td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.orderItemId}</td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.item}</td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.date}</td>
                  <td className="px-6 py-4">
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].className}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                </tr>
              ))}
              {detailedOrders.map((order, index) => (
                <tr key={`detailed-${index}`} className="hover:bg-[#f9f9f9]">
                  <td className="px-6 py-4">
                    <input type="radio" name="order-select" className="h-4 w-4 accent-[#f10e7c]" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffedf6] text-sm font-medium text-[#f10e7c]">
                      {order.avatar}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1d1d2a]">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-[#838794]">{order.orderDate}</td>
                  <td className="px-6 py-4 text-sm text-[#838794]">{order.itemDate}</td>
                  <td className="px-6 py-4 text-sm text-[#838794]">{order.deliveryDate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1d1d2a]">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-[#838794]">{order.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 p-4 lg:hidden">
          {orders.map((order) => (
            <div key={`${order.orderId}-mobile`} className="rounded-lg border border-[#e4e7ec] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[#838794]">Order #{order.orderId}</span>
                <Badge className={statusConfig[order.status as keyof typeof statusConfig].className}>
                  {statusConfig[order.status as keyof typeof statusConfig].label}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#838794]">Order Item ID:</span>
                  <span className="font-medium text-[#1d1d2a]">{order.orderItemId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Customer:</span>
                  <span className="font-medium text-[#1d1d2a]">{order.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Item:</span>
                  <span className="font-medium text-[#1d1d2a]">{order.item}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Amount:</span>
                  <span className="font-medium text-[#1d1d2a]">{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838794]">Date:</span>
                  <span className="font-medium text-[#1d1d2a]">{order.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
