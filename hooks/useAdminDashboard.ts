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
        firstName: string;
        lastName: string;
        email: string;
    };
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

import { AnalyticsResponse } from "@/components/(dashboards)/admin-dashboard/analytics/types";

export function useAdminAnalytics() {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "analytics"],
        queryFn: async () => {
            const response = await apiClient.get<AnalyticsResponse>(
                // API_ENDPOINTS.ADMIN.ANALYTICS - we haven't added this to client.ts yet, let's hardcode or update client.ts first?
                // Better to update client.ts first to be consistent. But I can pass string too.
                // Let's use string for now to save a step or update client.ts.
                // Actually, clean code is better. I'll update client.ts first? No, I can jus use string "/api/admin/analytics" as I did for users.
                "/api/admin/analytics",
                { token: accessToken }
            );
            return response.data;
        },
        enabled: !!accessToken,
    });
}
