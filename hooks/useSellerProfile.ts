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
  const shopId = localStorage.getItem(SHOP_ID_KEY);
  
  // Validate shopId - if it contains [object Object], it's invalid
  if (shopId && (shopId.includes('[object Object]') || shopId.trim() === '')) {
    // Clear invalid data
    localStorage.removeItem(SHOP_ID_KEY);
    return null;
  }
  
  return shopId;
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

      // Store shop ID in localStorage if available (use first shop's shopId)
      if (response.user.shop) {
        if (Array.isArray(response.user.shop) && response.user.shop.length > 0) {
          const firstShop = response.user.shop[0];
          // Ensure we extract shopId as a string, not the entire object
          if (firstShop && typeof firstShop === 'object' && firstShop !== null) {
            // Check if shopId exists and is a valid string
            const shopId = firstShop.shopId;
            if (shopId && typeof shopId === 'string' && shopId.trim() !== '') {
              storeShopId(shopId.trim());
            } else if (shopId && typeof shopId !== 'string') {
              // If shopId is not a string, try to convert it
              const shopIdString = String(shopId).trim();
              if (shopIdString && !shopIdString.includes('[object Object]')) {
                storeShopId(shopIdString);
              } else {
                console.warn('Invalid shopId format:', shopId);
                storeShopId(null);
              }
            } else {
              console.warn('Missing or empty shopId in shop object:', firstShop);
              storeShopId(null);
            }
          } else {
            console.warn('Invalid shop structure - not an object:', firstShop);
            storeShopId(null);
          }
        } else {
          // If shop is not an array or is empty, clear it
          storeShopId(null);
        }
      } else {
        storeShopId(null);
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

