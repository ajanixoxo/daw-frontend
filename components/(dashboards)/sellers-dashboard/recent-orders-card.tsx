"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { IOrder } from "@/types/product.types";
import Link from "next/link";

const statusColors: Record<string, { bg: string; text: string; dot: string }> =
  {
    shipped: { bg: "#ecfdf3", text: "#027a48", dot: "#12b76a" },
    delivered: { bg: "#ecfdf3", text: "#027a48", dot: "#12b76a" },
    pending: { bg: "#fff6ed", text: "#b93815", dot: "#f79009" },
    processing: { bg: "#fff6ed", text: "#b93815", dot: "#f79009" },
    cancelled: { bg: "#fef3f2", text: "#b42318", dot: "#f04438" },
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

function getBuyerName(order: IOrder): string {
  // @ts-ignore
  if (order.buyer_id && typeof order.buyer_id === "object") {
    // @ts-ignore
    return order.buyer_id.fullName || order.buyer_id.name || "Marvin McKinney";
  }
  return "Marvin McKinney";
}

interface RecentOrdersCardProps {
  orders: IOrder[];
  isLoading?: boolean;
}

export function RecentOrdersCard({ orders, isLoading }: RecentOrdersCardProps) {
  return (
    <Card className="border border-[#f0f0f0] shadow-none bg-white flex flex-col h-full rounded-lg">
      <CardHeader className="pb-4 px-5 pt-5 shrink-0 flex flex-row items-center justify-between space-y-0 border-b border-[#f9fafb]">
        <CardTitle className="text-[15px] font-semibold text-[#101828]">
          Recent Orders
        </CardTitle>
        <Select defaultValue="export">
          <SelectTrigger className="w-[90px] h-8 text-[11px] border-[#e4e7ec] bg-white text-[#344054] rounded-md font-normal">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="export">Export</SelectItem>
            <SelectItem value="pdf">Export PDF</SelectItem>
            <SelectItem value="csv">Export CSV</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-4 flex-1 flex flex-col min-h-0">
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
              {orders.map((order, index) => {
                const status = order.status.toLowerCase();
                const statusStyle =
                  statusColors[status] || statusColors.pending;
                const buyerName = getBuyerName(order);

                return (
                  <div
                    key={order._id}
                    className="flex items-center justify-between py-3.5 border-b border-[#f2f4f7] last:border-0"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-md bg-[#f9fafb] flex items-center justify-center text-[11px] font-medium text-[#667085] shrink-0 border border-[#eaecf0]">
                        #{(index + 321).toString()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[#101828] truncate leading-tight">
                          Turtle Neck
                        </p>
                        <p className="text-[11px] text-[#667085] truncate leading-tight mt-0.5">
                          {buyerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 leading-none"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: statusStyle.dot }}
                        />
                        {getStatusDisplay(order.status)}
                      </span>
                      <span className="text-[13px] font-semibold text-[#101828]">
                        ${order.total_amount?.toFixed(2) || "17.84"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/sellers/orders" className="mt-5">
              <Button
                variant="outline"
                className="w-full h-10 text-[#E6007A] border-[#E6007A] hover:bg-[#E6007A]/5 bg-white font-medium rounded-full text-[13px] flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
