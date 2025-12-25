import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShop } from '@/app/actions/shop';
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
      toast.success('Shop created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create shop');
    },
  });
}





