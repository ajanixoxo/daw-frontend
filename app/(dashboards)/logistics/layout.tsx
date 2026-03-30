"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/zustand/store"
import { DashboardSidebar } from "@/components/(dashboards)/logistics-dashboard/logistics-dashboard-sidebar"
import { DashboardHeader } from "@/components/(dashboards)/logistics-dashboard/logistics-dashboard-header"
import { cn } from "@/lib/utils"

export default function LogisticsDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Check if user is authenticated and is a logistics provider
    const checkAuth = () => {
      if (!isAuthenticated || !user) {
        router.push("/login")
        return
      }

      const roles = user.roles || []
      const isLogisticsProvider = roles.includes("logistics_provider")
      const isAdmin = roles.includes("admin") || roles.includes("support-admin")

      if (!isLogisticsProvider && !isAdmin) {
        // If not a logistics provider or admin, redirect to home or an unauthorized page
        router.push("/")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [isAuthenticated, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink"></div>
      </div>
    )
  }

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
