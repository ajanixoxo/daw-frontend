"use client"

import { useQuery } from "@tanstack/react-query";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/zustand/store";
import { formatDate } from "./formatters";

interface UserDetailsDrawerProps {
    userId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDetailsDrawer({ userId, open, onOpenChange }: UserDetailsDrawerProps) {
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    const { data: userData, isLoading } = useQuery({
        queryKey: ["admin", "user", userId],
        queryFn: async () => {
            const response = await apiClient.get<{ success: boolean; data: any }>(
                `/api/admin/users/${userId}`,
                { token: accessToken }
            );
            return response.data;
        },
        enabled: open && !!userId,
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-[500px] p-0 border-l-0 sm:border-l flex flex-col h-full"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="px-6 pt-6 pb-2">
                        <SheetHeader className="space-y-4 text-left p-0">
                            <div className="flex items-center gap-3">
                                <button onClick={() => onOpenChange(false)} className="hover:opacity-70 transition-opacity">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <SheetTitle className="text-2xl font-medium">User Details</SheetTitle>
                            </div>
                            <SheetDescription className="text-gray-500 text-sm">
                                View detailed information about this user.
                            </SheetDescription>
                        </SheetHeader>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-gray-500">Loading user details...</div>
                            </div>
                        ) : userData ? (
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Name:</span>
                                            <span className="col-span-2 text-sm font-medium text-gray-900">
                                                {userData.firstName} {userData.lastName}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Email:</span>
                                            <span className="col-span-2 text-sm font-medium text-gray-900">{userData.email}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Phone:</span>
                                            <span className="col-span-2 text-sm font-medium text-gray-900">
                                                {userData.phone && !userData.phone.startsWith('temp_') ? userData.phone : '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Status:</span>
                                            <div className="col-span-2">
                                                <Badge
                                                    variant={userData.status === 'active' ? 'default' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {userData.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Roles:</span>
                                            <div className="col-span-2 flex flex-wrap gap-1">
                                                {userData.roles?.map((role: string) => (
                                                    <Badge key={role} variant="outline" className="capitalize">
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Verified:</span>
                                            <span className="col-span-2 text-sm font-medium text-gray-900">
                                                {userData.isVerified ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Associated Information */}
                                {(userData.shop || userData.cooperative) && (
                                    <div className="space-y-4 pt-4 border-t">
                                        <h3 className="text-lg font-semibold text-gray-900">Associated Information</h3>
                                        <div className="space-y-3">
                                            {userData.shop && (
                                                <div className="grid grid-cols-3 gap-2">
                                                    <span className="text-sm text-gray-500">Shop:</span>
                                                    <span className="col-span-2 text-sm font-medium text-gray-900">{userData.shop.name}</span>
                                                </div>
                                            )}
                                            {userData.cooperative && (
                                                <div className="grid grid-cols-3 gap-2">
                                                    <span className="text-sm text-gray-500">Cooperative:</span>
                                                    <span className="col-span-2 text-sm font-medium text-gray-900">{userData.cooperative.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Account Metadata */}
                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="text-lg font-semibold text-gray-900">Account Metadata</h3>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">User ID:</span>
                                            <span className="col-span-2 text-sm font-mono text-gray-900">{userData._id}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-sm text-gray-500">Created:</span>
                                            <span className="col-span-2 text-sm font-medium text-gray-900">
                                                {formatDate(userData.createdAt)}
                                            </span>
                                        </div>
                                        {userData.lastLogin && (
                                            <div className="grid grid-cols-3 gap-2">
                                                <span className="text-sm text-gray-500">Last Login:</span>
                                                <span className="col-span-2 text-sm font-medium text-gray-900">
                                                    {formatDate(userData.lastLogin)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-gray-500">User not found</div>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
