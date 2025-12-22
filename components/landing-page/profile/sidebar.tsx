"use client"

import { User, ShoppingBag, Heart, Wallet, Settings, Store } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuthState"
import type { ViewType } from "./profile-page"

interface SidebarProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

const menuItems = [
  { id: "profile" as ViewType, label: "Profile", icon: User },
  { id: "orders" as ViewType, label: "Orders", icon: ShoppingBag },
  { id: "favorites" as ViewType, label: "Favorites", icon: Heart },
  { id: "wallet" as ViewType, label: "Wallet", icon: Wallet },
  { id: "settings" as ViewType, label: "Settings", icon: Settings },
]

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user, sessionData } = useAuth()
  
  // Check if user has seller role
  const isSeller = 
    user?.roles?.includes("seller") || 
    user?.roles?.includes("vendor") ||
    sessionData?.role === "seller" ||
    sessionData?.role === "vendor"

    
    const isCooperative =
      user?.roles?.includes("cooperative") ||
      user?.roles?.includes("cooperative") ||
      sessionData?.role === "cooperative" ||
      sessionData?.role === "cooperative";

    return (
      <aside className="w-full lg:w-[280px]  lg:shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e7e8e9] lg:sticky lg:top-32">
          <nav className="p-4">
            <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              {menuItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <li key={item.id} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => onViewChange(item.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-[#f10e7c] text-white"
                          : "text-[#6b6b6b] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-[#838794]"
                        }`}
                      />
                      <span className="font-medium text-[15px]">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}

              {/* Seller Dashboard - Only show if user has seller role */}
              {isSeller && (
                <li className="shrink-0 lg:shrink">
                  <Link
                    href="/sellers/dashboard"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all text-[#6b6b6b] hover:bg-[#f5f5f5]"
                  >
                    <Store className="w-5 h-5 text-[#838794]" />
                    <span className="font-medium text-[15px]">
                      Seller Dashboard
                    </span>
                  </Link>
                </li>
              )}
              {isCooperative && (
                <li className="shrink-0 lg:shrink">
                  <Link
                    href="/cooperative/dashboard"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all text-[#6b6b6b] hover:bg-[#f5f5f5]"
                  >
                    <Store className="w-5 h-5 text-[#838794]" />
                    <span className="font-medium text-[15px]">
                      Cooperative Dashboard
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    );
}
