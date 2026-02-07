"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ShoppingCart,
  HandCoins,
  Wallet,
  BarChart3,
  Settings,
  X,
  Menu,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSellerProfile } from "@/hooks/useSellerProfile"
import { useLogout } from "@/hooks/useAuth"

interface DashboardSidebarProps {
  isOpen: boolean
  onToggle: () => void
  isCollapsed: boolean
  onCollapse: () => void
}

const allNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/sellers/dashboard" },
  { icon: ShoppingBag, label: "Shop", href: "/sellers/shop" },
  { icon: Package, label: "Products", href: "/sellers/products" },
  { icon: ShoppingCart, label: "Orders", href: "/sellers/orders" },
  { icon: HandCoins, label: "Contribution", href: "/sellers/contribution", memberOnly: true },
  { icon: Wallet, label: "Loans", href: "/sellers/loans", memberOnly: true },
  { icon: BarChart3, label: "Analytics", href: "/sellers/analytics" },
  { icon: Settings, label: "Settings", href: "/sellers/settings" },
]

export function DashboardSidebar({ isOpen, onToggle, isCollapsed, onCollapse }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { data: user } = useSellerProfile()
  const { logout, isLoading: isLoggingOut } = useLogout()

  const handleLogout = async () => {
    await logout()
  }

  // Check if user is a cooperative member (by role or member data)
  const isMember =
    user?.roles?.includes("member") ||
    user?.roles?.includes("cooperative") ||
    (user?.member &&
      Array.isArray(user.member) &&
      user.member.length > 0 &&
      user.member.some((m: { cooperativeId?: string }) => m.cooperativeId))

  // Filter nav items: memberOnly items only show for cooperative members
  const navItems = allNavItems.filter(item => {
    if (item.memberOnly && !isMember) {
      return false
    }
    return true
  })

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
          <div className="flex items-center justify-between px-2 py-6 border-b border-[#e7e8e9] min-h-[88px]">
            <div className="flex items-center gap-0.5 overflow-hidden">
              {isCollapsed ? (
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="Logo" className="h-7 w-7" />
              </div>
              ) : (
              <img src="/logo-full.png" alt="Logo" className="h-6" />
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
              <img src="/sidebar-left.svg" alt="Collapse sidebar" className="h-3 w-3" />
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

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-[#e7e8e9]">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                "text-red-600 hover:bg-red-50",
                isCollapsed && "justify-center px-2",
              )}
              title={isCollapsed ? "Logout" : undefined}
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="whitespace-nowrap">{isLoggingOut ? "Logging out..." : "Logout"}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
