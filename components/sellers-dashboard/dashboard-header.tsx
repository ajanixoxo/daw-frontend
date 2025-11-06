"use client"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e7e8e9] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-[#f10e7c] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-[#f10e7c] font-semibold text-base">Digital African Women</span>
          </div>
        </div>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-[#667185]" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-0yPjvRIvJOxKp0KKLhWRGqNABMsatU.png"
                alt="User"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[#1d1d2a]">Name</p>
              <p className="text-xs text-[#667185]">emailaddress@stu...</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
