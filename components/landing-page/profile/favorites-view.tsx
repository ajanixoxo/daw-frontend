"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";
import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
import { toast } from "sonner";

export function FavoritesView() {
  const { data: wishlist, isLoading } = useWishlist();
  const { mutate: removeFromWishlist, isPending: isRemoving } =
    useRemoveFromWishlist();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = (product: any) => {
    addToCart(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Added to cart");
        },
        onError: (error) => {
          console.error("Error adding to cart:", error);
          toast.error("Failed to add to cart");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold text-[#222]">Favorites</h1>
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-[#6b6b6b] text-lg">Your wishlist is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-[#222]">Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlist
          .filter((item) => item.product)
          .map((item) => {
            const product = item.product;
            return (
              <FavoriteItemCard
                key={item._id}
                product={product}
                onRemove={() => removeFromWishlist(product._id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            );
          })}
      </div>
    </div>
  );
}

function FavoriteItemCard({
  product,
  onRemove,
  onAddToCart,
}: {
  product: any;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  const isInCart = useIsProductInCart(product._id);

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-4 relative group">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
        title="Remove from wishlist"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Image */}
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            <span className="text-xs">Product Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
            {product.category || "General"}
          </p>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-semibold text-[#222] line-clamp-1">
              {product.name}
            </h3>
            <span className="text-[#F10E7C] font-semibold text-sm">
              ₦
              {product.price.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-4">
            {product.description}
          </p>
        </div>

        <div className="flex gap-2">
          {isInCart ? (
            <Link
              href="/cart"
              className="flex-1 bg-[#009a49] hover:bg-[#008a3f] text-white rounded-full text-xs h-10 flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Go to Cart
            </Link>
          ) : (
            <Button
              onClick={onAddToCart}
              className="flex-1 bg-[#222] hover:bg-[#333] text-white rounded-full text-xs h-10 gap-2"
              // disabled={
              //   product.status !== "available" || product.quantity === 0
              // }
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {product.status === "out_of_stock"
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>
          )}

          <button
            onClick={onRemove}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-colors"
            title="Remove from wishlist"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
