import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShop, getMyShop, editShop, getAllShops, getShop, getShopStats } from '@/app/actions/shop';
import { ICreateShopRequest } from '@/types/shop.types';
import { toast } from 'sonner';

export function useCreateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateShopRequest) => {
      const response = await createShop(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      queryClient.invalidateQueries({ queryKey: ['my-shop'] });
      toast.success('Shop created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create shop');
    },
  });
}

export function useGetMyShop() {
  return useQuery({
    queryKey: ['my-shop'],
    queryFn: async () => {
      const response = await getMyShop();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetShop(shopId: string) {
  return useQuery({
    queryKey: ['shop', shopId],
    queryFn: async () => {
      const response = await getShop(shopId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!.shop;
    },
    enabled: !!shopId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllShops() {
  return useQuery({
    queryKey: ['shops'],
    queryFn: async () => {
      const response = await getAllShops();
      if (!response.success) {
         // Return empty if failed for now to avoid breaking UI, or throw
         console.error(response.error)
         return { shops: [], totalShops: 0 };
      }
      return response.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopStats(shopId: string | undefined) {
  return useQuery({
    queryKey: ['shop-stats', shopId],
    queryFn: async () => {
      const response = await getShopStats(shopId!);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data!;
    },
    enabled: !!shopId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useEditShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ shopId, formData }: { shopId: string; formData: FormData }) => {
      const response = await editShop(shopId, formData);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-shop'] });
      queryClient.invalidateQueries({ queryKey: ['shops'] });
      toast.success('Shop updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update shop');
    },
  });
}
