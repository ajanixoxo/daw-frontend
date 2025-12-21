<<<<<<< HEAD
"use client";

import type React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { format } from "date-fns";

interface TrackOrderViewProps {
  orderId: string;
  onBack: () => void;
}

export function TrackOrderView({ orderId, onBack }: TrackOrderViewProps) {
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

  // Calculate progress based on status
  let progressPercentage = 0;
  if (order.status === "pending") progressPercentage = 25;
  else if (order.status === "processing") progressPercentage = 50;
  else if (order.status === "in transit") progressPercentage = 75;
  else if (order.status === "delivered") progressPercentage = 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
        </button>
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#1a1a1a]">
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-16 h-14 rounded-lg overflow-hidden bg-[#f5f5f5] shrink-0 relative">
            {/* <Image
              src={order.shop_id.logo_url || "/placeholder.svg"}
              alt={order.shop_id.name}
              fill
              className="object-cover"
            /> */}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-[#1a1a1a]">
                  {order.shop_id.name}
                </h3>
                <p className="text-sm text-[#6b6b6b]">
                  {order.shop_id.category}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-[#fce4ec] text-[#f10e7c]"
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-xs text-[#6b6b6b]">
                  Placed: {format(new Date(order.createdAt), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#f10e7c]">Order Progress</span>
            <span className="text-sm text-[#6b6b6b]">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#f5f5f5] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercentage}%`,
                background:
                  "linear-gradient(90deg, #f10e7c 0%, #f10e7c 80%, #fce4ec 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address - Placeholder */}
      {/* <div className="space-y-3">
        <h3 className="font-semibold text-[#1a1a1a]">Shipping Address</h3>
        <div className="bg-[#f9f9f9] rounded-xl p-4 border border-[#e7e8e9]">
          <p className="font-medium text-[#1a1a1a]">Porto Place</p>
          <p className="text-[#6b6b6b] text-sm">123 Lagos Street</p>
          <p className="text-[#6b6b6b] text-sm">Lagos, Nigeria 100001</p>
        </div>
      </div> */}

      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-6">
        <h3 className="font-semibold text-[#1a1a1a] mb-6">Order Timeline</h3>
        <div className="space-y-6">
          <TimelineStep
            icon={<Package className="w-4 h-4" />}
            status="completed"
            title="Order Placed"
            description="Your order has been placed and confirmed"
            date={format(new Date(order.createdAt), "yyyy-MM-dd")}
            time={format(new Date(order.createdAt), "h:mm a")}
          />
          <TimelineStep
            icon={<div className="w-2 h-2 rounded-full bg-white" />}
            status={order.status !== "pending" ? "completed" : "pending"}
            title="Processing"
            description="Your order is being prepared by the seller"
            date={format(new Date(order.createdAt), "yyyy-MM-dd")}
            expected={order.status === "pending"}
          />
          <TimelineStep
            icon={<Truck className="w-4 h-4" />}
            status={
              order.status === "in transit" || order.status === "delivered"
                ? "completed"
                : "pending"
            }
            title="Shipped"
            description="Your package has been picked up and is on its way"
            date={format(new Date(order.createdAt), "yyyy-MM-dd")}
            expected={
              order.status === "pending" || order.status === "processing"
            }
          />
          <TimelineStep
            icon={<CheckCircle className="w-4 h-4" />}
            status={order.status === "delivered" ? "completed" : "pending"}
            title="Delivered"
            description="Package delivered successfully"
            date={format(new Date(order.createdAt), "yyyy-MM-dd")}
            expected={order.status !== "delivered"}
            isLast
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 py-3 px-6 border border-[#e7e8e9] rounded-full text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors text-sm">
          Contact Seller
        </button>
        <button className="flex-1 py-3 px-6 border border-[#e7e8e9] rounded-full text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors text-sm">
          Report Issue
        </button>
        <button className="flex-1 py-3 px-6 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#2f2f2f] transition-colors text-sm">
          Download Receipt
        </button>
      </div>
    </div>
  );
}

interface TimelineStepProps {
  icon: React.ReactNode;
  status: "completed" | "pending";
  title: string;
  description: string;
  date: string;
  time?: string;
  expected?: boolean;
  isLast?: boolean;
}

function TimelineStep({
  icon,
  status,
  title,
  description,
  date,
  time,
  expected,
  isLast,
}: TimelineStepProps) {
  const isCompleted = status === "completed";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isCompleted
              ? "bg-[#f10e7c] text-white"
              : "bg-[#e5e5e5] text-[#a1a1a1]"
          }`}
        >
          {icon}
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-2 ${
              isCompleted ? "bg-[#f10e7c]" : "bg-[#e5e5e5]"
            }`}
            style={{ minHeight: "24px" }}
          />
        )}
      </div>
      <div className="flex-1 flex justify-between pb-2">
        <div>
          <h4
            className={`font-medium ${
              isCompleted ? "text-[#1a1a1a]" : "text-[#a1a1a1]"
            }`}
          >
            {title}
          </h4>
          <p
            className={`text-sm ${
              isCompleted ? "text-[#f10e7c]" : "text-[#a1a1a1]"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p
            className={`text-sm ${
              isCompleted ? "text-[#1a1a1a]" : "text-[#a1a1a1]"
            }`}
          >
            {date}
          </p>
          {expected ? (
            <p className="text-xs text-[#34c759]">Expected</p>
          ) : time ? (
            <p className="text-xs text-[#6b6b6b]">{time}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
=======
"use client"

import type React from "react"

import Image from "next/image"
import { ArrowLeft, Package, Truck, MapPin, CheckCircle } from "lucide-react"
import type { Order } from "./profile-page"

interface TrackOrderViewProps {
  order: Order
  onBack: () => void
}

export function TrackOrderView({ order, onBack }: TrackOrderViewProps) {
  const progressPercentage = 75

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
        </button>
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#1a1a1a]">Order {order.id}</h1>
      </div>

      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-16 h-14 rounded-lg overflow-hidden bg-[#f5f5f5] shrink-0">
            <Image
              src={order.products[0]?.image || "/placeholder.svg"}
              alt={order.products[0]?.name || "Product"}
              width={64}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-[#1a1a1a]">{order.products[0]?.name}</h3>
                <p className="text-sm text-[#6b6b6b]">
                  Quantity: {order.products.length} • by {order.products[0]?.seller} Cooperative
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#fce4ec] text-[#f10e7c]">
                  In Transit
                </span>
                <p className="text-xs text-[#6b6b6b]">Estimated delivery: 20/01/2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#f10e7c]">Order Progress</span>
            <span className="text-sm text-[#6b6b6b]">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#f5f5f5] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercentage}%`,
                background: "linear-gradient(90deg, #f10e7c 0%, #f10e7c 80%, #fce4ec 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-3">
        <h3 className="font-semibold text-[#1a1a1a]">Shipping Address</h3>
        <div className="bg-[#f9f9f9] rounded-xl p-4 border border-[#e7e8e9]">
          <p className="font-medium text-[#1a1a1a]">Porto Place</p>
          <p className="text-[#6b6b6b] text-sm">123 Lagos Street</p>
          <p className="text-[#6b6b6b] text-sm">Lagos, Nigeria 100001</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-6">
        <h3 className="font-semibold text-[#1a1a1a] mb-6">Order Timeline</h3>
        <div className="space-y-6">
          <TimelineStep
            icon={<Package className="w-4 h-4" />}
            status="completed"
            title="Order Placed"
            description="Your order has been placed and confirmed"
            date="2025-01-15"
            time="10:30 AM"
          />
          <TimelineStep
            icon={<div className="w-2 h-2 rounded-full bg-white" />}
            status="completed"
            title="Processing"
            description="Your order is being prepared by the seller"
            date="2025-01-15"
            time="10:30 AM"
          />
          <TimelineStep
            icon={<Truck className="w-4 h-4" />}
            status="completed"
            title="Shipped"
            description="Your package has been picked up and is on its way"
            date="2025-01-15"
            time="10:30 AM"
          />
          <TimelineStep
            icon={<MapPin className="w-4 h-4" />}
            status="pending"
            title="Out for Delivery"
            description="Your package is out for delivery"
            date="2025-01-15"
            expected
          />
          <TimelineStep
            icon={<CheckCircle className="w-4 h-4" />}
            status="pending"
            title="Delivered"
            description="Package delivered successfully"
            date="2025-01-15"
            expected
            isLast
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 py-3 px-6 border border-[#e7e8e9] rounded-full text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors text-sm">
          Contact Seller
        </button>
        <button className="flex-1 py-3 px-6 border border-[#e7e8e9] rounded-full text-[#1a1a1a] font-medium hover:bg-[#f5f5f5] transition-colors text-sm">
          Report Issue
        </button>
        <button className="flex-1 py-3 px-6 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#2f2f2f] transition-colors text-sm">
          Download Receipt
        </button>
      </div>
    </div>
  )
}

interface TimelineStepProps {
  icon: React.ReactNode
  status: "completed" | "pending"
  title: string
  description: string
  date: string
  time?: string
  expected?: boolean
  isLast?: boolean
}

function TimelineStep({ icon, status, title, description, date, time, expected, isLast }: TimelineStepProps) {
  const isCompleted = status === "completed"

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isCompleted ? "bg-[#f10e7c] text-white" : "bg-[#e5e5e5] text-[#a1a1a1]"
          }`}
        >
          {icon}
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-2 ${isCompleted ? "bg-[#f10e7c]" : "bg-[#e5e5e5]"}`}
            style={{ minHeight: "24px" }}
          />
        )}
      </div>
      <div className="flex-1 flex justify-between pb-2">
        <div>
          <h4 className={`font-medium ${isCompleted ? "text-[#1a1a1a]" : "text-[#a1a1a1]"}`}>{title}</h4>
          <p className={`text-sm ${isCompleted ? "text-[#f10e7c]" : "text-[#a1a1a1]"}`}>{description}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className={`text-sm ${isCompleted ? "text-[#1a1a1a]" : "text-[#a1a1a1]"}`}>{date}</p>
          {expected ? (
            <p className="text-xs text-[#34c759]">Expected</p>
          ) : time ? (
            <p className="text-xs text-[#6b6b6b]">{time}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
>>>>>>> coop/join
