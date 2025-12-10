import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, API_ENDPOINTS } from '@/lib/api/client';
import type { IProductsResponse, IProduct } from '@/types/product.types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get<IProductsResponse>(
        API_ENDPOINTS.MARKETPLACE.GET_ALL_PRODUCTS
      );
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await apiClient.get<{ message: string; product: IProduct }>(
        API_ENDPOINTS.MARKETPLACE.GET_PRODUCT(productId)
      );
      return response.product;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularProducts(limit: number = 8) {
  return useQuery({
    queryKey: ['products', 'popular', limit],
    queryFn: async () => {
      const response = await apiClient.get<IProductsResponse>(
        API_ENDPOINTS.MARKETPLACE.GET_ALL_PRODUCTS
      );
      // Return limited products for popular section
      return {
        ...response,
        products: response.products.slice(0, limit),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}
