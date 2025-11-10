"use client"

import { Search, Filter, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ShopOrdersTable() {
  const orders = [
    {
      id: "96003321",
      customer: "Marvin McKinney",
      product: "Turtleneck",
      store: "Faye's Complex",
      date: "Apr 12, 2025",
      amount: "$17.84",
      status: "shipped" as const,
    },
    {
      id: "96003321",
      customer: "Marvin McKinney",
      product: "Turtleneck",
      store: "Faye's Complex",
      date: "Apr 12, 2025",
      amount: "$17.84",
      status: "cancelled" as const,
    },
    {
      id: "96003321",
      customer: "Marvin McKinney",
      product: "Turtleneck",
      store: "Faye's Complex",
      date: "Apr 12, 2025",
      amount: "$17.84",
      status: "pending" as const,
    },
    {
      id: "96003321",
      customer: "Marvin McKinney",
      product: "Turtleneck",
      store: "Faye's Complex",
      date: "Apr 12, 2025",
      amount: "$17.84",
      status: "shipped" as const,
    },
    {
      id: "96003321",
      customer: "Marvin McKinney",
      product: "Turtleneck",
      store: "Faye's Complex",
      date: "Apr 12, 2025",
      amount: "$17.84",
      status: "pending" as const,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-[#e7f6ec] text-[#009a49]"
      case "pending":
        return "bg-[#fff4e5] text-[#ff8d28]"
      case "cancelled":
        return "bg-[#ffece5] text-[#ff383c]"
      default:
        return "bg-[#f5f5f5] text-[#667185]"
    }
  }

  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white">
      {/* Header */}
      <div className="border-b border-[#e4e7ec] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-[#1c1c1c]">Recent Orders</h3>
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667185]" />
              <Input placeholder="Search here..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b border-[#e4e7ec] bg-[#f9f9f9]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Order Item ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Products</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Store</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Order Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#667185]">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4e7ec]">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-[#f9f9f9]">
                <td className="px-6 py-4 text-sm text-[#1c1c1c]">{order.id}</td>
                <td className="px-6 py-4 text-sm text-[#1c1c1c]">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-[#1c1c1c]">{order.product}</td>
                <td className="px-6 py-4 text-sm text-[#667185]">{order.store}</td>
                <td className="px-6 py-4 text-sm text-[#667185]">{order.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#1c1c1c]">{order.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-lg p-1 hover:bg-[#f5f5f5]">
                    <MoreVertical className="h-5 w-5 text-[#667185]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="divide-y divide-[#e4e7ec] md:hidden">
        {orders.map((order, index) => (
          <div key={index} className="p-4">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="font-medium text-[#1c1c1c]">{order.id}</div>
                <div className="text-sm text-[#667185]">{order.customer}</div>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                  order.status,
                )}`}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                {order.status}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-[#667185]">Product:</span>
                <span className="text-[#1c1c1c]">{order.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667185]">Date:</span>
                <span className="text-[#1c1c1c]">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667185]">Amount:</span>
                <span className="font-medium text-[#1c1c1c]">{order.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
