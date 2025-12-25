import { useMutation } from '@tanstack/react-query';
import { refreshAccessToken } from '@/app/actions/auth';

export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const response = await refreshAccessToken();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
  });
}





