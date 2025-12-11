"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { usePopularProducts } from "@/hooks/useProducts";
import { useAddToCart, useIsProductInCart } from "@/hooks/useCart";
import type { IProduct } from "@/types/product.types";

export function PopularProducts() {
  const { data, isLoading, error } = usePopularProducts(8);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAddToCart = async (product: IProduct) => {
    setAddingProductId(product._id);

    addToCart(
      { productId: product._id, quantity: 1, price: product.price },
      {
        onSuccess: () => {
          setJustAdded(product._id);

          // Show animation for 2 seconds
          setTimeout(() => {
            setJustAdded(null);
          }, 2000);

          setAddingProductId(null);
        },
        onError: (error) => {
          console.error("Error adding to cart:", error);
          setAddingProductId(null);
        },
      }
    );
  };

  if (error) {
    return (
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center py-16">
          <p className="text-[#6b6b6b] text-lg">
            Failed to load products. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#222222]">
          Popular Products
        </h2>
        <Link
          href="/marketplace"
          className="flex items-center gap-2 text-[#f10e7c] font-medium text-sm hover:gap-3 transition-all"
        >
          View More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && data?.products && data.products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {data.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              isAdding={addingProductId === product._id}
              justAdded={justAdded === product._id}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!data?.products || data.products.length === 0) && (
        <div className="text-center py-16">
          <p className="text-[#6b6b6b] text-lg">
            No products available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void;
  isAdding: boolean;
  justAdded: boolean;
}

function ProductCard({
  product,
  onAddToCart,
  isAdding,
  justAdded,
}: ProductCardProps) {
  const isInCart = useIsProductInCart(product._id);
  const showGoToCart = isInCart || justAdded;

  return (
    <div className="flex flex-col relative">
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
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e5e5e5]">
            <span className="text-[#9ca3af] text-sm">No image</span>
          </div>
        )}

        {/* Status Badge */}
        {product.status !== "available" && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#222222]/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {product.status === "out_of_stock" ? "Out of Stock" : "Unavailable"}
          </div>
        )}
      </div>

      {/* Category */}
      <span className="text-[10px] font-medium text-[#6b6b6b] tracking-wider mb-2 uppercase">
        {product.category || "General"}
      </span>

      {/* Name and Price Row */}
      <div className="flex justify-between items-start gap-2 mb-1">
        <h3 className="font-semibold text-sm text-[#222222] leading-tight line-clamp-2">
          {product.name}
        </h3>
        <span className="text-[#f10e7c] font-semibold text-sm whitespace-nowrap">
          ₦
          {product.price.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-[#6b6b6b] text-xs leading-relaxed mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>
      )}

      {/* Stock Info */}
      <p className="text-[10px] text-[#6b6b6b] mb-3">
        {product.quantity > 0 ? (
          <span className="text-[#009a49]">{product.quantity} in stock</span>
        ) : (
          <span className="text-[#ad3307]">Out of stock</span>
        )}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* <Link
          href={`/marketplace/${product._id}`}
          className="flex-1 py-3 bg-white border border-[#222222] text-[#222222] text-sm font-medium rounded-full hover:bg-[#f5f5f5] transition-colors text-center"
        >
          View Details
        </Link> */}

        {showGoToCart ? (
          <Link
            href="/cart"
            className="flex-1 py-3 bg-[#009a49] text-white text-sm font-medium rounded-full hover:bg-[#008a3f] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            Go to Cart
          </Link>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            disabled={
              product.status !== "available" ||
              product.quantity === 0 ||
              isAdding
            }
            className="flex-1 py-3 bg-[#f10e7c] text-white text-sm font-medium rounded-full hover:bg-[#d90d6a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding...
              </>
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
