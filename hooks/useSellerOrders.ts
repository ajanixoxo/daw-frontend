import { useQuery } from '@tanstack/react-query';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import { IOrdersResponse, IOrder } from '@/types/product.types';
import { getShopId } from './useSellerProfile';

// Hook to fetch seller's orders (filtered by shop ID)
export function useSellerOrders() {
  const shopId = getShopId();
  const hasValidShopId = typeof shopId === 'string' && shopId.trim() !== '';

  return useQuery({
    queryKey: ['seller-orders', shopId],
    queryFn: async () => {
      if (!shopId) {
        return { orders: [] };
      }

      // Validate shopId before making the API call
      const shopIdString = String(shopId).trim();
      if (!shopIdString || shopIdString === '[object Object]' || shopIdString.includes('[object Object]')) {
        console.error("Invalid shop ID found in localStorage for orders:", shopId);
        return { orders: [] };
      }

      try {
        // Fetch orders by shop ID using the dedicated endpoint
        const response = await clientApiClient.get<IOrdersResponse>(
          API_ENDPOINTS.MARKETPLACE.GET_ORDERS_BY_SHOP(shopIdString)
        );
        return {
          ...response,
          orders: response.orders || [],
        };
      } catch (error) {
        console.error('Error fetching seller orders:', error);
        // If endpoint fails, return empty array
        return { orders: [] };
      }
    },
    enabled: hasValidShopId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook to fetch a single order by ID
export function useSellerOrder(orderId: string) {
  return useQuery({
    queryKey: ['seller-order', orderId],
    queryFn: async () => {
      const response = await clientApiClient.get<{ success: boolean; order: IOrder }>(
        API_ENDPOINTS.MARKETPLACE.GET_ORDER(orderId)
      );
      if (!response.success || !response.order) {
        throw new Error('Failed to fetch order');
      }
      return response.order;
    },
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000,
  });
}



