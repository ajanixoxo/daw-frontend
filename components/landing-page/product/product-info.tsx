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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProduct } from "@/types/product.types";
import { useAddToCart } from "@/hooks/useCart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useIsProductInWishlist,
} from "@/hooks/useWishlist";
import { useReviews } from "@/hooks/useReviews";
import { toast } from "sonner";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const { mutate: addToWishlist, isPending: isAddingToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isRemovingFromWishlist } =
    useRemoveFromWishlist();
  const isInWishlist = useIsProductInWishlist(product._id);
  const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

  const { data: reviews } = useReviews(product._id);
  const reviewCount = reviews?.length || 0;
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 5;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      { productId: product._id, quantity, price: product.price },
      {
        onSuccess: () => {
          toast.success("Added to cart successfully");
        },
        onError: () => {
          toast.error("Failed to add to cart");
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
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif font-bold text-[#222]">
            {product.name}
          </h1>
          {product.quantity > 0 ? (
            <span className="px-3 py-1 bg-[#e6f4ea] text-[#009a49] text-xs font-medium rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-4 h-4",
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{reviewCount} Reviews</span>
          <span className="text-sm text-gray-300">•</span>
          <span className="text-sm text-gray-500">
            SKU: {product._id.substring(0, 8)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 line-through text-lg">
          ${(product.price * 1.2).toFixed(2)}
        </span>
        <span className="text-[#F10E7C] text-3xl font-bold">
          ${product.price.toFixed(2)}
        </span>
        <span className="px-2 py-1 bg-[#fff0f7] text-[#F10E7C] text-xs font-medium rounded">
          20% Off
        </span>
      </div>

      <div className="py-6 border-t border-b border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Seller: <span className="font-medium text-[#222]">Farmary</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Share item:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-[#F10E7C] text-white flex items-center justify-center hover:bg-[#d90d6a] transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description || "Incoming"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center border border-gray-200 rounded-full w-fit">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#222]"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#222]"
            disabled={quantity >= product.quantity}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.quantity === 0}
          className="flex-1 h-12 rounded-full bg-[#222] hover:bg-[#333] text-white gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>

        <button
          onClick={toggleWishlist}
          disabled={isWishlistLoading}
          className={cn(
            "w-12 h-12 rounded-full border flex items-center justify-center transition-colors",
            isInWishlist
              ? "border-[#F10E7C] bg-[#fff0f7] text-[#F10E7C]"
              : "border-gray-200 hover:border-[#F10E7C] hover:text-[#F10E7C] text-gray-400"
          )}
        >
          <Heart className={cn("w-5 h-5", isInWishlist && "fill-current")} />
        </button>
      </div>

      <div className="space-y-2 pt-4">
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="text-[#222] uppercase font-medium">
            {product.category || "Incoming"}
          </span>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">Tags:</span>
          <span className="text-gray-600">Incoming</span>
        </div>
      </div>
    </div>
  );
}
