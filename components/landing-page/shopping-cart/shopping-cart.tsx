"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCart, useRemoveCartItem } from "@/hooks/useCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "@/hooks/useCheckout";
import { toast } from "sonner";

export function ShoppingCart() {
  const router = useRouter();
  const { data: cartData, isLoading } = useCart();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<any[]>([]);

  // Sync local items with server data when loaded
  useEffect(() => {
    if (cartData?.data?.items) {
      setLocalItems(cartData.data.items);
    }
  }, [cartData]);

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    // Update local state directly
    setLocalItems((prevItems) =>
      prevItems.map((item) =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setUpdatingId(itemId);
    removeItem(itemId, {
      onSettled: () => setUpdatingId(null),
    });
  };

  const handlePlaceOrder = () => {
    if (localItems.length === 0) return;

    const items = localItems.map((item) => ({
      product_id: item.product._id,
      quantity: item.quantity,
    }));

    placeOrder(
      { items },
      {
        onSuccess: () => {
          toast.success("Order placed successfully");
          router.push("/checkout");
        },
        onError: (error: any) => {
          console.error("Place order failed:", error);
          toast.error(error.message || "Failed to place order");
        },
      }
    );
  };

  const cartItems = localItems;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Review your items and proceed to checkout
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItemCard
                  key={item._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isUpdating={updatingId === item._id}
                />
              ))
            ) : (
              <div className="text-center py-16 border rounded-lg bg-gray-50">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/marketplace">
                  <Button className="bg-[#f10e7c] hover:bg-[#d90d6a] text-white rounded-full">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-[380px]">
              <Card className="p-6 border border-border rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>
                      ₦
                      {subtotal.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 mb-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-foreground">
                      Total
                    </h3>
                    <span className="text-xl font-bold text-[#f10e7c]">
                      ₦
                      {subtotal.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full bg-[#222] text-white hover:bg-[#333] rounded-full py-6 text-base font-medium"
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

interface CartItemCardProps {
  item: any; // Using any for now to match the API response structure flexibly
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  isUpdating: boolean;
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: CartItemCardProps) {
  const product = item.product;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border rounded-xl bg-white shadow-sm">
      {/* Product Image */}
      <div className="w-full sm:w-[140px] h-[140px] relative rounded-lg overflow-hidden bg-muted flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-[#f10e7c] font-semibold text-lg">
            ₦
            {item.price.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end justify-between gap-4">
          <button
            onClick={() => onRemove(item._id)}
            className="text-red-500 cursor-pointer hover:text-red-600 transition-colors p-2 flex items-center gap-1 text-sm"
            aria-label="Remove item"
            disabled={isUpdating}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          <div className="flex items-center border border-border rounded-full px-3 py-1 gap-3">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              className="text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1 || isUpdating}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-foreground font-medium w-6 text-center">
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              className="text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
              aria-label="Increase quantity"
              disabled={isUpdating}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
