"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { IOrder } from "@/types/product.types"

const statusColors: Record<string, string> = {
  shipped: "text-[#34c759] bg-[#34c759]/10",
  delivered: "text-[#34c759] bg-[#34c759]/10",
  pending: "text-[#ff8d28] bg-[#ff8d28]/10",
  processing: "text-[#ff8d28] bg-[#ff8d28]/10",
  cancelled: "text-[#ff5d61] bg-[#ff5d61]/10",
}

function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  }
  return statusMap[status.toLowerCase()] || status
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

function getShopName(order: IOrder): string {
  if (typeof order.shop_id === 'string') {
    return 'Shop'
  }
  return order.shop_id?.name || 'Shop'
}

function getBuyerId(order: IOrder): string {
  if (typeof order.buyer_id === 'string') {
    return order.buyer_id
  }
  // If buyer_id is an object, try to get _id or id property
  if (order.buyer_id && typeof order.buyer_id === 'object') {
    return (order.buyer_id as any)._id || (order.buyer_id as any).id || ''
  }
  return ''
}

interface RecentOrdersTableProps {
  orders: IOrder[]
  isLoading?: boolean
}

export function RecentOrdersTable({ orders, isLoading }: RecentOrdersTableProps) {
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
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#667185]">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-sm">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#667185]">
                    <p className="text-sm">No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const status = order.status.toLowerCase()
                  const statusColor = statusColors[status] || statusColors.pending
                  const shopName = getShopName(order)
                  const buyerId = getBuyerId(order)
                  
                  return (
                    <tr key={order._id} className="border-b border-[#e7e8e9] last:border-0">
                      <td className="py-4 px-4">
                        <span className="text-sm text-[#1d1d2a]">{order._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">{order._id.slice(-8).toUpperCase()}</td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">{buyerId ? buyerId.slice(-8).toUpperCase() : '-'}</td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">{formatDate(order.createdAt)}</td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">{shopName}</td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">-</td>
                      <td className="py-4 px-4 text-sm text-[#1d1d2a]">₦{order.total_amount?.toLocaleString() || '0'}</td>
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5",
                            statusColor,
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {getStatusDisplay(order.status)}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
