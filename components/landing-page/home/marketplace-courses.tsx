"use client";

import Image from "next/image";
import { ShoppingCart, Loader2 } from "lucide-react";
import { usePopularProducts } from "@/hooks/useProducts";
import Link from "next/link";

export function MarketplaceProducts() {
  const { data, isLoading, error } = usePopularProducts(4);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  if (error || !data?.products) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
            Discover African Craftsmanship
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse our curated selection of authentic products made by talented
            <br className="hidden md:block" /> African women entrepreneurs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {data.products.map((product) => (
            <div key={product._id} className="flex flex-col group">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#f5f5f5]">
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                {/* Category */}
                <span className="text-xs text-[#6b6b6b] tracking-wide mb-2 uppercase">
                  {product.category || "General"}
                </span>

                {/* Name and Price Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-[#222222] text-base leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-[#f10e7c] font-semibold text-base whitespace-nowrap">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {product.description}
                </p>

                {/* View Details Button */}
                <Link
                  href={`/product/${product._id}`}
                  className="w-full bg-[#222222] hover:bg-[#333333] text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors text-center font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Marketplace Link */}
        <div className="text-center">
          <Link
            href="/marketplace"
            className="text-[#f10e7c] font-semibold text-base hover:underline inline-flex items-center gap-1"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}
