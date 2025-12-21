<<<<<<< HEAD
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReviews, createReview } from '@/app/actions/reviews';
import { ICreateReviewRequest } from '@/types/review.types';
import { toast } from 'sonner';

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await getReviews(productId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data?.data;
    },
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateReviewRequest) => {
      const response = await createReview(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
      toast.success('Review submitted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });
}
=======
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReviews, createReview } from '@/app/actions/reviews';
import { ICreateReviewRequest } from '@/types/review.types';
import { toast } from 'sonner';

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await getReviews(productId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data?.reviews || [];
    },
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateReviewRequest) => {
      const response = await createReview(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
      toast.success('Review submitted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });
}
>>>>>>> coop/join
