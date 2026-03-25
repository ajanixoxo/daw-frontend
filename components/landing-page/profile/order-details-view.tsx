"use client";

import Image from "next/image";
import { ArrowLeft, Package, Truck, Loader2 } from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { format } from "date-fns";

interface OrderDetailsViewProps {
  orderId: string;
  onBack: () => void;
  onTrack: () => void;
}

export function OrderDetailsView({
  orderId,
  onBack,
  onTrack,
}: OrderDetailsViewProps) {
  const { data: orderResponse, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  if (error || !orderResponse?.order) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load order details. Please try again later.
      </div>
    );
  }

  const { order } = orderResponse;

  /*
  {
    "success": true,
    "order": {
        "_id": "...",
        ...
        "total_amount": 59998.98,
        ...
    }
  }
  */

  const subtotal = order.total_amount;
  const shipping = 1500;
  const tax = subtotal * 0.075;
  const total = subtotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div>
            <h1 className=" text-2xl md:text-3xl font-medium text-[#1a1a1a]">
              Order Details
            </h1>
            <p className="text-[#6b6b6b] text-sm mt-1">
              Order #{order._id ? order._id.slice(-6).toUpperCase() : "UNKNOWN"}
            </p>
            <p className="text-[#6b6b6b] text-xs">
              Placed on{" "}
              {order.createdAt
                ? format(new Date(order.createdAt), "MMM dd, yyyy 'at' h:mm a")
                : "N/A"}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-[#fce4ec] text-[#f10e7c]"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-5 md:p-6">
        <h2 className="font-semibold text-[#1a1a1a] mb-5">Order Items</h2>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item._id} className="flex gap-4 p-3 bg-[#f9f9f9] rounded-xl border border-[#e7e8e9]">
              <div className="w-20 h-20 rounded-lg overflow-hidden relative shrink-0 bg-white">
                <Image
                  src={item.product_image || "/placeholder.svg"}
                  alt={item.product_name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#1a1a1a] truncate">{item.product_name || "Unknown Product"}</h4>
                <p className="text-sm text-[#6b6b6b] line-clamp-1">{item.product_description || ""}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold text-[#f10e7c]">
                    ₦{(item.price_at_purchase || 0).toLocaleString()} x {item.quantity || 0}
                  </span>
                  <span className="text-sm font-bold text-[#1a1a1a]">
                    ₦{((item.price_at_purchase || 0) * (item.quantity || 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Info Footer */}
        <div className="mt-6 pt-6 border-t border-[#e7e8e9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 relative shrink-0">
            {order.shop_id?.logo_url ? (
              <Image
                src={order.shop_id.logo_url}
                alt={order.shop_id.name || "Shop Logo"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#fce4ec] text-[#f10e7c] text-xs font-bold">
                {order.shop_id?.name?.charAt(0) || "S"}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-[#6b6b6b]">Sold by</p>
            <h3 className="text-sm font-medium text-[#1a1a1a]">{order.shop_id?.name || "Unknown Shop"}</h3>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-6 border-t border-[#e7e8e9]">
          <h3 className="font-semibold text-[#1a1a1a] mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#6b6b6b] text-sm">Total Amount</span>
              <span className="font-semibold text-[#f10e7c]">
                ₦{(order.total_amount || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6b6b] text-sm">Payment Status</span>
              <span className="text-[#1a1a1a] text-sm capitalize">
                {order.payment_status || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address - Placeholder as it's not in the order object yet */}
      {/* <div className="space-y-3">
        <h3 className="font-semibold text-[#1a1a1a]">Shipping Address</h3>
        <div className="bg-[#f9f9f9] rounded-xl p-4 border border-[#e7e8e9]">
          <p className="font-medium text-[#1a1a1a]">Porto Place</p>
          <p className="text-[#6b6b6b] text-sm">123 Lagos Street</p>
          <p className="text-[#6b6b6b] text-sm">Lagos, Nigeria 100001</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Order Timeline */}
        <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-5">
          <h3 className="font-semibold text-[#1a1a1a] mb-5">Order Timeline</h3>
          <div className="space-y-4">
            <TimelineItem
              icon="box"
              status="completed"
              title="Order Placed"
              date={order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : ""}
              time={order.createdAt ? format(new Date(order.createdAt), "h:mm a") : ""}
            />
            <TimelineItem
              icon="processing"
              status={order.status !== "pending" ? "completed" : "pending"}
              title="Processing"
              expected={order.status === "pending"}
            />
            <TimelineItem
              icon="truck"
              status={
                order.status === "in transit" || order.status === "delivered"
                  ? "completed"
                  : "pending"
              }
              title="In Transit"
              expected={
                order.status === "pending" || order.status === "processing"
              }
            />
            <TimelineItem
              icon="delivered"
              status={order.status === "delivered" ? "completed" : "pending"}
              title="Delivered"
              expected={order.status !== "delivered"}
            />
          </div>
        </div>

        {/* Tracking Information */}
        <div className="bg-[#f5f5f5] rounded-2xl p-4 md:p-5">
          <h3 className="font-semibold text-[#1a1a1a] mb-5">
            Tracking Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#6b6b6b] mb-0.5">Order ID</p>
              <p className="font-semibold text-[#1a1a1a]">{order._id || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b] mb-0.5">Shop</p>
              <p className="font-semibold text-[#1a1a1a]">
                {order.shop_id?.name || "Unknown Shop"}
              </p>
            </div>
          </div>
          <button
            onClick={onTrack}
            className="w-full mt-6 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#2f2f2f] transition-colors text-sm"
          >
            Track Package
          </button>
        </div>
      </div>
    </div>
  );
}

interface TimelineItemProps {
  icon: "box" | "processing" | "truck" | "delivery" | "delivered";
  status: "completed" | "pending";
  title: string;
  date?: string;
  time?: string;
  expected?: boolean;
}

function TimelineItem({
  icon,
  status,
  title,
  date,
  time,
  expected,
}: TimelineItemProps) {
  const isCompleted = status === "completed";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isCompleted ? "bg-[#f10e7c]" : "bg-[#e5e5e5]"
        }`}
      >
        {icon === "box" && isCompleted && (
          <Package className="w-3.5 h-3.5 text-white" />
        )}
        {icon === "processing" && isCompleted && (
          <div className="w-2 h-2 rounded-full bg-white" />
        )}
        {icon === "truck" && isCompleted && (
          <Truck className="w-3.5 h-3.5 text-white" />
        )}
        {!isCompleted && <div className="w-2 h-2 rounded-full bg-[#a1a1a1]" />}
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span
          className={`font-medium text-sm ${
            !isCompleted ? "text-[#a1a1a1]" : "text-[#1a1a1a]"
          }`}
        >
          {title}
        </span>
        {expected ? (
          <span className="text-xs text-[#34c759]">Expected</span>
        ) : (
          <span className="text-xs text-[#6b6b6b]">
            {date} {time}
          </span>
        )}
      </div>
    </div>
  );
}
