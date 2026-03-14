"use client";

import { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  Heart,
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProduct } from "@/types/product.types";
import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useIsProductInWishlist,
} from "@/hooks/useWishlist";
import { useReviews } from "@/hooks/useReviews";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/zustand/store";
import { useRouter, usePathname } from "next/navigation";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const isInCart = useIsProductInCart(product._id);

  const { mutate: addToWishlist, isPending: isAddingToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } =
    useRemoveFromWishlist();
  const isInWishlist = useIsProductInWishlist(product._id);
  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

  const { data: reviewsData } = useReviews(product._id);
  const reviewCount = reviewsData?.pagination.total || 4; // Mock 4 if 0
  const averageRating = 4.5; // Mock 4.5

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product.quantity || 100)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      const loginUrl = new URL("/auth", window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.push(loginUrl.pathname + loginUrl.search);
      return;
    }

    addToCart(
      { productId: product._id, quantity },
      {
        onSuccess: () => {
          toast.success("Added to cart successfully");
        },
        onError: () => {
          toast.error("Failed to add to cart");
        },
      },
    );
  };

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to wishlist");
      const loginUrl = new URL("/auth", window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.push(loginUrl.pathname + loginUrl.search);
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  // Safe categorization
  const category = product.category || "HOME DECOR";
  const tags = ["Pillow", "Home", "Chinese", "Sitting Room", "White"]; // Mock tags if missing

  // Mock pricing logic for demo matches visuals
  const price = product.price;
  const originalPrice = price * 1.6; // Mock original higher
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Title and Badge */}
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222] tracking-tight">
            {product.name}
          </h1>
          {product.quantity > 0 ? (
            <span className="px-3 py-1 bg-[#e8f7ed] text-[#009a49] text-xs font-medium rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-[#fff0f0] text-[#d92d20] text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Ratings and SKU */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-4 h-4",
                  star <= 4 // Hardcoded to match mockup "4 Review" usually means 4 stars? No, mockup stars are 5.
                    ? "fill-[#FDB022] text-[#FDB022]" // Typical yellow/orange star
                    : "text-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-gray-500">{reviewCount} Review</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 font-medium">
            SKU: <span className="text-gray-900">2,51,594</span>
          </span>
        </div>
      </div>

      {/* Price Block */}
      <div className="flex items-center gap-4">
        <span className="text-gray-300 line-through text-xl font-medium">
          {product.displayCurrency === 'USD' ? '$' : '₦'}
          {originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="text-[#F10E7C] text-3xl font-bold">
          {product.displayCurrency === 'USD' ? '$' : '₦'}
          {(product.displayPrice || product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="px-2.5 py-1 bg-[#fff0f7] text-[#F10E7C] text-xs font-bold rounded-full">
          {discount}% Off
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 my-6" />

      {/* Seller and Social Share */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-sm">
          <span className="text-gray-500">Seller:</span>{" "}
          <span className="text-[#222] font-semibold">farmary</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Share item:</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-[#F10E7C] text-white flex items-center justify-center hover:bg-[#d90d6a] transition-colors">
              <Facebook className="w-4 h-4 fill-current" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-black hover:text-white text-[#222] flex items-center justify-center transition-colors">
              <Twitter className="w-4 h-4 fill-current" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-black hover:text-white text-[#222] flex items-center justify-center transition-colors">
              {/* Pinterest Icon Placeholder using generic or a nearby icon, assuming lucide has no Pinterest */}
              <span className="font-bold font-serif text-lg">P</span>
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-black hover:text-white text-[#222] flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed">
        {product.description ||
          "Set of 4 handcrafted throw pillows with traditional Adire patterns, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."}
      </p>

      {/* Actions: Quantity, Cart, Wishlist */}
      <div className="pt-4 flex flex-wrap items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center border border-gray-200 rounded-full h-12 px-2 bg-white">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[#222] disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium text-[#222]">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= (product.quantity || 100)}
            className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[#222] disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.quantity === 0}
          className="h-12 px-8 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-medium gap-2 flex-1 sm:flex-none min-w-[200px]"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          disabled={isWishlistLoading}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
            isInWishlist
              ? "bg-[#fff0f7] text-[#F10E7C]"
              : "bg-[#fff0f7] text-[#F10E7C] hover:bg-[#ffe0f0]", // Mockup shows pinkish bg always
          )}
        >
          <Heart
            className={cn("w-5 h-5", isInWishlist ? "fill-current" : "")}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 my-6" />

      {/* Meta */}
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex gap-2">
          <span className="font-semibold text-[#222]">Category:</span>
          <span className="uppercase">{category}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-[#222]">Tag:</span>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className={cn(tag === "Chinese" ? "underline text-[#222]" : "")}
              >
                {tag}
                {i < tags.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
