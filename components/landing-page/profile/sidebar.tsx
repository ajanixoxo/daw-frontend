"use client"

import { User, ShoppingBag, Heart, Wallet, Settings } from "lucide-react"
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
  return (
    <aside className="w-full lg:w-[280px]  lg:shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-[#e7e8e9] lg:sticky lg:top-32">
        <nav className="p-4">
          <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
            {menuItems.map((item) => {
              const isActive = activeView === item.id
              return (
                <li key={item.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                      isActive ? "bg-[#f10e7c] text-white" : "text-[#6b6b6b] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#838794]"}`} />
                    <span className="font-medium text-[15px]">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
