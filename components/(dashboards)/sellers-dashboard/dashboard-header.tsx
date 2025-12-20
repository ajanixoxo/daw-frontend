"use client";
import { Bell, Menu, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSellerProfile, getShopId } from "@/hooks/useSellerProfile";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: profile, isLoading: profileLoading } = useSellerProfile();
  
  // Get shopId from localStorage (already validated and stored by useSellerProfile)
  const shopId = getShopId();
  
  // Get shop name from profile directly (no need for extra API call)
  // profile.shop is an array, get the first shop's name
  const shopName = profile?.shop && Array.isArray(profile.shop) && profile.shop.length > 0
    ? profile.shop[0].name || "Shop"
    : "Shop";
  
  const email = profile?.email || "";
  const isLoading = profileLoading;

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
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-[#667185]" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women__Copy_-0yPjvRIvJOxKp0KKLhWRGqNABMsatU.png"
                alt="User"
              />
              <AvatarFallback>
                {profile?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
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
          </div>
        </div>
      </div>
    </header>
  );
}
