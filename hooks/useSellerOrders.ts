import { useQuery } from '@tanstack/react-query';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import { IOrdersResponse, IOrder } from '@/types/product.types';
import { getShopId } from './useSellerProfile';

// Hook to fetch seller's orders (filtered by shop ID)
export function useSellerOrders() {
  const shopId = getShopId();

  return useQuery({
    queryKey: ['seller-orders', shopId],
    queryFn: async () => {
      if (!shopId) {
        return { orders: [] };
      }

      try {
        // Fetch all orders and filter by shop_id
        // TODO: Replace with endpoint to get orders by shop_id when available
        const response = await clientApiClient.get<IOrdersResponse>(
          API_ENDPOINTS.MARKETPLACE.GET_ALL_ORDERS
        );

        // Filter orders by shop_id
        const sellerOrders = response.orders?.filter((order) => {
          const orderShopId = typeof order.shop_id === 'string' 
            ? order.shop_id 
            : order.shop_id._id;
          return orderShopId === shopId;
        }) || [];

        return {
          ...response,
          orders: sellerOrders,
        };
      } catch (error) {
        console.error('Error fetching seller orders:', error);
        // If endpoint doesn't exist, return empty array
        return { orders: [] };
      }
    },
    enabled: !!shopId,
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

