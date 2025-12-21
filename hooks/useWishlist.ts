import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/app/actions/wishlist';
import { toast } from 'sonner';

export function useWishlist() {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      console.log("Fetching wishlist...");
      const response = await getWishlist();
      console.log("Wishlist response:", response);
      
      if (!response.success) {
        console.error("Failed to fetch wishlist:", response.error);
        throw new Error(response.error);
      }
      
      // The response.data is the IWishlistResponse object, which contains the 'data' array
      const items = response.data?.data || [];
      console.log("Wishlist items:", items);
      return items;
    },
  });
}

// ... (previous code)

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      console.log("Adding to wishlist:", productId);
      const response = await addToWishlist(productId);
      console.log("Add to wishlist response:", response);
      
      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Added to wishlist');
    },
    onError: (error) => {
      console.error("Add to wishlist error:", error);
      toast.error(error.message || 'Failed to add to wishlist');
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      console.log("Removing from wishlist:", productId);
      const response = await removeFromWishlist(productId);
      console.log("Remove from wishlist response:", response);

      if (!response.success) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Removed from wishlist');
    },
    onError: (error) => {
      console.error("Remove from wishlist error:", error);
      toast.error(error.message || 'Failed to remove from wishlist');
    },
  });
}

export function useIsProductInWishlist(productId: string) {
  const { data: wishlistItems } = useWishlist();
  
  if (!wishlistItems) return false;
  
  // Check if any item in the wishlist matches the product ID
  // The backend returns an array of items, each having a product object which contains the _id
  const isInWishlist = wishlistItems.some((item) => item.product?._id === productId);
  
  // console.log(`Checking if product ${productId} is in wishlist:`, isInWishlist);
  return isInWishlist;
}
