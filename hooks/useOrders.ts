import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { IOrdersResponse } from '@/types/product.types';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await apiClient.get<IOrdersResponse>('/orders');
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response;
    },
    enabled: !!orderId,
  });
}
