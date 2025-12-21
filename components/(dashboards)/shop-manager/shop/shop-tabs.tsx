"use client"

import { useState } from "react"

export function ShopTabs() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders")

  return (
    <div className="mb-8 flex gap-4">
      <button
        onClick={() => setActiveTab("products")}
        className={`flex-1 rounded-xl px-6 py-3 text-center font-medium transition-colors ${
          activeTab === "products" ? "bg-[#f10e7c] text-white" : "bg-white text-[#667185] hover:bg-[#f5f5f5]"
        }`}
      >
        Products
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        className={`flex-1 rounded-xl px-6 py-3 text-center font-medium transition-colors ${
          activeTab === "orders" ? "bg-[#f10e7c] text-white" : "bg-white text-[#667185] hover:bg-[#f5f5f5]"
        }`}
      >
        Orders
      </button>
    </div>
  )
}
