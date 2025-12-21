"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { IOrder } from "@/types/product.types"
import Link from "next/link"

const statusColors: Record<string, string> = {
  shipped: "text-[#34c759]",
  delivered: "text-[#34c759]",
  pending: "text-[#ff8d28]",
  processing: "text-[#ff8d28]",
  cancelled: "text-[#ff5d61]",
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

function getShopName(order: IOrder): string {
  if (typeof order.shop_id === 'string') {
    return 'Shop'
  }
  return order.shop_id?.name || 'Shop'
}

interface RecentOrdersCardProps {
  orders: IOrder[]
  isLoading?: boolean
}

export function RecentOrdersCard({ orders, isLoading }: RecentOrdersCardProps) {
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
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 text-[#667185]">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading orders...</span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-[#667185]">No orders yet</p>
          </div>
        ) : (
          <>
            <div className="space-y-0 flex-1 overflow-y-auto">
              {orders.map((order) => {
                const status = order.status.toLowerCase()
                const statusColor = statusColors[status] || statusColors.pending
                const shopName = getShopName(order)
                
                return (
                  <div key={order._id} className="flex items-center justify-between py-4 border-b border-[#f3f4f7] last:border-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-sm text-[#667185] font-medium flex-shrink-0">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1d1d2a] truncate">{shopName}</p>
                        <p className="text-xs text-[#98a2b3] truncate">Order #{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={cn(
                          "text-xs font-medium flex items-center gap-1.5",
                          statusColor,
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {getStatusDisplay(order.status)}
                      </span>
                      <span className="text-sm font-semibold text-[#1d1d2a] min-w-[60px] text-right">
                        ₦{order.total_amount?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <Link href="/sellers/orders">
              <Button
                variant="outline"
                className="w-full mt-5 h-11 text-[#f10e7c] border-[#f10e7c] hover:bg-[#f10e7c]/5 bg-transparent font-medium flex-shrink-0"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  )
}
