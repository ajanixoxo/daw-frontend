"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/(dashboards)/sellers-dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/(dashboards)/sellers-dashboard/dashboard-header"
import { cn } from "@/lib/utils"
import { useRefreshToken } from "@/hooks/useRefreshToken"

export default function SellersDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { mutate: refreshToken } = useRefreshToken()

  // Refresh token on mount/reload
  useEffect(() => {
    refreshToken()
  }, [refreshToken])

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <DashboardSidebar
        isOpen={mobileSidebarOpen}
        onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isCollapsed={isCollapsed}
        onCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className={cn("transition-all duration-300", isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]", "ml-0")}>
        <DashboardHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {children}
      </div>
    </div>
  )
}
