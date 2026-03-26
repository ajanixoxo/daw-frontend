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

  const formData = new FormData();
  formData.append('shop_id', shopIdString);
  formData.append('name', data.name);
  formData.append('quantity', String(data.quantity));
  formData.append('weight', String(data.weight));
  formData.append('price', String(data.price));
  formData.append('location', data.location || "");
  if (data.description) formData.append('description', data.description);
  if (data.category) formData.append('category', data.category);
  if (data.status) formData.append('status', data.status);
  if (data.variants && data.variants.length > 0) {
    formData.append('variants', JSON.stringify(data.variants));
  }
  if (data.productFeatures) formData.append('productFeatures', data.productFeatures);
  if (data.careInstruction) formData.append('careInstruction', data.careInstruction);
  if (data.returnPolicy) formData.append('returnPolicy', data.returnPolicy);

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append('images', file);
    });
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";

  const { default: axios } = await import('axios');
  const axiosResponse = await axios.post<IAddProductResponse>(
    `${API_BASE_URL}${API_ENDPOINTS.MARKETPLACE.ADD_PRODUCT}`,
    formData,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // DO NOT set Content-Type — let axios set it automatically with boundary
      },
    }
  );

  if (!axiosResponse.data.success) {
    const err = axiosResponse.data as any;
    throw new Error(err.message || 'Failed to add product');
  }

  return axiosResponse.data;
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

export interface IEditProductData {
  name?: string;
  quantity?: number;
  weight?: number;
  location?: string;
  price?: number;
  description?: string;
  category?: string;
  status?: "available" | "unavailable" | "draft" | "out_of_stock";
  images?: File[];
  existingImages?: string[];
  variants?: { type: string; values: string[] }[];
  productFeatures?: string;
  careInstruction?: string;
  returnPolicy?: string;
}

export function useEditProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, data }: { productId: string; data: IEditProductData }) => {
      const formData = new FormData();

      if (data.name !== undefined) formData.append('name', data.name);
      if (data.quantity !== undefined) formData.append('quantity', String(data.quantity));
      if (data.weight !== undefined) formData.append('weight', String(data.weight));
      if (data.price !== undefined) formData.append('price', String(data.price));
      if (data.location !== undefined) formData.append('location', data.location);
      if (data.description !== undefined) formData.append('description', data.description);
      if (data.category !== undefined) formData.append('category', data.category);
      if (data.status !== undefined) formData.append('status', data.status);
      if (data.variants !== undefined) formData.append('variants', JSON.stringify(data.variants));
      if (data.productFeatures !== undefined) formData.append('productFeatures', data.productFeatures);
      if (data.careInstruction !== undefined) formData.append('careInstruction', data.careInstruction);
      if (data.returnPolicy !== undefined) formData.append('returnPolicy', data.returnPolicy);
      if (data.existingImages !== undefined) formData.append('existingImages', JSON.stringify(data.existingImages));

      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => {
          formData.append('images', file);
        });
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";
      const { default: axios } = await import('axios');

      const axiosResponse = await axios.patch<IAddProductResponse>(
        `${API_BASE_URL}${API_ENDPOINTS.MARKETPLACE.EDIT_PRODUCT(productId)}`,
        formData,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!axiosResponse.data.success) {
        const err = axiosResponse.data as any;
        throw new Error(err.message || 'Failed to update product');
      }
      return axiosResponse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await clientApiClient.delete<{ success: boolean; message: string }>(
        API_ENDPOINTS.MARKETPLACE.DELETE_PRODUCT(productId)
      );
      if (!response.success) {
        throw new Error('Failed to delete product');
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
}

// Hook to fetch seller's products (filtered by shop ID)
export function useSellerProducts() {
  const shopId = getShopId();
  const hasValidShopId = typeof shopId === 'string' && shopId.trim() !== '';

  return useQuery({
    queryKey: ['seller-products', shopId],
    queryFn: async () => {
      if (!shopId) {
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
    enabled: hasValidShopId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
