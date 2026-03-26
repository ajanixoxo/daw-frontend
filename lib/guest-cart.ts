/**
 * Guest cart utilities.
 * The live guest cart state lives in the Zustand `useGuestCartStore` (hooks/useCart.ts).
 * This file handles the "pending checkout" snapshot that survives the auth redirect.
 */

const PENDING_CHECKOUT_KEY = "pending_checkout_cart";

export interface PendingCartItem {
  productId: string;
  quantity: number;
  snapshot: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
  };
}

/** Save current guest cart before redirecting to auth. */
export function savePendingCheckoutCart(items: PendingCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(items));
}

/** Retrieve the pending checkout cart (after returning from auth). */
export function getPendingCheckoutCart(): PendingCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(PENDING_CHECKOUT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/** Clear the pending checkout cart (after merge is complete). */
export function clearPendingCheckoutCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_CHECKOUT_KEY);
}
