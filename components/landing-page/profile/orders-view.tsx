"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight, QrCode, Search, Loader2 } from "lucide-react";
import { useOrders } from "@/hooks/useOrder";
import type { IOrder } from "@/types/order.types";
import { format } from "date-fns";

interface OrdersViewProps {
  onViewDetails: (orderId: string) => void;
  onTrack: (orderId: string) => void;
}

export function OrdersView({ onViewDetails, onTrack }: OrdersViewProps) {
  const { data: ordersResponse, isLoading, error } = useOrders();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const orders = ordersResponse?.orders || [];

  const filteredOrders = orders.filter((order) => {
    // Filter by tab
    if (activeTab === "cancelled") {
      if (order.status.toLowerCase() !== "cancelled") return false;
    }
    if (activeTab === "upcoming") {
      const status = order.status.toLowerCase();
      if (
        status !== "pending" &&
        status !== "processing" &&
        status !== "in transit"
      )
        return false;
    }

    // Filter by search query (search by ID or shop name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const orderIdMatch = order._id?.toLowerCase().includes(query) || false;
      const shopNameMatch = order.shop_id?.name?.toLowerCase().includes(query) || false;
      return orderIdMatch || shopNameMatch;
    }

    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className=" text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
          Order History
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e7e8e9] rounded-full text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors w-fit">
          <span>All Time</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#1a1a1a] border-b-2 border-[#f10e7c]"
                  : "text-[#6b6b6b] hover:text-[#1a1a1a]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1a1]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[280px] pl-10 pr-4 py-2.5 bg-[#f5f5f5] rounded-xl border-0 text-sm placeholder:text-[#a1a1a1] focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onViewDetails={() => onViewDetails(order._id)}
              onTrack={() => onTrack(order._id)}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: IOrder;
  onViewDetails: () => void;
  onTrack: () => void;
}

function OrderCard({ order, onViewDetails, onTrack }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
        {/* Product Image - Placeholder or Shop Logo/Banner */}
        <div className="w-full sm:w-[200px] h-[140px] rounded-xl overflow-hidden bg-[#f5f5f5] shrink-0 relative">
          <Image
            src={
              order.items?.[0]?.product_image ||
              order.shop_id?.logo_url ||
              "/placeholder.svg"
            }
            alt={order.items?.[0]?.product_name || order.shop_id?.name || "Order Image"}
            fill
            className="object-cover"
          />
        </div>

        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#6b6b6b] mb-1">
            <span>
              {order.createdAt
                ? format(new Date(order.createdAt), "MMM dd, yyyy")
                : "N/A"}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
            Order #{order._id ? order._id.slice(-6).toUpperCase() : "UNKNOWN"}
          </h3>
          <p className="text-sm text-[#6b6b6b] mb-2">
            Shop: {order.shop_id?.name || "Unknown Shop"}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[#f10e7c] font-semibold">
              ₦
              {order.total_amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>
            <ArrowRight className="w-4 h-4 text-[#f10e7c]" />
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              order.status === "delivered"
                ? "text-[#34c759] bg-green-50"
                : order.status === "in transit"
                  ? "text-[#f10e7c] bg-pink-50"
                  : order.status === "pending" || order.status === "processing"
                    ? "text-[#808080] bg-gray-100"
                    : "text-red-500 bg-red-50"
            }`}
          >
            {order.status}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onTrack}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e5e5] rounded-full text-sm font-medium text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Track
            </button>
            <button
              onClick={onViewDetails}
              className="px-4 py-2.5 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-[#2f2f2f] transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
