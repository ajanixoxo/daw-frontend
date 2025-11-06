"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5 lg:px-[84px] lg:py-[19px] max-w-[1440px] mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8 lg:gap-[60px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#F10E7C] rounded-sm shrink-0"></div>
            <span className="text-[#F10E7C] font-inter text-base lg:text-[20px] font-medium tracking-[-0.06em] whitespace-nowrap">
              Digital African Women
            </span>
          </div>

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

        {/* Desktop Login Button */}
        <button className="hidden lg:flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors group">
          <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px]">
            Login
          </span>
        </button>

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
            <button className="flex items-center justify-center px-6 py-3 rounded-[40px] border border-[#F10E7C] bg-white hover:bg-[#F10E7C] transition-colors mt-2 group">
              <span className="text-[#F10E7C] group-hover:text-white font-inter text-[16px] font-medium tracking-[-0.64px]">
                Login
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
