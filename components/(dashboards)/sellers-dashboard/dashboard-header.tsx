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
import { useSellerProfile, getPrimaryShop } from "@/hooks/useSellerProfile";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: profile, isLoading: profileLoading } = useSellerProfile();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const router = useRouter();

  const shopName = getPrimaryShop(profile)?.name || "Shop";
  
  const email = profile?.email || "";
  const isLoading = profileLoading;

  const handleLogout = async () => {
    await logout();
  };

  const handleExploreMarketplace = () => {
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e7e8e9] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu + Logo */}
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

        {/* Right: Notifications + User */}
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
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-[#667185]" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-0yPjvRIvJOxKp0KKLhWRGqNABMsatU.png"
                    alt="User"
                  />
                  <AvatarFallback>
                    {profile?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-[#667185]" />
                      <span className="text-xs text-[#667185]">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-[#1d1d2a] truncate max-w-[200px]">
                        {shopName}
                      </p>
                      <p className="text-xs text-[#667185] truncate max-w-[200px]">
                        {email || "No email"}
                      </p>
                    </>
                  )}
                </div>
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
