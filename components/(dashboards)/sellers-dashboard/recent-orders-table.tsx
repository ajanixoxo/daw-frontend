"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { IOrder } from "@/types/product.types";

// Helper functions (same as before)
const statusColors: Record<string, string> = {
  shipped: "text-[#34c759] bg-[#d1fadf]",
  delivered: "text-[#34c759] bg-[#d1fadf]",
  pending: "text-[#ff8d28] bg-[#fffaeb]",
  processing: "text-[#ff8d28] bg-[#fffaeb]",
  cancelled: "text-[#ff5d61] bg-[#fef3f2]",
};

function getStatusDisplay(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return statusMap[status.toLowerCase()] || status;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getBuyerName(order: IOrder): string {
  // @ts-ignore
  if (order.buyer_id && typeof order.buyer_id === "object") {
    // @ts-ignore
    return order.buyer_id.fullName || order.buyer_id.name || "Customer";
  }
  return "Customer";
}

interface RecentOrdersTableProps {
  orders: IOrder[];
  isLoading?: boolean;
}

export function RecentOrdersTable({
  orders,
  isLoading,
}: RecentOrdersTableProps) {
  return (
    <Card className="border-[#e7e8e9] shadow-sm bg-white mt-8 rounded-xl">
      <CardHeader className="py-5 px-6 border-b border-[#f3f4f7] flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-[#1d1d2a]">
          Recent Orders
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-[#667185] border-[#e7e8e9] h-9 text-xs"
        >
          <Calendar className="h-3.5 w-3.5" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Order Item ID
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  User Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Order Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Store
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Item
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[#667185] uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#667185]">
                    Processing...
                  </td>
                </tr>
              ) : (
                orders.slice(0, 10).map((order) => {
                  const status = order.status.toLowerCase();
                  const statusColor =
                    statusColors[status] || statusColors.pending;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-[#f3f4f7] last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm text-[#1d1d2a] font-medium">
                        #{orders.indexOf(order) + 1}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#1d1d2a]">
                        {order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#1d1d2a] font-medium">
                        {getBuyerName(order)}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#667185]">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#1d1d2a]">
                        Faye's Complex
                      </td>
                      <td className="py-4 px-6 text-sm text-[#1d1d2a] font-medium">
                        Turtleneck
                      </td>
                      <td className="py-4 px-6 text-sm text-[#1d1d2a]">
                        ₦{order.total_amount?.toLocaleString() || "17.84"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                            statusColor,
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full bg-current",
                            )}
                          />
                          {getStatusDisplay(order.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
