"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Search,
  Loader2,
  ShoppingCart,
  Star,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useIsProductInWishlist,
} from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { IProduct } from "@/types/product.types";

export function MarketplaceContent() {
  const { data: productsData, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const products = productsData?.products || [];

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
    return ["All Categories", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <p className="text-red-500 text-lg">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 lg:my-18 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
          African Women Marketplace
        </h1>
        <p className="text-[#6b6b6b] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Discover authentic handcrafted products made by talented women
          entrepreneurs from across Africa.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-[#e5e5e5] rounded-full text-sm font-medium text-[#222222] hover:border-[#d2d2d2] transition-colors"
          >
            {selectedCategory}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-50 overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category!);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f5f5f5] transition-colors ${
                    selectedCategory === category
                      ? "bg-[#f5f5f5] font-medium"
                      : "text-[#222222]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 pl-11 pr-4 py-3 bg-[#f5f5f5] rounded-full text-sm text-[#222222] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#6b6b6b] text-lg">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              setSearchQuery("");
            }}
            className="mt-4 text-[#f10e7c] font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const [justAdded, setJustAdded] = useState(false);
  const isInCart = useIsProductInCart(product._id);

  const { mutate: addToWishlist, isPending: isAddingToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } =
    useRemoveFromWishlist();
  const isInWishlist = useIsProductInWishlist(product._id);
  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

  const handleAddToCart = () => {
    addToCart(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 2000);
        },
      }
    );
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="flex flex-col group relative">
      {/* Success Animation */}
      {justAdded && (
        <div className="absolute -top-2 -right-2 z-10 animate-bounce">
          <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#f5f5f5]">
        <Image
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist Button Overlay */}
        <button
          onClick={toggleWishlist}
          disabled={isWishlistLoading}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          {isWishlistLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          ) : (
            <Star
              className={cn(
                "w-4 h-4 transition-colors",
                isInWishlist
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              )}
            />
          )}
        </button>
      </div>

      {/* Category */}
      <span className="text-[10px] font-medium text-[#6b6b6b] tracking-wider mb-2 uppercase">
        {product.category || "General"}
      </span>

      {/* Name and Price Row */}
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="font-semibold text-sm text-[#222222] leading-tight line-clamp-1">
          {product.name}
        </h3>
        <span className="text-[#f10e7c] font-semibold text-sm whitespace-nowrap">
          ₦{product.price.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-[#6b6b6b] text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
        {product.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Link
          href={`/product/${product._id}`}
          className="w-full py-3 bg-white border border-[#222222] text-[#222222] text-sm font-medium rounded-full hover:bg-[#f5f5f5] transition-colors text-center block"
        >
          View Details
        </Link>

        {isInCart || justAdded ? (
          <Link
            href="/cart"
            className="w-full py-3 text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 bg-[#009a49] text-white hover:bg-[#008a3f]"
          >
            <ShoppingCart className="w-4 h-4" />
            Go to Cart
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={
              isAddingToCart ||
              product.status !== "available" ||
              product.quantity === 0
            }
            className="w-full py-3 text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 bg-[#222222] text-white hover:bg-[#333333]"
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
