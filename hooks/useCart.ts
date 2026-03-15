import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IAddToCartRequest, ICartResponse } from "@/types/product.types";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "@/app/actions/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { useAuthStore } from "@/zustand/store";

// ─── Guest cart Zustand store ─────────────────────────────────────────────────

export interface GuestCartItem {
  localId: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    shopName?: string;
  };
  quantity: number;
  price: number;
}

function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface GuestCartState {
  items: GuestCartItem[];
  addItem: (product: GuestCartItem["product"], quantity: number) => void;
  updateItem: (localId: string, quantity: number) => void;
  removeItem: (localId: string) => void;
  clearCart: () => void;
}

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { localId: genId(), product, quantity, price: product.price },
            ],
          };
        }),

      updateItem: (localId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.localId === localId ? { ...i, quantity } : i
          ),
        })),

      removeItem: (localId) =>
        set((state) => ({
          items: state.items.filter((i) => i.localId !== localId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "guest-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─── Server cart ID store ─────────────────────────────────────────────────────

interface CartIdState {
  cartId: string | null;
  setCartId: (id: string | null) => void;
}

export const useCartIdStore = create<CartIdState>()(
  persist(
    (set) => ({
      cartId: null,
      setCartId: (cartId) => set({ cartId }),
    }),
    {
      name: "cart-id-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { setCartId } = useCartIdStore();
  const { isAuthenticated } = useAuthStore();
  const { addItem: addGuestItem } = useGuestCartStore();

  return useMutation({
    mutationFn: async (data: IAddToCartRequest) => {
      if (!isAuthenticated) {
        // Guest: persist in localStorage Zustand store
        let snapshot = data._snapshot;
        if (!snapshot) {
          // Fallback: look up product in React Query cache
          const allCached = queryClient.getQueriesData<any>({ queryKey: ["products"] });
          for (const [, queryData] of allCached) {
            const productList = Array.isArray(queryData)
              ? queryData
              : queryData?.products;
            if (Array.isArray(productList)) {
              const found = productList.find((p: any) => p._id === data.productId);
              if (found) {
                snapshot = {
                  _id: found._id,
                  name: found.name,
                  price: found.price,
                  images: found.images || [],
                  description: found.description || "",
                  shopName: found.shop_name || "",
                };
                break;
              }
            }
          }
        }
        snapshot ??= {
          _id: data.productId,
          name: "Product",
          price: 0,
          images: [],
          description: "",
        };
        addGuestItem(snapshot, data.quantity);
        return { isGuest: true as const };
      }

      // Authenticated: add to server cart
      const result = await addToCart({
        productId: data.productId,
        quantity: data.quantity,
      });
      if (!result.success) {
        throw new Error(result.error || "Failed to add item to cart");
      }
      return result.data!;
    },
    onSuccess: (data) => {
      if ("isGuest" in data) {
        toast.success("Added to cart");
        return;
      }
      if (data && "data" in data && (data as any).data?.cart_id) {
        setCartId((data as any).data.cart_id);
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCart() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const result = await getCart();
      if (!result.success) {
        if (result.error === "Authentication required") return null;
        throw new Error(result.error || "Failed to fetch cart");
      }
      return result.data!;
    },
    staleTime: 30 * 1000,
    retry: false,
    enabled: isAuthenticated,
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { cartItemId: string; quantity: number }) => {
      const result = await updateCartItem(data.cartItemId, data.quantity);
      if (!result.success) {
        throw new Error(result.error || "Failed to update cart item");
      }
      return result.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const result = await removeCartItem(itemId);
      if (!result.success) {
        throw new Error(result.error || "Failed to remove cart item");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCartItemCount() {
  const { isAuthenticated } = useAuthStore();
  const { data: cartData } = useCart();
  const guestItems = useGuestCartStore((s) => s.items);

  if (!isAuthenticated) {
    return guestItems.reduce((total, item) => total + item.quantity, 0);
  }

  const items = cartData?.data?.items || [];
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function useIsProductInCart(productId: string) {
  const { isAuthenticated } = useAuthStore();
  const { data: cartData } = useCart();
  const guestItems = useGuestCartStore((s) => s.items);

  if (!isAuthenticated) {
    return guestItems.some((i) => i.product._id === productId);
  }

  const items = cartData?.data?.items || [];
  return items.some((item) =>
    typeof item.product === "object"
      ? item.product._id === productId
      : item.product === productId
  );
}
