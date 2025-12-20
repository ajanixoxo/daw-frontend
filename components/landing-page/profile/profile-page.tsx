"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ProfileView } from "./profile-view"
import { OrdersView } from "./orders-view"
import { OrderDetailsView } from "./order-details-view"
import { TrackOrderView } from "./track-order-view"
import { FavoritesView } from "./favorites-view"
import { WalletView } from "./wallet-view"
import { SettingsView } from "./settings-view"

export type ViewType = "profile" | "orders" | "favorites" | "wallet" | "settings" | "order-details" | "track-order"

export interface Order {
  id: string
  items: number
  date: string
  price: number
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled"
  products: {
    name: string
    seller: string
    price: number
    qty: number
    image: string
  }[]
}

const orders: Order[] = [
  {
    id: "ORD-001",
    items: 2,
    date: "10/01/2025",
    price: 75.98,
    status: "Delivered",
    products: [
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-pillow-on-white-couch.jpg",
      },
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-decorative-pillow.jpg",
      },
    ],
  },
  {
    id: "ORD-002",
    items: 2,
    date: "10/01/2025",
    price: 75.98,
    status: "Delivered",
    products: [
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-pillow-on-white-couch.jpg",
      },
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-decorative-pillow.jpg",
      },
    ],
  },
  {
    id: "ORD-003",
    items: 2,
    date: "10/01/2025",
    price: 75.98,
    status: "In Transit",
    products: [
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-pillow-on-white-couch.jpg",
      },
      {
        name: "Handwoven Kente Scarf",
        seller: "Akosua Textiles",
        price: 85.0,
        qty: 4,
        image: "/handwoven-cream-textured-decorative-pillow.jpg",
      },
    ],
  },
]

export function ProfilePage() {
  const [activeView, setActiveView] = useState<ViewType>("profile")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [previousView, setPreviousView] = useState<ViewType>("orders")

  const handleViewChange = (view: ViewType) => {
    if (view !== "order-details" && view !== "track-order") {
      setSelectedOrder(null)
    }
    setActiveView(view)
  }

  const handleViewDetails = (order: Order) => {
    setPreviousView(activeView)
    setSelectedOrder(order)
    setActiveView("order-details")
  }

  const handleTrackOrder = (order: Order) => {
    setPreviousView(activeView)
    setSelectedOrder(order)
    setActiveView("track-order")
  }

  const handleBack = () => {
    if (activeView === "track-order") {
      setActiveView("order-details")
    } else {
      setActiveView("orders")
      setSelectedOrder(null)
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileView />
      case "orders":
        return <OrdersView orders={orders} onViewDetails={handleViewDetails} onTrack={handleTrackOrder} />
      case "order-details":
        return selectedOrder ? (
          <OrderDetailsView order={selectedOrder} onBack={handleBack} onTrack={() => handleTrackOrder(selectedOrder)} />
        ) : null
      case "track-order":
        return selectedOrder ? <TrackOrderView order={selectedOrder} onBack={handleBack} /> : null
      case "favorites":
        return <FavoritesView />
      case "wallet":
        return <WalletView />
      case "settings":
        return <SettingsView />
      default:
        return <ProfileView />
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          activeView={activeView === "order-details" || activeView === "track-order" ? "orders" : activeView}
          onViewChange={handleViewChange}
        />
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>
    </div>
  )
}
