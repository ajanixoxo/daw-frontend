import { useMutation } from '@tanstack/react-query';
import { upgradeToSeller } from '@/app/actions/user';
import { toast } from 'sonner';

export function useUpgradeToSeller() {
  return useMutation({
    mutationFn: async () => {
      const response = await upgradeToSeller();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      toast.success('Your account has been upgraded to seller!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upgrade role');
    },
  });
}




