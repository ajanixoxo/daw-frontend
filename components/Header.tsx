"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Loader2 } from "lucide-react";
import { checkVerificationStatus } from "@/app/actions/auth";
import { useLogout } from "@/hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const { logout, isLoading: isLoggingOut } = useLogout();

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const status = await checkVerificationStatus();
        setIsAuthenticated(status.isAuthenticated && status.isVerified);
      } catch (error) {
        console.error("Failed to check auth status", error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
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
              className="text-[#222] font-inter text-[16px] font-semibold tracking-[-0.64px] hover:text-[#F10E7C] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/cooperatives"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors"
            >
              Cooperatives
            </Link>
            <Link
              href="/masterclass"
              className="text-[#222] font-inter text-[16px] font-normal tracking-[-0.64px] hover:text-[#F10E7C] transition-colors"
            >
              Masterclass
            </Link>
          </nav>
        </div>

        {/* Desktop Login/Logout Button */}
        <div className="hidden lg:block">
          {isLoadingAuth ? (
            <div className="w-[100px] h-[48px] rounded-[40px] bg-gray-100 animate-pulse"></div>
          ) : isAuthenticated ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors group"
            >
              <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px] flex items-center gap-2">
                {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
                Logout
              </span>
            </button>
          ) : (
            <Link href="/auth" passHref>
              <button className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors group">
                <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px]">
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#222] hover:text-[#F10E7C] transition-colors"
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
              href="/marketplace"
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

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors mt-2 group w-full"
              >
                <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px] flex items-center gap-2">
                  {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
                  Logout
                </span>
              </button>
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
