"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ProfileView } from "./profile-view";
import { OrdersView } from "./orders-view";
import { OrderDetailsView } from "./order-details-view";
import { TrackOrderView } from "./track-order-view";
import { FavoritesView } from "./favorites-view";
import { WalletView } from "./wallet-view";
import { SettingsView } from "./settings-view";

export type ViewType =
  | "profile"
  | "orders"
  | "favorites"
  | "wallet"
  | "settings"
  | "order-details"
  | "track-order";

export interface Order {
  id: string;
  items: number;
  date: string;
  price: number;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
  products: {
    name: string;
    seller: string;
    price: number;
    qty: number;
    image: string;
  }[];
}

export function ProfilePage() {
  const [activeView, setActiveView] = useState<ViewType>("profile");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<ViewType>("orders");

  const handleViewChange = (view: ViewType) => {
    if (view !== "order-details" && view !== "track-order") {
      setSelectedOrderId(null);
    }
    setActiveView(view);
  };

  const handleViewDetails = (orderId: string) => {
    setPreviousView(activeView);
    setSelectedOrderId(orderId);
    setActiveView("order-details");
  };

  const handleTrackOrder = (orderId: string) => {
    setPreviousView(activeView);
    setSelectedOrderId(orderId);
    setActiveView("track-order");
  };

  const handleBack = () => {
    if (activeView === "track-order") {
      setActiveView("order-details");
    } else {
      setActiveView("orders");
      setSelectedOrderId(null);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileView />;
      case "orders":
        return (
          <OrdersView
            onViewDetails={handleViewDetails}
            onTrack={handleTrackOrder}
          />
        );
      case "order-details":
        return selectedOrderId ? (
          <OrderDetailsView
            orderId={selectedOrderId}
            onBack={handleBack}
            onTrack={() => handleTrackOrder(selectedOrderId)}
          />
        ) : null;
      case "track-order":
        return selectedOrderId ? (
          <TrackOrderView orderId={selectedOrderId} onBack={handleBack} />
        ) : null;
      case "favorites":
        return <FavoritesView />;
      case "wallet":
        return <WalletView />;
      case "settings":
        return <SettingsView />;
      default:
        return <ProfileView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">
        <Sidebar
          activeView={
            activeView === "order-details" || activeView === "track-order"
              ? "orders"
              : activeView
          }
          onViewChange={handleViewChange}
        />
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>
    </div>
  );
}
