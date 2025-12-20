/**
 * Client-side API client with automatic token refresh
 * This is used for client-side requests (React Query hooks, components)
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";

// Token storage keys
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

/**
 * Get access token from localStorage
 */
function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token from localStorage
 */
function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Store tokens in localStorage
 */
function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Clear tokens from localStorage
 */
function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Call refresh token API
 */
async function refreshAccessToken(): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post<{
    success: boolean;
    message: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }>(`${API_BASE_URL}/auth/refresh/token`, {
    refreshToken,
  });

  if (!response.data.success || !response.data.token) {
    throw new Error(response.data.message || 'Failed to refresh token');
  }

  const { accessToken, refreshToken: newRefreshToken } = response.data.token;
  setTokens(accessToken, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
}

/**
 * Process queued requests after token refresh
 */
function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

/**
 * Handle logout and redirect
 */
function handleLogout() {
  clearTokens();
  
  // Clear React Query cache
  if (typeof window !== 'undefined') {
    // Dispatch custom event for React Query to clear cache
    window.dispatchEvent(new CustomEvent('auth:logout'));
    
    // Redirect to login
    window.location.href = '/login';
  }
}

class ClientApiClient {
  private axiosInstance: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor: Attach access token from localStorage
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor: Handle 401 errors with automatic token refresh
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle network errors
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please check your internet connection and try again');
        }
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          throw new Error('Unable to connect to the server - please try again later');
        }

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          // Mark request as retried to prevent infinite loops
          originalRequest._retry = true;

          // If already refreshing, queue this request
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          // Start token refresh
          isRefreshing = true;

          try {
            const { accessToken } = await refreshAccessToken();
            
            // Process queued requests
            processQueue(null, accessToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            isRefreshing = false;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Refresh failed - clear tokens and redirect to login
            isRefreshing = false;
            processQueue(refreshError as Error, null);
            handleLogout();
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data as { message?: string; error?: string } | undefined;
          const message =
            errorData?.message ||
            errorData?.error ||
            `Request failed with status ${error.response.status}`;
          throw new Error(message);
        }

        throw error;
      }
    );
  }

  async get<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, config);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  async delete<T>(endpoint: string, config?: any): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, config);
    return response.data;
  }
}

// Export singleton instance
export const clientApiClient = new ClientApiClient(API_BASE_URL);

// Export token management functions
export const tokenManager = {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  refreshAccessToken,
};

// Re-export API_ENDPOINTS for convenience
export { API_ENDPOINTS } from './client';

