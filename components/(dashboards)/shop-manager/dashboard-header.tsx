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
       <img src="/logo-full.png" alt="Logo" className="h-6" />
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
