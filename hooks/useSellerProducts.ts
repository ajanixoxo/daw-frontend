import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { clientApiClient, API_ENDPOINTS } from '@/lib/api/client-client';
import { IAddProductRequest, IAddProductResponse, IProductsResponse, IProduct } from '@/types/product.types';
import { toast } from 'sonner';
import { getShopId } from './useSellerProfile';

// Client-side function to add product using shop ID from localStorage
async function addProductClient(data: Omit<IAddProductRequest, 'shop_id'>) {
  const shopId = getShopId();
  
  if (!shopId) {
    throw new Error('Shop ID not found. Please create a shop first.');
  }

  const payload: IAddProductRequest = {
    ...data,
    shop_id: shopId,
  };

  const response = await clientApiClient.post<IAddProductResponse>(
    API_ENDPOINTS.MARKETPLACE.ADD_PRODUCT,
    payload
  );

  return response;
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<IAddProductRequest, 'shop_id'>) => {
      const response = await addProductClient(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to add product');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add product');
    },
  });
}

// Hook to fetch seller's products (filtered by shop ID)
export function useSellerProducts() {
  const shopId = getShopId();

  return useQuery({
    queryKey: ['seller-products', shopId],
    queryFn: async () => {
      if (!shopId) {
        return { products: [] };
      }

      // Fetch all products and filter by shop_id
      // TODO: Replace with endpoint to get products by shop_id when available
      const response = await clientApiClient.get<IProductsResponse>(
        API_ENDPOINTS.MARKETPLACE.GET_ALL_PRODUCTS
      );

      // Filter products by shop_id
      const sellerProducts = response.products?.filter(
        (product) => product.shop_id === shopId
      ) || [];

      return {
        ...response,
        products: sellerProducts,
      };
    },
    enabled: !!shopId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

