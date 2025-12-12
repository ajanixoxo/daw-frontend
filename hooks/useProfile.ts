import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/app/actions/profile';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getUserProfile();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
