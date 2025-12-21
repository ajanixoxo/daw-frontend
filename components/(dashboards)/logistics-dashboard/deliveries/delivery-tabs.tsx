"use client"

interface DeliveryTabsProps {
  activeTab: "all" | "active" | "completed"
  onTabChange: (tab: "all" | "active" | "completed") => void
}

export function DeliveryTabs({ activeTab, onTabChange }: DeliveryTabsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <button
        onClick={() => onTabChange("all")}
        className={`rounded-lg px-6 py-3 text-center text-sm font-medium transition-all ${
          activeTab === "all"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        All Deliveries
      </button>
      <button
        onClick={() => onTabChange("active")}
        className={`rounded-lg px-6 py-3 text-center text-sm font-medium transition-all ${
          activeTab === "active"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Active Deliveries
      </button>
      <button
        onClick={() => onTabChange("completed")}
        className={`rounded-lg px-6 py-3 text-center text-sm font-medium transition-all ${
          activeTab === "completed"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Completed Deliveries
      </button>
    </div>
  )
}
