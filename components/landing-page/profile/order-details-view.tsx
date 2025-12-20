"use client"

import Image from "next/image"
import { ArrowLeft, Package, Truck } from "lucide-react"
import type { Order } from "./profile-page"

interface OrderDetailsViewProps {
  order: Order
  onBack: () => void
  onTrack: () => void
}

export function OrderDetailsView({ order, onBack, onTrack }: OrderDetailsViewProps) {
  const subtotal = 121.97
  const shipping = 9.99
  const tax = 12.2
  const storeViews = 1234
  const couponDiscount = -21.97
  const total = 109.99

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="p-1 hover:bg-[#f5f5f5] rounded-lg transition-colors mt-1">
            <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#1a1a1a]">Order Details</h1>
            <p className="text-[#6b6b6b] text-sm mt-1">Order {order.id}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#fce4ec] text-[#f10e7c]">{order.status}</span>
      </div>

      {/* Products Card */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-5 md:p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-[#1a1a1a]">Products</h2>
          <span className="text-[#6b6b6b] text-sm">Sub Total</span>
        </div>

        <div className="space-y-5">
          {order.products.map((product, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-16 h-14 md:w-20 md:h-16 rounded-lg overflow-hidden bg-[#f5f5f5] shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#1a1a1a] text-sm md:text-base">{product.name}</h3>
                <p className="text-xs md:text-sm text-[#6b6b6b]">by {product.seller}</p>
                <p className="text-xs md:text-sm text-[#6b6b6b]">Qty: {product.qty}</p>
              </div>
              <span className="text-[#f10e7c] font-semibold text-sm md:text-base">${product.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-6 pt-6 border-t border-[#e7e8e9]">
          <h3 className="font-semibold text-[#1a1a1a] mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#0891b2] text-sm">Subtotal</span>
              <span className="text-[#1a1a1a] text-sm">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0891b2] text-sm">Shipping</span>
              <span className="text-[#1a1a1a] text-sm">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0891b2] text-sm">Tax</span>
              <span className="text-[#1a1a1a] text-sm">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0891b2] text-sm">Store Views</span>
              <span className="text-[#1a1a1a] text-sm">{storeViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0891b2] text-sm">Coupon Discount</span>
              <span className="text-[#1a1a1a] text-sm">-${Math.abs(couponDiscount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#e7e8e9]">
              <span className="font-semibold text-[#1a1a1a]">Total</span>
              <span className="font-semibold text-[#f10e7c]">${total.toFixed(2)}</span>
            </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Order Timeline */}
        <div className="bg-white rounded-2xl border border-[#e7e8e9] p-4 md:p-5">
          <h3 className="font-semibold text-[#1a1a1a] mb-5">Order Timeline</h3>
          <div className="space-y-4">
            <TimelineItem icon="box" status="completed" title="Order Placed" date="2025-01-15" time="at 10:30 AM" />
            <TimelineItem
              icon="processing"
              status="completed"
              title="Processing"
              date="2025-01-15"
              time="at 10:30 AM"
            />
            <TimelineItem icon="truck" status="completed" title="Processing" date="2025-01-15" time="at 10:30 AM" />
            <TimelineItem icon="delivery" status="pending" title="Out for Delivery" expected />
            <TimelineItem icon="delivered" status="pending" title="Delivered" expected />
          </div>
        </div>

        {/* Tracking Information */}
        <div className="bg-[#f5f5f5] rounded-2xl p-4 md:p-5">
          <h3 className="font-semibold text-[#1a1a1a] mb-5">Tracking Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#6b6b6b] mb-0.5">Tracking Number</p>
              <p className="font-semibold text-[#1a1a1a]">DHL123456789</p>
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b] mb-0.5">Carrier</p>
              <p className="font-semibold text-[#1a1a1a]">DHL Express</p>
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
  )
}

interface TimelineItemProps {
  icon: "box" | "processing" | "truck" | "delivery" | "delivered"
  status: "completed" | "pending"
  title: string
  date?: string
  time?: string
  expected?: boolean
}

function TimelineItem({ icon, status, title, date, time, expected }: TimelineItemProps) {
  const isCompleted = status === "completed"

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isCompleted ? "bg-[#f10e7c]" : "bg-[#e5e5e5]"
        }`}
      >
        {icon === "box" && isCompleted && <Package className="w-3.5 h-3.5 text-white" />}
        {icon === "processing" && isCompleted && <div className="w-2 h-2 rounded-full bg-white" />}
        {icon === "truck" && isCompleted && <Truck className="w-3.5 h-3.5 text-white" />}
        {!isCompleted && <div className="w-2 h-2 rounded-full bg-[#a1a1a1]" />}
      </div>
      <div className="flex-1 flex justify-between items-center">
        <span className={`font-medium text-sm ${!isCompleted ? "text-[#a1a1a1]" : "text-[#1a1a1a]"}`}>{title}</span>
        {expected ? (
          <span className="text-xs text-[#34c759]">Expected</span>
        ) : (
          <span className="text-xs text-[#6b6b6b]">
            {date} {time}
          </span>
        )}
      </div>
    </div>
  )
}
