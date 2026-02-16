"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/zustand/store";
import { toast } from "sonner";

interface DeleteUserDialogProps {
    userId: string;
    userName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({ userId, userName, open, onOpenChange }: DeleteUserDialogProps) {
    const queryClient = useQueryClient();
    const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const response = await apiClient.delete<{ success: boolean; message: string }>(
                `/api/admin/users/${userId}`,
                undefined, // body
                { token: accessToken } // config
            );
            return response;
        },
        onSuccess: (data) => {
            toast.success(data.message || "User deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
            onOpenChange(false);
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete user.");
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <span className="font-semibold text-gray-900">{userName}</span>?
                        This action will set the user's status to deleted and they will no longer be able to access the platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {deleteMutation.isPending ? "Deleting..." : "Delete User"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
