"use client";

import { Bell, Menu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: user, isLoading } = useProfile();
  console.log("user", user);
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e7e8e9] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 lg:hidden">
            <img src="/logo-full.png" alt="Logo" className="h-6" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-[#667185]" />
          </Button>

          {/* USER INFO */}
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#F10E7C]" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || ""} alt={user.firstName} />
                <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#1d1d2a]">
                  {user.firstName}
                </p>
                <p className="text-xs text-[#667185]">{user.email}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
