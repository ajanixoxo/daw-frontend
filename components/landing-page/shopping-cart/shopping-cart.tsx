"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, Loader2, ShoppingBag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useCart,
  useRemoveCartItem,
  useGuestCartStore,
  type GuestCartItem,
} from "@/hooks/useCart";
import { Store } from "lucide-react";
import { useAuthStore } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlaceOrder } from "@/hooks/useCheckout";
import { toast } from "sonner";
import {
  getPendingCheckoutCart,
  clearPendingCheckoutCart,
  savePendingCheckoutCart,
} from "@/lib/guest-cart";
import { addToCart } from "@/app/actions/cart";
import { useQueryClient } from "@tanstack/react-query";

export function ShoppingCart() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  // ── Authenticated cart ──────────────────────────────────────────────────────
  const { data: cartData, isLoading: isServerLoading } = useCart();
  const { mutate: removeServerItem } = useRemoveCartItem();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [serverItems, setServerItems] = useState<any[]>([]);

  useEffect(() => {
    if (cartData?.data?.items) {
      setServerItems(cartData.data.items);
    }
  }, [cartData]);

  // ── Guest cart ──────────────────────────────────────────────────────────────
  const guestItems = useGuestCartStore((s) => s.items);
  const updateGuestItem = useGuestCartStore((s) => s.updateItem);
  const removeGuestItem = useGuestCartStore((s) => s.removeItem);
  const clearGuestCart = useGuestCartStore((s) => s.clearCart);

  // ── Post-login cart merge ───────────────────────────────────────────────────
  const [isMerging, setIsMerging] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const pending = getPendingCheckoutCart();
    if (pending.length === 0) return;

    const mergeAndRedirect = async () => {
      setIsMerging(true);
      const failed: string[] = [];

      // Process each item independently — never let one failure block the rest
      for (const item of pending) {
        try {
          await addToCart({ productId: item.productId, quantity: item.quantity });
        } catch (err) {
          console.warn(`Cart merge: skipped "${item.snapshot?.name || item.productId}":`, err);
          failed.push(item.snapshot?.name || item.productId);
        }
      }

      // Always clear pending cart and guest cart — done regardless of partial failures
      clearPendingCheckoutCart();
      clearGuestCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (failed.length === 0) {
        toast.success("Your cart has been restored!");
      } else if (failed.length < pending.length) {
        toast.warning(
          `Cart restored — ${failed.length} item(s) could not be added (may be out of stock): ${failed.join(", ")}`
        );
      } else {
        toast.error("None of your cart items could be restored. They may be out of stock.");
      }

      // Always proceed to checkout — server cart has whatever was successfully merged
      router.push("/checkout");
    };

    mergeAndRedirect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // ── Place order (authenticated) ─────────────────────────────────────────────
  const handlePlaceOrder = () => {
    if (serverItems.length === 0) return;

    const items = serverItems.map((item) => ({
      product_id: item.product._id,
      quantity: item.quantity,
    }));

    placeOrder(
      { items },
      {
        onSuccess: () => {
          router.push("/checkout");
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to place order");
        },
      }
    );
  };

  // ── Guest "proceed to checkout" ─────────────────────────────────────────────
  const handleGuestCheckout = () => {
    const pendingItems = guestItems.map((i) => ({
      productId: i.product._id,
      quantity: i.quantity,
      snapshot: {
        _id: i.product._id,
        name: i.product.name,
        price: i.product.price,
        images: i.product.images,
        description: i.product.description,
      },
    }));
    savePendingCheckoutCart(pendingItems);
    router.push("/auth?returnTo=/checkout");
  };

  // ── Merging screen ──────────────────────────────────────────────────────────
  if (isMerging) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#f10e7c]" />
        <p className="text-lg font-medium text-[#101828]">
          Restoring your cart…
        </p>
        <p className="text-sm text-[#667085]">
          Just a moment while we sync your items.
        </p>
      </div>
    );
  }

  if (isAuthenticated && isServerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
      </div>
    );
  }

  const isGuest = !isAuthenticated;
  const displayItems = isGuest ? guestItems : serverItems;
  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
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
            {displayItems.length > 0 ? (
              isGuest ? (
                (guestItems as GuestCartItem[]).map((item) => (
                  <GuestCartItemCard
                    key={item.localId}
                    item={item}
                    onUpdateQuantity={(localId, qty) =>
                      updateGuestItem(localId, qty)
                    }
                    onRemove={(localId) => removeGuestItem(localId)}
                  />
                ))
              ) : (
                serverItems.map((item) => (
                  <ServerCartItemCard
                    key={item._id}
                    item={item}
                    onUpdateQuantity={(cartItemId, qty) => {
                      setServerItems((prev) =>
                        prev.map((i) =>
                          i._id === cartItemId ? { ...i, quantity: qty } : i
                        )
                      );
                    }}
                    onRemove={(itemId) => {
                      setUpdatingId(itemId);
                      removeServerItem(itemId, {
                        onSettled: () => setUpdatingId(null),
                      });
                    }}
                    isUpdating={updatingId === item._id}
                  />
                ))
              )
            ) : (
              <div className="text-center py-16 border rounded-lg bg-gray-50">
                <ShoppingBag className="w-12 h-12 text-[#98A2B3] mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Your cart is empty
                </p>
                <Link href="/marketplace">
                  <Button className="bg-[#f10e7c] hover:bg-[#d90d6a] text-white rounded-full">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {displayItems.length > 0 && (
            <div className="lg:w-[380px]">
              <Card className="p-6 border border-border rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal ({displayItems.length} item{displayItems.length !== 1 ? "s" : ""})</span>
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

                {isGuest ? (
                  <div className="space-y-3">
                    <Button
                      onClick={handleGuestCheckout}
                      className="w-full bg-[#f10e7c] hover:bg-[#d90d6a] text-white rounded-full py-6 text-base font-medium"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-center text-[#667085]">
                      You'll be asked to create an account or sign in — your
                      cart will be saved.
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="w-full bg-[#222] text-white hover:bg-[#333] rounded-full py-6 text-base font-medium"
                  >
                    {isPlacingOrder ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing…
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Guest cart item card ─────────────────────────────────────────────────────

function GuestCartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: GuestCartItem;
  onUpdateQuantity: (localId: string, quantity: number) => void;
  onRemove: (localId: string) => void;
}) {
  const { product } = item;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border rounded-xl bg-white shadow-sm">
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

      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          {product.shopName && (
            <span className="inline-flex items-center gap-1 text-xs text-[#667085] bg-[#F2F4F7] rounded-full px-2 py-0.5 mb-1.5">
              <Store className="w-3 h-3" />
              {product.shopName}
            </span>
          )}
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-[#f10e7c] font-semibold text-lg">
            ₦
            {product.price.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-4">
          <button
            onClick={() => onRemove(item.localId)}
            className="text-red-500 cursor-pointer hover:text-red-600 transition-colors p-2 flex items-center gap-1 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          <div className="flex items-center border border-border rounded-full px-3 py-1 gap-3">
            <button
              onClick={() =>
                item.quantity > 1 &&
                onUpdateQuantity(item.localId, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
              className="text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-foreground font-medium w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.localId, item.quantity + 1)
              }
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Authenticated server cart item card ─────────────────────────────────────

function ServerCartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
}: {
  item: any;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  isUpdating: boolean;
}) {
  const product = item.product;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border rounded-xl bg-white shadow-sm">
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

      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          {(product as any).shop_id?.name && (
            <span className="inline-flex items-center gap-1 text-xs text-[#667085] bg-[#F2F4F7] rounded-full px-2 py-0.5 mb-1.5">
              <Store className="w-3 h-3" />
              {(product as any).shop_id.name}
            </span>
          )}
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

        <div className="flex flex-col items-end justify-between gap-4">
          <button
            onClick={() => onRemove(item._id)}
            disabled={isUpdating}
            className="text-red-500 cursor-pointer hover:text-red-600 transition-colors p-2 flex items-center gap-1 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          <div className="flex items-center border border-border rounded-full px-3 py-1 gap-3">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1 || isUpdating}
              className="text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
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
              disabled={isUpdating}
              className="text-foreground hover:text-muted-foreground transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
