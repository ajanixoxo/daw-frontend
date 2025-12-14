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

  // Ensure shopId is a string, not an object
  const shopIdString = String(shopId).trim();
  
  if (!shopIdString || shopIdString === '[object Object]' || shopIdString.includes('[object Object]')) {
    throw new Error('Invalid shop ID. Please refresh the page and try again.');
  }

  const payload: IAddProductRequest = {
    ...data,
    shop_id: shopIdString,
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
        throw new Error('Failed to add product');
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

      // Validate shopId is not corrupted
      if (shopId.includes('[object Object]')) {
        console.error('Invalid shopId:', shopId);
        return { products: [] };
      }

      try {
        // Fetch products by shop ID using the dedicated endpoint
        const response = await clientApiClient.get<IProductsResponse>(
          API_ENDPOINTS.MARKETPLACE.GET_PRODUCTS_BY_SHOP(shopId)
        );

        return {
          ...response,
          products: response.products || [],
        };
      } catch (error) {
        console.error('Error fetching seller products:', error);
        // If endpoint fails, return empty array
        return { products: [] };
      }
    },
    enabled: !!shopId && !shopId.includes('[object Object]'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

