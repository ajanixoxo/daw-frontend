"use client";

import { Bell, Menu, Loader2, LogOut, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: user, isLoading } = useProfile();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const handleExploreMarketplace = () => {
    router.push("/");
  };

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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExploreMarketplace}
            className="hidden sm:flex items-center gap-2 text-[#667185] hover:text-[#1d1d2a]"
          >
            <Store className="h-4 w-4" />
            <span className="text-sm">Explore Marketplace</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-[#667185]" />
          </Button>

          {/* USER INFO with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[#F10E7C]" />
                ) : (
                  <>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || ""} alt={user?.firstName || ""} />
                      <AvatarFallback>{user?.firstName?.charAt(0) || "C"}</AvatarFallback>
                    </Avatar>

                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-[#1d1d2a]">
                        {user?.firstName || "Cooperative"}
                      </p>
                      <p className="text-xs text-[#667185]">{user?.email || ""}</p>
                    </div>
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleExploreMarketplace} className="cursor-pointer">
                <Store className="mr-2 h-4 w-4" />
                <span>Explore Marketplace</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
