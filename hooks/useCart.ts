import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ENDPOINTS } from '@/lib/api/client';
import type { IAddToCartRequest, ICartResponse } from '@/types/product.types';
import { addToCart, updateCartItem, removeCartItem, getCart } from '@/app/actions/cart';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

// Store for persisting cartId
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
      name: 'cart-id-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { cartId, setCartId } = useCartIdStore();

  return useMutation({
    mutationFn: async (data: IAddToCartRequest) => {
      const result = await addToCart(data);
      if (!result.success) {
        throw new Error(result.error || "Failed to add item to cart");
      }
      return result.data!;
    },
    onSuccess: (data) => {
      // Save cart_id if we don't have one or if it changed
      if (data.item?.cart_id) {
        setCartId(data.item.cart_id);
        queryClient.invalidateQueries({ queryKey: ['cart', data.item.cart_id] });
      } else if (cartId) {
        queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      }
    },
  });
}

export function useCart() {
  const { cartId } = useCartIdStore();

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null;
      
      const result = await getCart(cartId);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch cart");
      }
      return result.data!;
    },
    enabled: !!cartId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { cartId } = useCartIdStore();

  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number; price: number }) => {
      const result = await updateCartItem(data);
      if (!result.success) {
        throw new Error(result.error || "Failed to update cart item");
      }
      return result.data!;
    },
    onSuccess: () => {
      if (cartId) {
        queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      }
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const { cartId } = useCartIdStore();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const result = await removeCartItem(itemId);
      if (!result.success) {
        throw new Error(result.error || "Failed to remove cart item");
      }
      return result;
    },
    onSuccess: () => {
      if (cartId) {
        queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      }
    },
  });
}

// Helper function to get cart item count
export function useCartItemCount() {
  const { data: cartData } = useCart();
  
  // New response structure: items is directly in the response
  const itemCount = cartData?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  return itemCount;
}

// Helper function to check if product is in cart
export function useIsProductInCart(productId: string) {
  const { data: cartData } = useCart();
  
  const isInCart = cartData?.items?.some(
    (item) => typeof item.product_id === 'object' 
      ? item.product_id._id === productId 
      : item.product_id === productId
  ) || false;
  
  return isInCart;
}
