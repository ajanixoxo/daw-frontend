import { useMutation } from '@tanstack/react-query';
import { verifyNin } from '@/app/actions/kyc';
import { toast } from 'sonner';

export function useVerifyNin() {
  return useMutation({
    mutationFn: async (data: { nin: string }) => {
      const response = await verifyNin(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      toast.success('KYC verification successful');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to verify KYC');
    },
  });
}




