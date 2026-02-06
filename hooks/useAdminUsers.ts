
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

export function useAdminUsers(page = 1, limit = 10, search = "") {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    return useQuery({
        queryKey: ["admin", "users", page, limit, search],
        queryFn: async () => {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search }),
            });

            const response = await apiClient.get<UsersResponse>(
                `/api/admin/users?${queryParams.toString()}`,
                { token: accessToken }
            );
            return response;
        },
        enabled: !!accessToken,
    });
}
