import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShop, getMyShop, editShop } from '@/app/actions/shop';
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
