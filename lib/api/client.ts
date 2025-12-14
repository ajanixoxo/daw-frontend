/**
 * Global API client instance with base configuration
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";

interface ApiRequestConfig {
  token?: string;
  headers?: Record<string, string>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });


    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please check your internet connection and try again');
        }
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          throw new Error('Unable to connect to the server - please try again later');
        }
        throw error;
      }
    );
  }

  private async request<T>(
    endpoint: string,
    config: AxiosRequestConfig & ApiRequestConfig = {}
  ): Promise<T> {
    const { token, headers, ...restConfig } = config;

    try {
      const response = await this.axiosInstance.request<T>({
        url: endpoint,
        ...restConfig,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          `Request failed with status ${error.response.status}`;
        throw new Error(message);
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      data: body,
    });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      data: body,
    });
  }

  async delete<T>(
    endpoint: string,
    body?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "DELETE",
      data: body,
    });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: ApiRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      data: body,
    });
  }
}


export const apiClient = new ApiClient(API_BASE_URL);


export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh/token",
    VERIFY_EMAIL: "/auth/verify/email",
    LOGIN_OTP: "/auth/login/otp",
    RESEND_VERIFICATION: "/auth/resend/verificatiion",
    PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot/password",
    RESET_PASSWORD: "/auth/reset/password",
  },
  MARKETPLACE: {
    GET_ALL_PRODUCTS: "/marketplace/get/all/products",
    GET_PRODUCT: (id: string) => `/marketplace/get/products/${id}`,
    ADD_PRODUCT: "/marketplace/add/products",
    GET_ORDER: (orderId: string) => `/marketplace/get/orders/${orderId}`,
    GET_ALL_ORDERS: "/marketplace/get/all/orders",
  },
  CART: {
    ADD_ITEM: "/marketplace/cart/item",
    GET_CART: (cartId: string) => `/marketplace/cart/${cartId}`,
    UPDATE_ITEM: "/marketplace/cart/item",
    REMOVE_ITEM: "/marketplace/remove/cart/item",
  },
  WISHLIST: {
    ADD: "/marketplace/wishlist",
    GET: "/marketplace/wishlist",
    REMOVE: "/marketplace/remove/wishlist",
  },
  REVIEWS: {
    CREATE: "/marketplace/reviews",
    GET: (productId: string) => `/marketplace/reviews/${productId}`,
  },
  SHOPS: {
    CREATE: "/marketplace/create/shops",
    GET_SHOP: (shopId: string) => `/marketplace/shops/${shopId}`,
  },
  KYC: {
    VERIFY_NIN: "/kyc/verify-nin",
  },
  USERS: {
    UPGRADE_SELLER: (userId: string) => `/api/users/${userId}/upgrade/seller`,
  },
} as const;