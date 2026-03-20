import { apiClient } from "@/lib/api/client";

export interface LogisticsStats {
  totalShipments: number;
  activeShipments: number;
  pendingRequests: number;
  completedDeliveries: number;
  rating?: number;
}

export interface LogisticsEarnings {
  totalEarnings: number;
  netEarnings: number;
  platformFee: number;
  avgPerDelivery: number;
  pendingPayout: number;
  totalDeliveries: number;
  monthlyChart: Array<{ month: string; amount: number }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const fetchWithToken = async (token: string, endpoint: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred");
  }

  return response.json();
};

export const logisticsApi = {
  getDeliveries: (token: string, status: string = "all") => 
    fetchWithToken(token, `/api/marketPlace/logistics/deliveries?status=${status}`),
    
  updateDeliveryStatus: (token: string, orderId: string, status: "in_transit" | "delivered") => 
    fetchWithToken(token, `/api/marketPlace/logistics/deliveries/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  getEarnings: (token: string) => 
    fetchWithToken(token, `/api/marketPlace/logistics/earnings`),

  getStats: (token: string) => 
    fetchWithToken(token, `/api/marketPlace/logistics/stats`),
};
