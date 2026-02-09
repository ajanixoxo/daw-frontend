import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import { ICategoriesResponse, ICreateCategoryResponse } from '@/types/category.types';
import { toast } from 'sonner';
import { getShopId } from './useSellerProfile';

export function useShopCategories() {
  const shopId = getShopId();

  return useQuery({
    queryKey: ['categories', shopId],
    queryFn: async () => {
      if (!shopId) {
        return { success: true, categories: [] };
      }

      const response = await clientApiClient.get<ICategoriesResponse>(
        API_ENDPOINTS.CATEGORIES.GET_BY_SHOP(shopId)
      );

      return response;
    },
    enabled: !!shopId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; description?: string; color?: string }) => {
      const shopId = getShopId();

      if (!shopId) {
        throw new Error('Shop ID not found. Please create a shop first.');
      }

      const response = await clientApiClient.post<ICreateCategoryResponse>(
        API_ENDPOINTS.CATEGORIES.CREATE,
        {
          shop_id: shopId,
          name: data.name,
          description: data.description,
          color: data.color,
        }
      );

      if (!response.success) {
        throw new Error('Failed to create category');
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
}
