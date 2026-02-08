"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, ShoppingBag, Store } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { useGetAllShops } from "@/hooks/useShop";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function FeaturedShops() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllShops();
  const shops = data?.shops?.slice(0, 3) || []; // Show top 3

  if (isLoading) {
    return (
      <section className="py-12 max-w-[1440px] mx-auto px-5 lg:px-[84px] flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </section>
    );
  }

  if (!data?.shops || data.shops.length === 0) {
    return null; // Don't show if no shops
  }

  // Mock data for display if API returns empty but we want to visualize strictly for dev (optional)
  // But strictly we should use real data.

  return (
    <section className="py-12 max-w-[1440px] mx-auto px-5 lg:px-[84px]">
      <motion.div
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            variants={fadeIn("right", 0.1)}
            className="text-2xl md:text-3xl font-bold text-[#222222]"
          >
            Featured Shops
          </motion.h2>
          <motion.div variants={fadeIn("left", 0.1)}>
            <Link
              href="/all-shops"
              className="flex items-center gap-2 text-[#f10e7c] font-medium text-sm hover:gap-3 transition-all underline decoration-1 underline-offset-4"
            >
              View All
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <motion.div
              key={shop._id}
              variants={fadeIn("up", 0.2)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#EAECF0]"
            >
              {/* Banner Area - Relative Container */}
              <div className="relative h-[200px] bg-[#f2e8ed]">
                {shop.banner_url ? (
                  <Image
                    src={shop.banner_url}
                    alt={shop.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#f10e7c]/10 to-[#f10e7c]/5" />
                )}

                {/* Logo Overlap */}
                <div className="absolute -bottom-8 left-6">
                  <div className="h-20 w-20 rounded-2xl bg-white border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    {shop.logo_url ? (
                      <Image
                        src={shop.logo_url}
                        alt={shop.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Store className="w-8 h-8 text-[#f10e7c]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="pt-10 px-6 pb-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-[#101828] line-clamp-1">
                    {shop.name}
                  </h3>
                  <span className="text-[#f10e7c] text-xs font-medium whitespace-nowrap">
                    {/* TODO: Add product count to shop API response */}
                    45 products
                  </span>
                </div>

                <p className="text-[#667085] text-sm mb-6 line-clamp-2 min-h-[40px]">
                  {shop.description || "No description provided."}
                </p>

                <Button
                  className="w-full bg-[#f10e7c] hover:bg-[#d90d6a] text-white rounded-full h-11"
                  onClick={() => router.push(`/shop/${shop._id}`)} // Or whatever the public shop URL is
                >
                  <Store className="w-4 h-4 mr-2" />
                  Visit Shop
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
