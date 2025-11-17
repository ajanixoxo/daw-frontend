"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  HandCoins,
  Wallet,
  BarChart3,
  Settings,
  X,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  isOpen: boolean
  onToggle: () => void
  isCollapsed: boolean
  onCollapse: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/cooperative/dashboard" },
  { icon: ShoppingBag, label: "Members", href: "/cooperative/members" },
  { icon: HandCoins, label: "Contribution", href: "/cooperative/contributions" },
  { icon: Wallet, label: "Loans", href: "/cooperative/loans" },
  { icon: BarChart3, label: "Analytics", href: "/cooperative/analytics" },
  { icon: Settings, label: "Settings", href: "/cooperative/settings" },
]

export function DashboardSidebar({ isOpen, onToggle, isCollapsed, onCollapse }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} aria-hidden="true" />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-[#e7e8e9] transition-all duration-300 z-50",
          // Mobile
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop
          isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]",
          // Mobile width
          "w-[280px]",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#e7e8e9] min-h-[88px]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#f10e7c] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" fill="white" />
                </svg>
              </div>
              {!isCollapsed && (
                <span className="text-[#f10e7c] font-semibold text-base whitespace-nowrap">Digital African Women</span>
              )}
            </div>
            {/* Desktop collapse toggle - always visible on desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCollapse}
              className={cn("hidden lg:flex flex-shrink-0 h-8 w-8 hover:bg-[#f9f9f9]", isCollapsed && "mx-auto")}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="h-5 w-5 text-[#667185]" />
            </Button>
            {/* Mobile close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden flex-shrink-0 h-8 w-8 hover:bg-[#f9f9f9]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[#667185]" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive ? "bg-[#f10e7c] text-white" : "text-[#667185] hover:bg-[#f9f9f9]",
                        isCollapsed && "justify-center px-2",
                      )}
                      title={isCollapsed ? item.label : undefined}
                      aria-label={item.label}
                      onClick={() => {
                        if (isOpen) onToggle()
                      }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
