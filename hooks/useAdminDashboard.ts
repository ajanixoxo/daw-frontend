import { useQuery } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { useAuthStore } from "@/zustand/store";

export interface DashboardStats {
    activeUsers: { value: number; label: string };
    cooperatives: { total: number; pending: number; label: string };
    products: { total: number; label: string };
    loans: { count: number; value: number; label: string };
    pendingApprovals: { value: number; label: string };
    numberOfSellers?: { value: number; subtitle: string };
    numberOfCategories?: { value: number; subtitle: string };
    totalUser?: { value: number; percentageChange: number };
}

export interface Cooperative {
    _id: string;
    name: string;
    description: string;
    logoUrl?: string;
    createdAt: string;
    adminId: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        kyc_status?: string;
    };
    status: "pending" | "approved" | "rejected" | "suspended";
    members: string[];
    isActive: boolean;
}

export interface AdminProduct {
    _id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    currency: string;
    images: string[];
    status: "available" | "unavailable" | "draft" | "out_of_stock";
    shop_id: string;
    shop_name: string;
    shop_logo: string;
    seller_name: string;
    seller_email: string;
    displayPrice: string;
    displayCurrency: string;
    createdAt: string;
}

export function useDashboardStats() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "dashboard", "stats"],
        queryFn: async () => {
            const response = await apiClient.get<{ success: boolean; data: DashboardStats }>(
                API_ENDPOINTS.ADMIN.DASHBOARD_STATS,
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

export function usePendingCooperatives() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "cooperatives", "pending"],
        queryFn: async () => {
            const response = await apiClient.get<{ success: boolean; count: number; data: Cooperative[] }>(
                API_ENDPOINTS.ADMIN.PENDING_COOPERATIVES,
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

import { AnalyticsResponse, UserAnalyticsResponse, CooperativeAnalyticsResponse, RevenueAnalyticsResponse } from "@/components/(dashboards)/admin-dashboard/analytics/types";

export function useAdminAnalytics() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "analytics"],
        queryFn: async () => {
            const response = await apiClient.get<AnalyticsResponse>(
                "/api/admin/analytics",
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

export function useUserAnalytics() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "analytics", "users"],
        queryFn: async () => {
            const response = await apiClient.get<UserAnalyticsResponse>(
                "/api/admin/analytics/users",
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

export function useCooperativeAnalytics() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "analytics", "cooperatives"],
        queryFn: async () => {
            const response = await apiClient.get<CooperativeAnalyticsResponse>(
                "/api/admin/analytics/cooperatives",
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

export function useRevenueAnalytics() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "analytics", "revenue"],
        queryFn: async () => {
            const response = await apiClient.get<RevenueAnalyticsResponse>(
                "/api/admin/analytics/revenue",
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}

export function useAllCooperatives() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "cooperatives", "all"],
        queryFn: async () => {
            const response = await apiClient.get<Cooperative[]>(
                "/api/cooperatives",
                { token: accessToken }
            );
            return response;
        },
        enabled: !!accessToken,
    });
}

export function useAllProducts() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "products", "all"],
        queryFn: async () => {
            const response = await apiClient.get<{ success: boolean; products: AdminProduct[] }>(
                "/marketplace/get/all/products",
                { token: accessToken }
            );
            return response;
        },
        enabled: !!accessToken,
    });
}
