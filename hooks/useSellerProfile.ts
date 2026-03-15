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

type ShopRecord = {
  shopId?: string;
  _id?: string;
  name?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

function sanitizeShopId(value: unknown): string | null {
  if (!isNonEmptyString(value)) return null;

  const shopId = value.trim();
  if (
    !shopId ||
    shopId === '[object Object]' ||
    shopId.includes('[object Object]')
  ) {
    return null;
  }

  return shopId;
}

export function getSafeShopList(user: IUser | null | undefined): ShopRecord[] {
  if (!user?.shop || !Array.isArray(user.shop)) return [];

  return user.shop.filter(
    (shop): shop is ShopRecord => typeof shop === 'object' && shop !== null,
  );
}

export function getPrimaryShop(user: IUser | null | undefined): ShopRecord | null {
  const shops = getSafeShopList(user);
  return shops.length > 0 ? shops[0] : null;
}

export function hasCooperativeMembership(user: IUser | null | undefined): boolean {
  if (!user) return false;

  if (Array.isArray(user.roles)) {
    if (user.roles.includes('member') || user.roles.includes('cooperative')) {
      return true;
    }
  }

  if (!Array.isArray(user.member)) return false;

  return user.member.some((member) => {
    if (!member || typeof member !== 'object') return false;
    const record = member as { cooperativeId?: unknown; memberId?: unknown; _id?: unknown };
    return Boolean(record.cooperativeId || record.memberId || record._id);
  });
}

// Store shop ID in localStorage
export function storeShopId(shopId: string | null) {
  if (typeof window === 'undefined') return;
  const sanitizedShopId = sanitizeShopId(shopId);
  if (sanitizedShopId) {
    localStorage.setItem(SHOP_ID_KEY, sanitizedShopId);
  } else {
    localStorage.removeItem(SHOP_ID_KEY);
  }
}

// Get shop ID from localStorage
export function getShopId(): string | null {
  if (typeof window === 'undefined') return null;
  const shopId = localStorage.getItem(SHOP_ID_KEY);
  const sanitizedShopId = sanitizeShopId(shopId);

  if (!sanitizedShopId && shopId) {
    localStorage.removeItem(SHOP_ID_KEY);
  }

  return sanitizedShopId;
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

      const primaryShop = getPrimaryShop(response.user);
      storeShopId(
        sanitizeShopId(primaryShop?.shopId) ?? sanitizeShopId(primaryShop?._id),
      );

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

