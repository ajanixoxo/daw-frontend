"use client"

import { useState } from "react"
import { DeliveryTabs } from "@/components/(dashboards)/logistics-dashboard/deliveries/delivery-tabs"
import { AllDeliveriesView } from "@/components/(dashboards)/logistics-dashboard/deliveries/all-deliveries-view"
import { NewDeliveriesView } from "@/components/(dashboards)/logistics-dashboard/deliveries/new-deliveries-view"
import { ActiveDeliveriesView } from "@/components/(dashboards)/logistics-dashboard/deliveries/active-deliveries-view"
import { CompletedDeliveriesView } from "@/components/(dashboards)/logistics-dashboard/deliveries/completed-deliveries-view"

export default function DeliveriesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "new" | "active" | "completed">("all")

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Deliveries</h1>
          <p className="text-muted-foreground">Get an Overview of your store activity here</p>
        </div>

        {/* Tabs */}
        <DeliveryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "all" && <AllDeliveriesView />}
          {activeTab === "new" && <NewDeliveriesView />}
          {activeTab === "active" && <ActiveDeliveriesView />}
          {activeTab === "completed" && <CompletedDeliveriesView />}
        </div>
      </div>
    </div>
  )
}
