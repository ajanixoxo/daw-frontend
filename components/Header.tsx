"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Loader2, ShoppingCart, User } from "lucide-react";
import { useAuthStore } from "@/zustand/store";
import { useLogout } from "@/hooks/useAuth";
import { useCartItemCount } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

function CartBadge() {
  const itemCount = useCartItemCount();

  if (itemCount === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-[#F10E7C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {itemCount > 99 ? "99+" : itemCount}
    </span>
  );
}

interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "dark" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use Zustand store for auth state
  const { isAuthenticated, isVerified, user } = useAuthStore();
  const { logout, isLoading: isLoggingOut } = useLogout();

  // Determine if user is fully authenticated
  const isFullyAuthenticated = isAuthenticated && isVerified;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  // Determine text color based on scroll state and theme
  // When scrolled: always dark text (on white bg)
  // When not scrolled: depends on theme (light theme = white text, dark theme = dark text)
  const textColorClass = isScrolled
    ? "text-[#222]"
    : theme === "light"
    ? "text-white hover:text-[#F10E7C]"
    : "text-[#222]";

  // Icon color follows text color
  const iconColorClass = isScrolled
    ? "text-[#222]"
    : theme === "light"
    ? "text-white"
    : "text-[#222]";

  const dashboardLink = (() => {
    const roles = (user as any)?.roles || [];
    const role = (user as any)?.role || "";
    console.log(user)
    if (roles.includes("admin") || role === "admin") return "/admin/dashboard";
    if (roles.includes("cooperative_admin") || role === "cooperative_admin") return "/cooperative/dashboard";
    if (roles.includes("seller") || roles.includes("member") || role === "seller") return "/sellers/dashboard";
    if (roles.includes("logistics_provider") || role === "logistics_provider") return "/logistics/dashboard";
    return "/profile";
  })();

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5 lg:px-[84px] lg:py-[19px] max-w-[1440px] mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8 lg:gap-[60px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-full.png" alt="Logo" className="h-6" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            <Link
              href="/"
              className={cn(
                "font-inter text-[16px] font-semibold tracking-[-0.64px] transition-colors",
                textColorClass
              )}
            >
              Home
            </Link>
            <Link
              href="/all-shops"
              className={cn(
                "font-inter text-[16px] font-normal tracking-[-0.64px] transition-colors hover:text-[#F10E7C]",
                isScrolled
                  ? "text-[#222]"
                  : theme === "light"
                  ? "text-white"
                  : "text-[#222]"
              )}
            >
              Marketplace
            </Link>
            <Link
              href="/cooperatives"
              className={cn(
                "font-inter text-[16px] font-normal tracking-[-0.64px] transition-colors hover:text-[#F10E7C]",
                isScrolled
                  ? "text-[#222]"
                  : theme === "light"
                  ? "text-white"
                  : "text-[#222]"
              )}
            >
              Cooperatives
            </Link>
            <Link
              href="/masterclass"
              className={cn(
                "font-inter text-[16px] font-normal tracking-[-0.64px] transition-colors hover:text-[#F10E7C]",
                isScrolled
                  ? "text-[#222]"
                  : theme === "light"
                  ? "text-white"
                  : "text-[#222]"
              )}
            >
              Masterclass
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isFullyAuthenticated ? (
            <>
              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100/10 rounded-full transition-colors"
              >
                <ShoppingCart className={cn("w-6 h-6", iconColorClass)} />
                <CartBadge />
              </Link>

              {/* Profile Icon */}
              <Link
                href={dashboardLink}
                className="p-2 hover:bg-gray-100/10 rounded-full transition-colors"
              >
                <User className={cn("w-6 h-6", iconColorClass)} />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={cn(
                  "flex items-center justify-center px-6 py-3 rounded-[40px] border transition-colors group",
                  isScrolled
                    ? "border-[#F10E7C] bg-white hover:bg-[#F10E7C]"
                    : theme === "light"
                    ? "border-white bg-transparent hover:bg-white"
                    : "border-[#F10E7C] bg-white hover:bg-[#F10E7C]"
                )}
              >
                <span
                  className={cn(
                    "font-inter text-[16px] font-medium tracking-[-0.64px] flex items-center gap-2",
                    isScrolled
                      ? "text-[#F10E7C] group-hover:text-white"
                      : theme === "light"
                      ? "text-white group-hover:text-[#F10E7C]"
                      : "text-[#F10E7C] group-hover:text-white"
                  )}
                >
                  {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link href="/auth" passHref>
              <button
                className={cn(
                  "flex items-center justify-center px-6 py-3 rounded-[40px] border transition-colors group",
                  isScrolled
                    ? "border-[#F10E7C] bg-white hover:bg-[#F10E7C]"
                    : theme === "light"
                    ? "border-white bg-transparent hover:bg-white"
                    : "border-[#F10E7C] bg-white hover:bg-[#F10E7C]"
                )}
              >
                <span
                  className={cn(
                    "font-inter text-[16px] font-medium tracking-[-0.64px]",
                    isScrolled
                      ? "text-[#F10E7C] group-hover:text-white"
                      : theme === "light"
                      ? "text-white group-hover:text-[#F10E7C]"
                      : "text-[#F10E7C] group-hover:text-white"
                  )}
                >
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn("lg:hidden p-2 transition-colors", iconColorClass)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-5 py-4 space-y-4">
            <Link
              href="/"
              className="text-[#222] font-inter text-[16px] font-semibold tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/all-shops"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/cooperatives"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cooperatives
            </Link>
            <Link
              href="/masterclass"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Masterclass
            </Link>

            {isFullyAuthenticated ? (
              <>
                {/* Cart Link */}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {useCartItemCount() > 0 && (
                    <span className="ml-auto bg-[#F10E7C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {useCartItemCount()}
                    </span>
                  )}
                </Link>

                {/* Profile Link */}
                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors mt-2 group w-full"
                >
                  <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px] flex items-center gap-2">
                    {isLoggingOut && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                <button className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors mt-2 group w-full">
                  <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px]">
                    Login
                  </span>
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
