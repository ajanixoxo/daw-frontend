import { useQuery } from '@tanstack/react-query';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import { IUser } from '@/types/auth.types';
import { IShop } from '@/types/shop.types';

interface IProfileResponse {
  success: boolean;
  user: IUser;
}

interface IShopResponse {
  success: boolean;
  shop: IShop;
}

const SHOP_ID_KEY = 'shopId';

// Store shop ID in localStorage
export function storeShopId(shopId: string | null) {
  if (typeof window === 'undefined') return;
  if (shopId) {
    localStorage.setItem(SHOP_ID_KEY, shopId);
  } else {
    localStorage.removeItem(SHOP_ID_KEY);
  }
}

// Get shop ID from localStorage
export function getShopId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SHOP_ID_KEY);
}

// Hook to fetch seller profile
export function useSellerProfile() {
  return useQuery({
    queryKey: ['seller-profile'],
    queryFn: async () => {
      const response = await clientApiClient.get<IProfileResponse>(
        API_ENDPOINTS.AUTH.PROFILE
      );

      if (!response.success || !response.user) {
        throw new Error('Failed to fetch profile');
      }

      // Store shop ID in localStorage if available
      if (response.user.shop) {
        storeShopId(response.user.shop);
      }

      return response.user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch shop details by ID
export function useShop(shopId: string | null) {
  return useQuery({
    queryKey: ['shop', shopId],
    queryFn: async () => {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }

      try {
        const response = await clientApiClient.get<IShopResponse>(
          API_ENDPOINTS.SHOPS.GET_SHOP(shopId)
        );

        if (!response || !response.success || !response.shop) {
          return null;
        }

        return response.shop;
      } catch (error) {
        // If endpoint doesn't exist or fails, return null
        console.warn('Failed to fetch shop details:', error);
        return null;
      }
    },
    enabled: !!shopId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

