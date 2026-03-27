"use client";

import { useOrderStatus } from "@/hooks/useOrder";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Package, Truck, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { IOrderStatusHistory } from "@/types/order.types";

interface OrderStatusModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderStatusModal({ orderId, isOpen, onClose }: OrderStatusModalProps) {
  const { data: statusResponse, isLoading, error } = useOrderStatus(isOpen ? orderId : null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Status Tracking</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Order #{orderId.slice(-6).toUpperCase()}
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
            </div>
          ) : error || !statusResponse || !statusResponse.orderStatus ? (
            <div className="text-center py-10 text-red-500 text-sm">
              Failed to load status history. Please try again.
            </div>
          ) : (
             <OrderStatusTimeline history={statusResponse.orderStatus} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OrderStatusTimeline({ history }: { history: IOrderStatusHistory[] }) {
  if (history.length === 0) {
    return <div className="text-center text-sm text-gray-500 py-4">No history available yet.</div>;
  }

  return (
    <div className="space-y-6 pl-2 max-h-[60vh] overflow-y-auto pr-4">
      {history.map((item, index) => {
        const isLast = index === history.length - 1;
        const statusLower = item.status.toLowerCase();
        
        let icon = <div className="w-2 h-2 rounded-full bg-white" />;
        if (statusLower === "pending" || statusLower === "placed") {
          icon = <Package className="w-4 h-4" />;
        } else if (statusLower === "in transit" || statusLower === "shipped") {
          icon = <Truck className="w-4 h-4" />;
        } else if (statusLower === "delivered") {
          icon = <CheckCircle className="w-4 h-4" />;
        }

        return (
          <TimelineStep
            key={index}
            icon={icon}
            title={item.status}
            description={item.note || "Status updated"}
            date={item.changed_at ? format(new Date(item.changed_at), "yyyy-MM-dd") : "N/A"}
            time={item.changed_at ? format(new Date(item.changed_at), "h:mm a") : ""}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
}

interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  time?: string;
  isLast?: boolean;
}

function TimelineStep({
  icon,
  title,
  description,
  date,
  time,
  isLast,
}: TimelineStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#f10e7c] text-white">
          {icon}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 mt-2 bg-[#f10e7c]" style={{ minHeight: "24px" }} />
        )}
      </div>
      <div className="flex-1 flex justify-between pb-2">
        <div>
          <h4 className="font-medium text-[#1a1a1a] capitalize">{title}</h4>
          <p className="text-sm text-[#f10e7c]">{description}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-sm text-[#1a1a1a]">{date}</p>
          {time && <p className="text-xs text-[#6b6b6b]">{time}</p>}
        </div>
      </div>
    </div>
  );
}
