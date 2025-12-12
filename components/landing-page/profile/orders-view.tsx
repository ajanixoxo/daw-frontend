"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight, QrCode, Search } from "lucide-react";
import type { Order } from "./profile-page";

interface OrdersViewProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onTrack: (order: Order) => void;
}

export function OrdersView({
  orders,
  onViewDetails,
  onTrack,
}: OrdersViewProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "cancelled") return order.status === "Cancelled";
    if (activeTab === "upcoming")
      return order.status === "In Transit" || order.status === "Processing";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
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
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[280px] pl-10 pr-4 py-2.5 bg-[#f5f5f5] rounded-xl border-0 text-sm placeholder:text-[#a1a1a1] focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={onViewDetails}
            onTrack={onTrack}
          />
        ))}
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onTrack: (order: Order) => void;
}

function OrderCard({ order, onViewDetails, onTrack }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
        {/* Product Image */}
        <div className="w-full sm:w-[200px] h-[140px] rounded-xl overflow-hidden bg-[#f5f5f5] shrink-0">
          <Image
            src="/handwoven-cream-textured-pillow-on-white-couch-wit.jpg"
            alt="Order product"
            width={200}
            height={140}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#6b6b6b] mb-1">
            <span>{order.items} items</span>
            <span>{order.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
            Order {order.id}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-[#f10e7c] font-semibold">
              ${order.price.toFixed(2)}
            </span>
            <ArrowRight className="w-4 h-4 text-[#f10e7c]" />
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Delivered"
                ? "text-[#34c759]"
                : order.status === "In Transit"
                ? "text-[#f10e7c]"
                : order.status === "Processing"
                ? "text-[#808080]"
                : "text-red-500"
            }`}
          >
            {order.status}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onTrack(order)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e5e5] rounded-full text-sm font-medium text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Track
            </button>
            <button
              onClick={() => onViewDetails(order)}
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
