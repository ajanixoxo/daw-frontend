
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/zustand/store";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles: string[];
    status: string;
    createdAt: string;
    shop?: {
        name: string;
        description: string;
    };
}

export interface UsersResponse {
    success: boolean;
    count: number;
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
    data: User[];
}

export interface UserFilters {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
}

export function useAdminUsers(filters: UserFilters = {}) {
    const { page = 1, limit = 10, search = "", role = "", status = "" } = filters;
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "users", page, limit, search, role, status],
        queryFn: async () => {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (search) queryParams.set("search", search);
            if (role) queryParams.set("role", role);
            if (status) queryParams.set("status", status);

            const response = await apiClient.get<UsersResponse>(
                `/api/admin/users?${queryParams.toString()}`,
                { token: accessToken }
            );
            return response;
        },
        enabled: !!accessToken,
    });
}
